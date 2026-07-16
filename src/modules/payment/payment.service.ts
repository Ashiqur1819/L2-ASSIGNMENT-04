import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../config/stripe";
import {
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  BookingStatus,
} from "../../../generated/prisma/enums";

const createPaymentIntent = async ( userId: string, bookingId: string,) => {
  // Booking Check
  const booking = await prisma.booking.findFirst({
  where: {
    id: bookingId,
    customerId: userId,
  },
  include: {
    service: true,
  },
});

if (!booking) {
  throw new Error("Booking not found");
}

  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error(
      "Payment can only be made for accepted bookings",
    );
  }

  // Existing Payment Check
  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId,
    },
  });

  if (
    existingPayment &&
    existingPayment.status === PaymentStatus.COMPLETED
  ) {
    throw new Error("Payment already completed");
  }

  const amount = Math.round(booking.service.price * 100);

  // Stripe Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",

    metadata: {
      bookingId,
    },

    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Save Payment
  await prisma.payment.upsert({
    where: {
      bookingId,
    },

    update: {
      amount: booking.service.price,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id,
    },

    create: {
      bookingId,
      amount: booking.service.price,
      method: PaymentMethod.CARD,
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const stripeWebhook = async (event: Stripe.Event) => {
  console.log("EVENT:", event.type);

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("PaymentIntent:", paymentIntent.id);

      const payment = await prisma.payment.findFirst({
        where: {
          stripePaymentIntentId: paymentIntent.id,
        },
      });

      console.log("Payment:", payment);

      if (!payment) {
        console.log("Payment not found");
        break;
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: PaymentStatus.COMPLETED,
            transactionId: paymentIntent.id,
            paidAt: new Date(),
          },
        }),

        prisma.booking.update({
          where: {
            id: payment.bookingId,
          },
          data: {
            status: BookingStatus.PAID,
          },
        }),
      ]);

      console.log("Payment Completed");

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const payment = await prisma.payment.findFirst({
        where: {
          stripePaymentIntentId: paymentIntent.id,
        },
      });

      if (!payment) {
        break;
      }

      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: PaymentStatus.FAILED,
        },
      });

      console.log("Payment Failed");

      break;
    }

    default:
      console.log("Unhandled:", event.type);
  }
};

const getMyPayments = async (userId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      booking: {
        customerId: userId,
      },
    },

    include: {
      booking: {
        include: {
          service: true,
          technician: {
            include: {
              user: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSinglePayment = async (
  userId: string,
  paymentId: string,
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      booking: {
        include: {
          service: true,
          technician: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }

  return payment;
};

export const paymentService = {
  createPaymentIntent,
  stripeWebhook,
//   getMyPayments,
//   getSinglePayment,
};