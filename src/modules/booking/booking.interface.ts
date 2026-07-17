import { BookingStatus } from "../../../generated/prisma/enums";

export interface IBooking {
  serviceId: string;
  availabilityId: string;
  bookingDate: Date;
  address: string;
  problemDescription: string;
}

export interface IUpdateBookingStatus {
  status: BookingStatus;
}

export interface ICancelBooking {
  cancelReason: string;
}
