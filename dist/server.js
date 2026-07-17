
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";

// src/modules/auth/auth.route.ts
import { Router } from "express";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config = {
  PORT: process.env.PORT || 5e3,
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
};
var config_default = config;

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availability {\n  id                String            @id @default(uuid())\n  technicianId      String\n  technicianProfile TechnicianProfile @relation(fields: [technicianId], references: [id])\n  day               Day\n  startTime         String\n  endTime           String\n  isAvailable       Boolean           @default(true)\n  bookings          Booking[]\n  createdAt         DateTime          @default(now())\n  updatedAt         DateTime          @updatedAt\n\n  @@map("availabilities")\n}\n\nmodel Booking {\n  id                 String            @id @default(uuid())\n  customerId         String\n  customer           User              @relation(fields: [customerId], references: [id])\n  technicianId       String\n  technician         TechnicianProfile @relation(fields: [technicianId], references: [id])\n  serviceId          String\n  service            Service           @relation(fields: [serviceId], references: [id])\n  bookingDate        DateTime\n  startTime          DateTime\n  endTime            DateTime\n  address            String\n  problemDescription String\n  status             BookingStatus     @default(REQUESTED)\n  cancelReason       String?\n  availabilityId     String?\n  availability       Availability?     @relation(fields: [availabilityId], references: [id])\n  payment            Payment?\n  review             Review?\n  createdAt          DateTime          @default(now())\n  updatedAt          DateTime          @updatedAt\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id        String    @id @default(uuid())\n  name      String    @unique\n  services  Service[]\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n\n  @@map("categories")\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  ADMIN\n}\n\nenum Status {\n  ACTIVE\n  BLOCKED\n}\n\nenum BookingStatus {\n  REQUESTED\n  ACCEPTED\n  DECLINED\n  PAID\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum Day {\n  MONDAY\n  TUESDAY\n  WEDNESDAY\n  THURSDAY\n  FRIDAY\n  SATURDAY\n  SUNDAY\n}\n\nenum PaymentMethod {\n  CARD\n}\n\nenum PaymentProvider {\n  STRIPE\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id                    String          @id @default(uuid())\n  bookingId             String          @unique\n  booking               Booking         @relation(fields: [bookingId], references: [id])\n  transactionId         String?\n  amount                Float\n  method                PaymentMethod\n  provider              PaymentProvider\n  status                PaymentStatus   @default(PENDING)\n  stripePaymentIntentId String?\n  paidAt                DateTime?\n  createdAt             DateTime        @default(now())\n  updatedAt             DateTime        @updatedAt\n\n  @@map("payments")\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id])\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id])\n\n  rating  Int\n  comment String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id                  String            @id @default(uuid())\n  title               String\n  description         String\n  price               Float\n  categoryId          String\n  category            Category          @relation(fields: [categoryId], references: [id])\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id])\n  estimatedDuration   Int\n  isAvailable         Boolean           @default(true)\n  bookings            Booking[]\n  createdAt           DateTime          @default(now())\n  updatedAt           DateTime          @updatedAt\n\n  @@map("services")\n}\n\nmodel TechnicianProfile {\n  id             String         @id @default(uuid())\n  userId         String         @unique\n  user           User           @relation(fields: [userId], references: [id])\n  services       Service[]\n  bio            String\n  experience     Int\n  location       String\n  hourlyRate     Float\n  availabilities Availability[]\n  averageRating  Float          @default(0)\n  completedJobs  Int            @default(0)\n  bookings       Booking[]\n  reviews        Review[]\n  createdAt      DateTime       @default(now())\n  updatedAt      DateTime       @updatedAt\n\n  @@map("technicianProfiles")\n}\n\nmodel User {\n  id                String             @id @default(uuid())\n  name              String\n  email             String             @unique\n  password          String\n  phone             String\n  role              Role               @default(CUSTOMER)\n  status            Status             @default(ACTIVE)\n  technicianProfile TechnicianProfile?\n  customer          Booking[]\n  reviews           Review[]\n  createdAt         DateTime           @default(now())\n  updatedAt         DateTime           @updatedAt\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"},{"name":"day","kind":"enum","type":"Day"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"bookings","kind":"object","type":"Booking","relationName":"AvailabilityToBooking"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"availabilities"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"BookingToTechnicianProfile"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"bookingDate","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"address","kind":"scalar","type":"String"},{"name":"problemDescription","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"cancelReason","kind":"scalar","type":"String"},{"name":"availabilityId","kind":"scalar","type":"String"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToBooking"},{"name":"payment","kind":"object","type":"Payment","relationName":"BookingToPayment"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"services","kind":"object","type":"Service","relationName":"CategoryToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"method","kind":"enum","type":"PaymentMethod"},{"name":"provider","kind":"enum","type":"PaymentProvider"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"stripePaymentIntentId","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ReviewToTechnicianProfile"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"estimatedDuration","kind":"scalar","type":"Int"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"services"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"services","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"availabilities","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"completedJobs","kind":"scalar","type":"Int"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTechnicianProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"technicianProfiles"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"customer","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users"}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","technicianProfile","orderBy","cursor","customer","technician","services","_count","category","bookings","service","availability","booking","payment","review","reviews","user","availabilities","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","data","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","create","update","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","having","_min","_max","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","_avg","_sum","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","phone","Role","role","Status","status","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","bio","experience","location","hourlyRate","averageRating","completedJobs","title","description","price","categoryId","technicianProfileId","estimatedDuration","isAvailable","bookingId","customerId","technicianId","rating","comment","transactionId","amount","PaymentMethod","method","PaymentProvider","provider","PaymentStatus","stripePaymentIntentId","paidAt","serviceId","bookingDate","startTime","endTime","address","problemDescription","BookingStatus","cancelReason","availabilityId","Day","day","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "0gROgAENAQAAqwIAIAkAAPUBACCaAQAArAIAMJsBAAAQABCcAQAArAIAMJ0BAQAAAAGmAUAA8wEAIacBQADzAQAhwwEgAK4CACHGAQEA8AEAIdQBAQDwAQAh1QEBAPABACHcAQAArQLcASIBAAAAAQAgEgYAAIECACAJAAD1AQAgDwAA9gEAIBAAAIACACARAACCAgAgmgEAAP0BADCbAQAAAwAQnAEAAP0BADCdAQEA8AEAIaYBQADzAQAhpwFAAPMBACG2AQEA8AEAIbcBAQDwAQAhuAECAP4BACG5AQEA8AEAIboBCAD_AQAhuwEIAP8BACG8AQIA_gEAIQEAAAADACAXBAAAgAIAIAUAAKsCACAKAACzAgAgCwAAtAIAIA0AALUCACAOAAC2AgAgmgEAALECADCbAQAABQAQnAEAALECADCdAQEA8AEAIaUBAACyAtkBIqYBQADzAQAhpwFAAPMBACHFAQEA8AEAIcYBAQDwAQAh0gEBAPABACHTAUAA8wEAIdQBQADzAQAh1QFAAPMBACHWAQEA8AEAIdcBAQDwAQAh2QEBAJoCACHaAQEAmgIAIQgEAADbAwAgBQAA0QMAIAoAAIoEACALAACLBAAgDQAAjAQAIA4AAI0EACDZAQAA5QMAINoBAADlAwAgFwQAAIACACAFAACrAgAgCgAAswIAIAsAALQCACANAAC1AgAgDgAAtgIAIJoBAACxAgAwmwEAAAUAEJwBAACxAgAwnQEBAAAAAaUBAACyAtkBIqYBQADzAQAhpwFAAPMBACHFAQEA8AEAIcYBAQDwAQAh0gEBAPABACHTAUAA8wEAIdQBQADzAQAh1QFAAPMBACHWAQEA8AEAIdcBAQDwAQAh2QEBAJoCACHaAQEAmgIAIQMAAAAFACACAAAGADADAAAHACAQAQAAqwIAIAgAALACACAJAAD1AQAgmgEAAK8CADCbAQAACQAQnAEAAK8CADCdAQEA8AEAIaYBQADzAQAhpwFAAPMBACG9AQEA8AEAIb4BAQDwAQAhvwEIAP8BACHAAQEA8AEAIcEBAQDwAQAhwgECAP4BACHDASAArgIAIQMBAADRAwAgCAAAiQQAIAkAANIDACAQAQAAqwIAIAgAALACACAJAAD1AQAgmgEAAK8CADCbAQAACQAQnAEAAK8CADCdAQEAAAABpgFAAPMBACGnAUAA8wEAIb0BAQDwAQAhvgEBAPABACG_AQgA_wEAIcABAQDwAQAhwQEBAPABACHCAQIA_gEAIcMBIACuAgAhAwAAAAkAIAIAAAoAMAMAAAsAIAEAAAAJACADAAAABQAgAgAABgAwAwAABwAgAQAAAAUAIA0BAACrAgAgCQAA9QEAIJoBAACsAgAwmwEAABAAEJwBAACsAgAwnQEBAPABACGmAUAA8wEAIacBQADzAQAhwwEgAK4CACHGAQEA8AEAIdQBAQDwAQAh1QEBAPABACHcAQAArQLcASIBAAAAEAAgDwwAAJ8CACCaAQAAmQIAMJsBAAASABCcAQAAmQIAMJ0BAQDwAQAhpQEAAJ0C0AEipgFAAPMBACGnAUAA8wEAIcQBAQDwAQAhyQEBAJoCACHKAQgA_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_AQgAAAABwAEBAAAAAcEBAQAAAAHCAQIAAAABwwEgAAAAAQEXAAChAQAwARcAAKEBADANAQAA4wMAIAgAALwDACAJAAC9AwAgnQEBALoCACGmAUAAvQIAIacBQAC9AgAhvQEBALoCACG-AQEAugIAIb8BCADwAgAhwAEBALoCACHBAQEAugIAIcIBAgDLAgAhwwEgAKMDACECAAAACwAgFwAApAEAIAqdAQEAugIAIaYBQAC9AgAhpwFAAL0CACG9AQEAugIAIb4BAQC6AgAhvwEIAPACACHAAQEAugIAIcEBAQC6AgAhwgECAMsCACHDASAAowMAIQIAAAAJACAXAACmAQAgAgAAAAkAIBcAAKYBACADAAAACwAgHgAAnwEAIB8AAKQBACABAAAACwAgAQAAAAkAIAUHAADeAwAgJAAA4QMAICUAAOADACBWAADfAwAgVwAA4gMAIA2aAQAAgwIAMJsBAACtAQAQnAEAAIMCADCdAQEA4gEAIaYBQADlAQAhpwFAAOUBACG9AQEA4gEAIb4BAQDiAQAhvwEIAPkBACHAAQEA4gEAIcEBAQDiAQAhwgECAPgBACHDASAAhAIAIQMAAAAJACACAACsAQAwIwAArQEAIAMAAAAJACACAAAKADADAAALACASBgAAgQIAIAkAAPUBACAPAAD2AQAgEAAAgAIAIBEAAIICACCaAQAA_QEAMJsBAAADABCcAQAA_QEAMJ0BAQAAAAGmAUAA8wEAIacBQADzAQAhtgEBAAAAAbcBAQDwAQAhuAECAP4BACG5AQEA8AEAIboBCAD_AQAhuwEIAP8BACG8AQIA_gEAIQEAAACwAQAgAQAAALABACAFBgAA3AMAIAkAANIDACAPAADTAwAgEAAA2wMAIBEAAN0DACADAAAAAwAgAgAAswEAMAMAALABACADAAAAAwAgAgAAswEAMAMAALABACADAAAAAwAgAgAAswEAMAMAALABACAPBgAAygMAIAkAAMwDACAPAADNAwAgEAAA2gMAIBEAAMsDACCdAQEAAAABpgFAAAAAAacBQAAAAAG2AQEAAAABtwEBAAAAAbgBAgAAAAG5AQEAAAABugEIAAAAAbsBCAAAAAG8AQIAAAABARcAALcBACAKnQEBAAAAAaYBQAAAAAGnAUAAAAABtgEBAAAAAbcBAQAAAAG4AQIAAAABuQEBAAAAAboBCAAAAAG7AQgAAAABvAECAAAAAQEXAAC5AQAwARcAALkBADAPBgAAgAMAIAkAAIIDACAPAACDAwAgEAAA2QMAIBEAAIEDACCdAQEAugIAIaYBQAC9AgAhpwFAAL0CACG2AQEAugIAIbcBAQC6AgAhuAECAMsCACG5AQEAugIAIboBCADwAgAhuwEIAPACACG8AQIAywIAIQIAAACwAQAgFwAAvAEAIAqdAQEAugIAIaYBQAC9AgAhpwFAAL0CACG2AQEAugIAIbcBAQC6AgAhuAECAMsCACG5AQEAugIAIboBCADwAgAhuwEIAPACACG8AQIAywIAIQIAAAADACAXAAC-AQAgAgAAAAMAIBcAAL4BACADAAAAsAEAIB4AALcBACAfAAC8AQAgAQAAALABACABAAAAAwAgBQcAANQDACAkAADXAwAgJQAA1gMAIFYAANUDACBXAADYAwAgDZoBAAD3AQAwmwEAAMUBABCcAQAA9wEAMJ0BAQDiAQAhpgFAAOUBACGnAUAA5QEAIbYBAQDiAQAhtwEBAOIBACG4AQIA-AEAIbkBAQDiAQAhugEIAPkBACG7AQgA-QEAIbwBAgD4AQAhAwAAAAMAIAIAAMQBADAjAADFAQAgAwAAAAMAIAIAALMBADADAACwAQAgDwEAAPQBACAEAAD1AQAgDwAA9gEAIJoBAADvAQAwmwEAAMsBABCcAQAA7wEAMJ0BAQAAAAGeAQEA8AEAIZ8BAQAAAAGgAQEA8AEAIaEBAQDwAQAhowEAAPEBowEipQEAAPIBpQEipgFAAPMBACGnAUAA8wEAIQEAAADIAQAgAQAAAMgBACAPAQAA9AEAIAQAAPUBACAPAAD2AQAgmgEAAO8BADCbAQAAywEAEJwBAADvAQAwnQEBAPABACGeAQEA8AEAIZ8BAQDwAQAhoAEBAPABACGhAQEA8AEAIaMBAADxAaMBIqUBAADyAaUBIqYBQADzAQAhpwFAAPMBACEDAQAA0QMAIAQAANIDACAPAADTAwAgAwAAAMsBACACAADMAQAwAwAAyAEAIAMAAADLAQAgAgAAzAEAMAMAAMgBACADAAAAywEAIAIAAMwBADADAADIAQAgDAEAAM4DACAEAADPAwAgDwAA0AMAIJ0BAQAAAAGeAQEAAAABnwEBAAAAAaABAQAAAAGhAQEAAAABowEAAACjAQKlAQAAAKUBAqYBQAAAAAGnAUAAAAABARcAANABACAJnQEBAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGjAQAAAKMBAqUBAAAApQECpgFAAAAAAacBQAAAAAEBFwAA0gEAMAEXAADSAQAwDAEAAL4CACAEAAC_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-AQAhuQEBAPABACG6AQgA_wEAIbsBCAD_AQAhvAECAP4BACHdAQAAAwAg3gEAAAMAIAOzAQAABQAgtAEAAAUAILUBAAAFACADswEAABQAILQBAAAUACC1AQAAFAAgDZoBAAD3AQAwmwEAAMUBABCcAQAA9wEAMJ0BAQDiAQAhpgFAAOUBACGnAUAA5QEAIbYBAQDiAQAhtwEBAOIBACG4AQIA-AEAIbkBAQDiAQAhugEIAPkBACG7AQgA-QEAIbwBAgD4AQAhDQcAAOcBACAkAADnAQAgJQAA5wEAIFYAAPsBACBXAADnAQAgqAECAAAAAakBAgAAAASqAQIAAAAEqwECAAAAAawBAgAAAAGtAQIAAAABrgECAAAAAa8BAgD8AQAhDQcAAOcBACAkAAD7AQAgJQAA-wEAIFYAAPsBACBXAAD7AQAgqAEIAAAAAakBCAAAAASqAQgAAAAEqwEIAAAAAawBCAAAAAGtAQgAAAABrgEIAAAAAa8BCAD6AQAhDQcAAOcBACAkAAD7AQAgJQAA-wEAIFYAAPsBACBXAAD7AQAgqAEIAAAAAakBCAAAAASqAQgAAAAEqwEIAAAAAawBCAAAAAGtAQgAAAABrgEIAAAAAa8BCAD6AQAhCKgBCAAAAAGpAQgAAAAEqgEIAAAABKsBCAAAAAGsAQgAAAABrQEIAAAAAa4BCAAAAAGvAQgA-wEAIQ0HAADnAQAgJAAA5wEAICUAAOcBACBWAAD7AQAgVwAA5wEAIKgBAgAAAAGpAQIAAAAEqgECAAAABKsBAgAAAAGsAQIAAAABrQECAAAAAa4BAgAAAAGvAQIA_AEAIRIGAACBAgAgCQAA9QEAIA8AAPYBACAQAACAAgAgEQAAggIAIJoBAAD9AQAwmwEAAAMAEJwBAAD9AQAwnQEBAPABACGmAUAA8wEAIacBQADzAQAhtgEBAPABACG3AQEA8AEAIbgBAgD-AQAhuQEBAPABACG6AQgA_wEAIbsBCAD_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_wEAIcwBAACbAswBIs4BAACcAs4BItABAQCaAgAh0QFAAJ4CACELqAEBAAAAAakBAQAAAAWqAQEAAAAFqwEBAAAAAawBAQAAAAGtAQEAAAABrgEBAAAAAa8BAQCLAgAhsAEBAAAAAbEBAQAAAAGyAQEAAAABBKgBAAAAzAECqQEAAADMAQiqAQAAAMwBCK8BAACYAswBIgSoAQAAAM4BAqkBAAAAzgEIqgEAAADOAQivAQAAlgLOASIEqAEAAADQAQKpAQAAANABCKoBAAAA0AEIrwEAAJQC0AEiCKgBQAAAAAGpAUAAAAAFqgFAAAAABasBQAAAAAGsAUAAAAABrQFAAAAAAa4BQAAAAAGvAUAAkgIAIRkEAACAAgAgBQAAqwIAIAoAALMCACALAAC0AgAgDQAAtQIAIA4AALYCACCaAQAAsQIAMJsBAAAFABCcAQAAsQIAMJ0BAQDwAQAhpQEAALIC2QEipgFAAPMBACGnAUAA8wEAIcUBAQDwAQAhxgEBAPABACHSAQEA8AEAIdMBQADzAQAh1AFAAPMBACHVAUAA8wEAIdYBAQDwAQAh1wEBAPABACHZAQEAmgIAIdoBAQCaAgAh3QEAAAUAIN4BAAAFACAHmgEAAKACADCbAQAAaQAQnAEAAKACADCdAQEA4gEAIZ4BAQDiAQAhpgFAAOUBACGnAUAA5QEAIQgGAACBAgAgmgEAAKECADCbAQAAVgAQnAEAAKECADCdAQEA8AEAIZ4BAQDwAQAhpgFAAPMBACGnAUAA8wEAIRGaAQAAogIAMJsBAABQABCcAQAAogIAMJ0BAQDiAQAhpQEAAKMC2QEipgFAAOUBACGnAUAA5QEAIcUBAQDiAQAhxgEBAOIBACHSAQEA4gEAIdMBQADlAQAh1AFAAOUBACHVAUAA5QEAIdYBAQDiAQAh1wEBAOIBACHZAQEAiAIAIdoBAQCIAgAhBwcAAOcBACAkAAClAgAgJQAApQIAIKgBAAAA2QECqQEAAADZAQiqAQAAANkBCK8BAACkAtkBIgcHAADnAQAgJAAApQIAICUAAKUCACCoAQAAANkBAqkBAAAA2QEIqgEAAADZAQivAQAApALZASIEqAEAAADZAQKpAQAAANkBCKoBAAAA2QEIrwEAAKUC2QEiC5oBAACmAgAwmwEAADgAEJwBAACmAgAwnQEBAOIBACGmAUAA5QEAIacBQADlAQAhwwEgAIQCACHGAQEA4gEAIdQBAQDiAQAh1QEBAOIBACHcAQAApwLcASIHBwAA5wEAICQAAKkCACAlAACpAgAgqAEAAADcAQKpAQAAANwBCKoBAAAA3AEIrwEAAKgC3AEiBwcAAOcBACAkAACpAgAgJQAAqQIAIKgBAAAA3AECqQEAAADcAQiqAQAAANwBCK8BAACoAtwBIgSoAQAAANwBAqkBAAAA3AEIqgEAAADcAQivAQAAqQLcASIOBAAAgAIAIAUAAKsCACAMAACfAgAgmgEAAKoCADCbAQAAFAAQnAEAAKoCADCdAQEA8AEAIaYBQADzAQAhpwFAAPMBACHEAQEA8AEAIcUBAQDwAQAhxgEBAPABACHHAQIA_gEAIcgBAQCaAgAhFAYAAIECACAJAAD1AQAgDwAA9gEAIBAAAIACACARAACCAgAgmgEAAP0BADCbAQAAAwAQnAEAAP0BADCdAQEA8AEAIaYBQADzAQAhpwFAAPMBACG2AQEA8AEAIbcBAQDwAQAhuAECAP4BACG5AQEA8AEAIboBCAD_AQAhuwEIAP8BACG8AQIA_gEAId0BAAADACDeAQAAAwAgDQEAAKsCACAJAAD1AQAgmgEAAKwCADCbAQAAEAAQnAEAAKwCADCdAQEA8AEAIaYBQADzAQAhpwFAAPMBACHDASAArgIAIcYBAQDwAQAh1AEBAPABACHVAQEA8AEAIdwBAACtAtwBIgSoAQAAANwBAqkBAAAA3AEIqgEAAADcAQivAQAAqQLcASICqAEgAAAAAa8BIACGAgAhEAEAAKsCACAIAACwAgAgCQAA9QEAIJoBAACvAgAwmwEAAAkAEJwBAACvAgAwnQEBAPABACGmAUAA8wEAIacBQADzAQAhvQEBAPABACG-AQEA8AEAIb8BCAD_AQAhwAEBAPABACHBAQEA8AEAIcIBAgD-AQAhwwEgAK4CACEKBgAAgQIAIJoBAAChAgAwmwEAAFYAEJwBAAChAgAwnQEBAPABACGeAQEA8AEAIaYBQADzAQAhpwFAAPMBACHdAQAAVgAg3gEAAFYAIBcEAACAAgAgBQAAqwIAIAoAALMCACALAAC0AgAgDQAAtQIAIA4AALYCACCaAQAAsQIAMJsBAAAFABCcAQAAsQIAMJ0BAQDwAQAhpQEAALIC2QEipgFAAPMBACGnAUAA8wEAIcUBAQDwAQAhxgEBAPABACHSAQEA8AEAIdMBQADzAQAh1AFAAPMBACHVAUAA8wEAIdYBAQDwAQAh1wEBAPABACHZAQEAmgIAIdoBAQCaAgAhBKgBAAAA2QECqQEAAADZAQiqAQAAANkBCK8BAAClAtkBIhIBAACrAgAgCAAAsAIAIAkAAPUBACCaAQAArwIAMJsBAAAJABCcAQAArwIAMJ0BAQDwAQAhpgFAAPMBACGnAUAA8wEAIb0BAQDwAQAhvgEBAPABACG_AQgA_wEAIcABAQDwAQAhwQEBAPABACHCAQIA_gEAIcMBIACuAgAh3QEAAAkAIN4BAAAJACAPAQAAqwIAIAkAAPUBACCaAQAArAIAMJsBAAAQABCcAQAArAIAMJ0BAQDwAQAhpgFAAPMBACGnAUAA8wEAIcMBIACuAgAhxgEBAPABACHUAQEA8AEAIdUBAQDwAQAh3AEAAK0C3AEi3QEAABAAIN4BAAAQACARDAAAnwIAIJoBAACZAgAwmwEAABIAEJwBAACZAgAwnQEBAPABACGlAQAAnQLQASKmAUAA8wEAIacBQADzAQAhxAEBAPABACHJAQEAmgIAIcoBCAD_AQAhzAEAAJsCzAEizgEAAJwCzgEi0AEBAJoCACHRAUAAngIAId0BAAASACDeAQAAEgAgEAQAAIACACAFAACrAgAgDAAAnwIAIJoBAACqAgAwmwEAABQAEJwBAACqAgAwnQEBAPABACGmAUAA8wEAIacBQADzAQAhxAEBAPABACHFAQEA8AEAIcYBAQDwAQAhxwECAP4BACHIAQEAmgIAId0BAAAUACDeAQAAFAAgAAAAAeIBAQAAAAEB4gEAAACjAQIB4gEAAAClAQIB4gFAAAAAAQceAAD7AgAgHwAA_gIAIN8BAAD8AgAg4AEAAP0CACDjAQAAAwAg5AEAAAMAIOUBAACwAQAgCx4AANMCADAfAADYAgAw3wEAANQCADDgAQAA1QIAMOEBAADWAgAg4gEAANcCADDjAQAA1wIAMOQBAADXAgAw5QEAANcCADDmAQAA2QIAMOcBAADaAgAwCx4AAMECADAfAADGAgAw3wEAAMICADDgAQAAwwIAMOEBAADEAgAg4gEAAMUCADDjAQAAxQIAMOQBAADFAgAw5QEAAMUCADDmAQAAxwIAMOcBAADIAgAwCQUAANICACAMAADRAgAgnQEBAAAAAaYBQAAAAAGnAUAAAAABxAEBAAAAAcYBAQAAAAHHAQIAAAAByAEBAAAAAQIAAAAXACAeAADQAgAgAwAAABcAIB4AANACACAfAADNAgAgARcAANIEADAOBAAAgAIAIAUAAKsCACAMAACfAgAgmgEAAKoCADCbAQAAFAAQnAEAAKoCADCdAQEAAAABpgFAAPMBACGnAUAA8wEAIcQBAQAAAAHFAQEA8AEAIcYBAQDwAQAhxwECAP4BACHIAQEAmgIAIQIAAAAXACAXAADNAgAgAgAAAMkCACAXAADKAgAgC5oBAADIAgAwmwEAAMkCABCcAQAAyAIAMJ0BAQDwAQAhpgFAAPMBACGnAUAA8wEAIcQBAQDwAQAhxQEBAPABACHGAQEA8AEAIccBAgD-AQAhyAEBAJoCACELmgEAAMgCADCbAQAAyQIAEJwBAADIAgAwnQEBAPABACGmAUAA8wEAIacBQADzAQAhxAEBAPABACHFAQEA8AEAIcYBAQDwAQAhxwECAP4BACHIAQEAmgIAIQedAQEAugIAIaYBQAC9AgAhpwFAAL0CACHEAQEAugIAIcYBAQC6AgAhxwECAMsCACHIAQEAzAIAIQXiAQIAAAAB6AECAAAAAekBAgAAAAHqAQIAAAAB6wECAAAAAQHiAQEAAAABCQUAAM8CACAMAADOAgAgnQEBALoCACGmAUAAvQIAIacBQAC9AgAhxAEBALoCACHGAQEAugIAIccBAgDLAgAhyAEBAMwCACEFHgAAygQAIB8AANAEACDfAQAAywQAIOABAADPBAAg5QEAAAcAIAUeAADIBAAgHwAAzQQAIN8BAADJBAAg4AEAAMwEACDlAQAAsAEAIAkFAADSAgAgDAAA0QIAIJ0BAQAAAAGmAUAAAAABpwFAAAAAAcQBAQAAAAHGAQEAAAABxwECAAAAAcgBAQAAAAEDHgAAygQAIN8BAADLBAAg5QEAAAcAIAMeAADIBAAg3wEAAMkEACDlAQAAsAEAIBIFAAD2AgAgCgAA9wIAIAsAAPgCACANAAD5AgAgDgAA-gIAIJ0BAQAAAAGlAQAAANkBAqYBQAAAAAGnAUAAAAABxgEBAAAAAdIBAQAAAAHTAUAAAAAB1AFAAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAdkBAQAAAAHaAQEAAAABAgAAAAcAIB4AAPUCACADAAAABwAgHgAA9QIAIB8AAN4CACABFwAAxwQAMBcEAACAAgAgBQAAqwIAIAoAALMCACALAAC0AgAgDQAAtQIAIA4AALYCACCaAQAAsQIAMJsBAAAFABCcAQAAsQIAMJ0BAQAAAAGlAQAAsgLZASKmAUAA8wEAIacBQADzAQAhxQEBAPABACHGAQEA8AEAIdIBAQDwAQAh0wFAAPMBACHUAUAA8wEAIdUBQADzAQAh1gEBAPABACHXAQEA8AEAIdkBAQCaAgAh2gEBAJoCACECAAAABwAgFwAA3gIAIAIAAADbAgAgFwAA3AIAIBGaAQAA2gIAMJsBAADbAgAQnAEAANoCADCdAQEA8AEAIaUBAACyAtkBIqYBQADzAQAhpwFAAPMBACHFAQEA8AEAIcYBAQDwAQAh0gEBAPABACHTAUAA8wEAIdQBQADzAQAh1QFAAPMBACHWAQEA8AEAIdcBAQDwAQAh2QEBAJoCACHaAQEAmgIAIRGaAQAA2gIAMJsBAADbAgAQnAEAANoCADCdAQEA8AEAIaUBAACyAtkBIqYBQADzAQAhpwFAAPMBACHFAQEA8AEAIcYBAQDwAQAh0gEBAPABACHTAUAA8wEAIdQBQADzAQAh1QFAAPMBACHWAQEA8AEAIdcBAQDwAQAh2QEBAJoCACHaAQEAmgIAIQ2dAQEAugIAIaUBAADdAtkBIqYBQAC9AgAhpwFAAL0CACHGAQEAugIAIdIBAQC6AgAh0wFAAL0CACHUAUAAvQIAIdUBQAC9AgAh1gEBALoCACHXAQEAugIAIdkBAQDMAgAh2gEBAMwCACEB4gEAAADZAQISBQAA3wIAIAoAAOACACALAADhAgAgDQAA4gIAIA4AAOMCACCdAQEAugIAIaUBAADdAtkBIqYBQAC9AgAhpwFAAL0CACHGAQEAugIAIdIBAQC6AgAh0wFAAL0CACHUAUAAvQIAIdUBQAC9AgAh1gEBALoCACHXAQEAugIAIdkBAQDMAgAh2gEBAMwCACEFHgAAtwQAIB8AAMUEACDfAQAAuAQAIOABAADEBAAg5QEAALABACAFHgAAtQQAIB8AAMIEACDfAQAAtgQAIOABAADBBAAg5QEAAAsAIAceAACzBAAgHwAAvwQAIN8BAAC0BAAg4AEAAL4EACDjAQAAEAAg5AEAABAAIOUBAAABACAHHgAA6wIAIB8AAO4CACDfAQAA7AIAIOABAADtAgAg4wEAABIAIOQBAAASACDlAQAAbAAgBx4AAOQCACAfAADnAgAg3wEAAOUCACDgAQAA5gIAIOMBAAAUACDkAQAAFAAg5QEAABcAIAkEAADqAgAgBQAA0gIAIJ0BAQAAAAGmAUAAAAABpwFAAAAAAcUBAQAAAAHGAQEAAAABxwECAAAAAcgBAQAAAAECAAAAFwAgHgAA5AIAIAMAAAAUACAeAADkAgAgHwAA6AIAIAsAAAAUACAEAADpAgAgBQAAzwIAIBcAAOgCACCdAQEAugIAIaYBQAC9AgAhpwFAAL0CACHFAQEAugIAIcYBAQC6AgAhxwECAMsCACHIAQEAzAIAIQkEAADpAgAgBQAAzwIAIJ0BAQC6AgAhpgFAAL0CACGnAUAAvQIAIcUBAQC6AgAhxgEBALoCACHHAQIAywIAIcgBAQDMAgAhBR4AALkEACAfAAC8BAAg3wEAALoEACDgAQAAuwQAIOUBAADIAQAgAx4AALkEACDfAQAAugQAIOUBAADIAQAgCp0BAQAAAAGlAQAAANABAqYBQAAAAAGnAUAAAAAByQEBAAAAAcoBCAAAAAHMAQAAAMwBAs4BAAAAzgEC0AEBAAAAAdEBQAAAAAECAAAAbAAgHgAA6wIAIAMAAAASACAeAADrAgAgHwAA7wIAIAwAAAASACAXAADvAgAgnQEBALoCACGlAQAA8wLQASKmAUAAvQIAIacBQAC9AgAhyQEBAMwCACHKAQgA8AIAIcwBAADxAswBIs4BAADyAs4BItABAQDMAgAh0QFAAPQCACEKnQEBALoCACGlAQAA8wLQASKmAUAAvQIAIacBQAC9AgAhyQEBAMwCACHKAQgA8AIAIcwBAADxAswBIs4BAADyAs4BItABAQDMAgAh0QFAAPQCACEF4gEIAAAAAegBCAAAAAHpAQgAAAAB6gEIAAAAAesBCAAAAAEB4gEAAADMAQIB4gEAAADOAQIB4gEAAADQAQIB4gFAAAAAARIFAAD2AgAgCgAA9wIAIAsAAPgCACANAAD5AgAgDgAA-gIAIJ0BAQAAAAGlAQAAANkBAqYBQAAAAAGnAUAAAAABxgEBAAAAAdIBAQAAAAHTAUAAAAAB1AFAAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAdkBAQAAAAHaAQEAAAABAx4AALcEACDfAQAAuAQAIOUBAACwAQAgAx4AALUEACDfAQAAtgQAIOUBAAALACADHgAAswQAIN8BAAC0BAAg5QEAAAEAIAMeAADrAgAg3wEAAOwCACDlAQAAbAAgAx4AAOQCACDfAQAA5QIAIOUBAAAXACANBgAAygMAIAkAAMwDACAPAADNAwAgEQAAywMAIJ0BAQAAAAGmAUAAAAABpwFAAAAAAbcBAQAAAAG4AQIAAAABuQEBAAAAAboBCAAAAAG7AQgAAAABvAECAAAAAQIAAACwAQAgHgAA-wIAIAMAAAADACAeAAD7AgAgHwAA_wIAIA8AAAADACAGAACAAwAgCQAAggMAIA8AAIMDACARAACBAwAgFwAA_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_AQgA_wEAIcABAQDwAQAhwQEBAPABACHCAQIA_gEAIcMBIACuAgAhDZoBAAC4AwAwmwEAALkDABCcAQAAuAMAMJ0BAQDwAQAhpgFAAPMBACGnAUAA8wEAIb0BAQDwAQAhvgEBAPABACG_AQgA_wEAIcABAQDwAQAhwQEBAPABACHCAQIA_gEAIcMBIACuAgAhCZ0BAQC6AgAhpgFAAL0CACGnAUAAvQIAIb0BAQC6AgAhvgEBALoCACG_AQgA8AIAIcABAQC6AgAhwgECAMsCACHDASAAowMAIQsIAAC8AwAgCQAAvQMAIJ0BAQC6AgAhpgFAAL0CACGnAUAAvQIAIb0BAQC6AgAhvgEBALoCACG_AQgA8AIAIcABAQC6AgAhwgECAMsCACHDASAAowMAIQUeAACjBAAgHwAApwQAIN8BAACkBAAg4AEAAKYEACDlAQAAUwAgCx4AAL4DADAfAADCAwAw3wEAAL8DADDgAQAAwAMAMOEBAADBAwAg4gEAANcCADDjAQAA1wIAMOQBAADXAgAw5QEAANcCADDmAQAAwwMAMOcBAADaAgAwEgQAAJcDACAFAAD2AgAgCwAA-AIAIA0AAPkCACAOAAD6AgAgnQEBAAAAAaUBAAAA2QECpgFAAAAAAacBQAAAAAHFAQEAAAABxgEBAAAAAdMBQAAAAAHUAUAAAAAB1QFAAAAAAdYBAQAAAAHXAQEAAAAB2QEBAAAAAdoBAQAAAAECAAAABwAgHgAAxgMAIAMAAAAHACAeAADGAwAgHwAAxQMAIAEXAAClBAAwAgAAAAcAIBcAAMUDACACAAAA2wIAIBcAAMQDACANnQEBALoCACGlAQAA3QLZASKmAUAAvQIAIacBQAC9AgAhxQEBALoCACHGAQEAugIAIdMBQAC9AgAh1AFAAL0CACHVAUAAvQIAIdYBAQC6AgAh1wEBALoCACHZAQEAzAIAIdoBAQDMAgAhEgQAAJUDACAFAADfAgAgCwAA4QIAIA0AAOICACAOAADjAgAgnQEBALoCACGlAQAA3QLZASKmAUAAvQIAIacBQAC9AgAhxQEBALoCACHGAQEAugIAIdMBQAC9AgAh1AFAAL0CACHVAUAAvQIAIdYBAQC6AgAh1wEBALoCACHZAQEAzAIAIdoBAQDMAgAhEgQAAJcDACAFAAD2AgAgCwAA-AIAIA0AAPkCACAOAAD6AgAgnQEBAAAAAaUBAAAA2QECpgFAAAAAAacBQAAAAAHFAQEAAAABxgEBAAAAAdMBQAAAAAHUAUAAAAAB1QFAAAAAAdYBAQAAAAHXAQEAAAAB2QEBAAAAAdoBAQAAAAELCAAAyAMAIAkAAMkDACCdAQEAAAABpgFAAAAAAacBQAAAAAG9AQEAAAABvgEBAAAAAb8BCAAAAAHAAQEAAAABwgECAAAAAcMBIAAAAAEDHgAAowQAIN8BAACkBAAg5QEAAFMAIAQeAAC-AwAw3wEAAL8DADDhAQAAwQMAIOUBAADXAgAwBB4AALEDADDfAQAAsgMAMOEBAAC0AwAg5QEAALUDADAEHgAAmAMAMN8BAACZAwAw4QEAAJsDACDlAQAAnAMAMAQeAACNAwAw3wEAAI4DADDhAQAAkAMAIOUBAADXAgAwBB4AAIQDADDfAQAAhQMAMOEBAACHAwAg5QEAAMUCADADHgAA-wIAIN8BAAD8AgAg5QEAALABACAEHgAA0wIAMN8BAADUAgAw4QEAANYCACDlAQAA1wIAMAQeAADBAgAw3wEAAMICADDhAQAAxAIAIOUBAADFAgAwBQYAANwDACAJAADSAwAgDwAA0wMAIBAAANsDACARAADdAwAgAAAAAAAAAAUeAACeBAAgHwAAoQQAIN8BAACfBAAg4AEAAKAEACDlAQAAyAEAIAMeAACeBAAg3wEAAJ8EACDlAQAAyAEAIAMBAADRAwAgBAAA0gMAIA8AANMDACAAAAAAAAAABR4AAJkEACAfAACcBAAg3wEAAJoEACDgAQAAmwQAIOUBAACwAQAgAx4AAJkEACDfAQAAmgQAIOUBAACwAQAgAAAAAAAAAAAAAAAFHgAAlAQAIB8AAJcEACDfAQAAlQQAIOABAACWBAAg5QEAAAcAIAMeAACUBAAg3wEAAJUEACDlAQAABwAgCAQAANsDACAFAADRAwAgCgAAigQAIAsAAIsEACANAACMBAAgDgAAjQQAINkBAADlAwAg2gEAAOUDACAAAAALHgAA9wMAMB8AAPsDADDfAQAA-AMAMOABAAD5AwAw4QEAAPoDACDiAQAAtQMAMOMBAAC1AwAw5AEAALUDADDlAQAAtQMAMOYBAAD8AwAw5wEAALgDADALAQAA5AMAIAkAAMkDACCdAQEAAAABpgFAAAAAAacBQAAAAAG9AQEAAAABvgEBAAAAAb8BCAAAAAHBAQEAAAABwgECAAAAAcMBIAAAAAECAAAACwAgHgAA_wMAIAMAAAALACAeAAD_AwAgHwAA_gMAIAEXAACTBAAwAgAAAAsAIBcAAP4DACACAAAAuQMAIBcAAP0DACAJnQEBALoCACGmAUAAvQIAIacBQAC9AgAhvQEBALoCACG-AQEAugIAIb8BCADwAgAhwQEBALoCACHCAQIAywIAIcMBIACjAwAhCwEAAOMDACAJAAC9AwAgnQEBALoCACGmAUAAvQIAIacBQAC9AgAhvQEBALoCACG-AQEAugIAIb8BCADwAgAhwQEBALoCACHCAQIAywIAIcMBIACjAwAhCwEAAOQDACAJAADJAwAgnQEBAAAAAaYBQAAAAAGnAUAAAAABvQEBAAAAAb4BAQAAAAG_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_AgAgDwAAwAIAIBcAAKIEACCdAQEAugIAIZ4BAQC6AgAhnwEBALoCACGgAQEAugIAIaEBAQC6AgAhowEAALsCowEipQEAALwCpQEipgFAAL0CACGnAUAAvQIAIQsEAAC_AgAgDwAAwAIAIJ0BAQC6AgAhngEBALoCACGfAQEAugIAIaABAQC6AgAhoQEBALoCACGjAQAAuwKjASKlAQAAvAKlASKmAUAAvQIAIacBQAC9AgAhBJ0BAQAAAAGeAQEAAAABpgFAAAAAAacBQAAAAAECAAAAUwAgHgAAowQAIA2dAQEAAAABpQEAAADZAQKmAUAAAAABpwFAAAAAAcUBAQAAAAHGAQEAAAAB0wFAAAAAAdQBQAAAAAHVAUAAAAAB1gEBAAAAAdcBAQAAAAHZAQEAAAAB2gEBAAAAAQMAAABWACAeAACjBAAgHwAAqAQAIAYAAABWACAXAACoBAAgnQEBALoCACGeAQEAugIAIaYBQAC9AgAhpwFAAL0CACEEnQEBALoCACGeAQEAugIAIaYBQAC9AgAhpwFAAL0CACEJnQEBAAAAAaYBQAAAAAGnAUAAAAABvQEBAAAAAb4BAQAAAAG_AQgAAAABwAEBAAAAAcIBAgAAAAHDASAAAAABDZ0BAQAAAAGlAQAAANkBAqYBQAAAAAGnAUAAAAABxQEBAAAAAcYBAQAAAAHSAQEAAAAB0wFAAAAAAdQBQAAAAAHVAUAAAAAB1gEBAAAAAdcBAQAAAAHZAQEAAAABB50BAQAAAAGmAUAAAAABpwFAAAAAAcMBIAAAAAHUAQEAAAAB1QEBAAAAAdwBAAAA3AECCwEAAM4DACAPAADQAwAgnQEBAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGjAQAAAKMBAqUBAAAApQECpgFAAAAAAacBQAAAAAECAAAAyAEAIB4AAKwEACADAAAAywEAIB4AAKwEACAfAACwBAAgDQAAAMsBACABAAC-AgAgDwAAwAIAIBcAALAEACCdAQEAugIAIZ4BAQC6AgAhnwEBALoCACGgAQEAugIAIaEBAQC6AgAhowEAALsCowEipQEAALwCpQEipgFAAL0CACGnAUAAvQIAIQsBAAC-AgAgDwAAwAIAIJ0BAQC6AgAhngEBALoCACGfAQEAugIAIaABAQC6AgAhoQEBALoCACGjAQAAuwKjASKlAQAAvAKlASKmAUAAvQIAIacBQAC9AgAhDZ0BAQAAAAGlAQAAANkBAqYBQAAAAAGnAUAAAAABxQEBAAAAAdIBAQAAAAHTAUAAAAAB1AFAAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAdkBAQAAAAHaAQEAAAABB50BAQAAAAGmAUAAAAABpwFAAAAAAcQBAQAAAAHFAQEAAAABxwECAAAAAcgBAQAAAAEJAQAAiAQAIJ0BAQAAAAGmAUAAAAABpwFAAAAAAcMBIAAAAAHGAQEAAAAB1AEBAAAAAdUBAQAAAAHcAQAAANwBAgIAAAABACAeAACzBAAgDAEAAOQDACAIAADIAwAgnQEBAAAAAaYBQAAAAAGnAUAAAAABvQEBAAAAAb4BAQAAAAG_AQgAAAABwAEBAAAAAcEBAQAAAAHCAQIAAAABwwEgAAAAAQIAAAALACAeAAC1BAAgDgYAAMoDACAPAADNAwAgEAAA2gMAIBEAAMsDACCdAQEAAAABpgFAAAAAAacBQAAAAAG2AQEAAAABtwEBAAAAAbgBAgAAAAG5AQEAAAABugEIAAAAAbsBCAAAAAG8AQIAAAABAgAAALABACAeAAC3BAAgCwEAAM4DACAEAADPAwAgnQEBAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGjAQAAAKMBAqUBAAAApQECpgFAAAAAAacBQAAAAAECAAAAyAEAIB4AALkEACADAAAAywEAIB4AALkEACAfAAC9BAAgDQAAAMsBACABAAC-AgAgBAAAvwIAIBcAAL0EACCdAQEAugIAIZ4BAQC6AgAhnwEBALoCACGgAQEAugIAIaEBAQC6AgAhowEAALsCowEipQEAALwCpQEipgFAAL0CACGnAUAAvQIAIQsBAAC-AgAgBAAAvwIAIJ0BAQC6AgAhngEBALoCACGfAQEAugIAIaABAQC6AgAhoQEBALoCACGjAQAAuwKjASKlAQAAvAKlASKmAUAAvQIAIacBQAC9AgAhAwAAABAAIB4AALMEACAfAADABAAgCwAAABAAIAEAAIcEACAXAADABAAgnQEBALoCACGmAUAAvQIAIacBQAC9AgAhwwEgAKMDACHGAQEAugIAIdQBAQC6AgAh1QEBALoCACHcAQAAogPcASIJAQAAhwQAIJ0BAQC6AgAhpgFAAL0CACGnAUAAvQIAIcMBIACjAwAhxgEBALoCACHUAQEAugIAIdUBAQC6AgAh3AEAAKID3AEiAwAAAAkAIB4AALUEACAfAADDBAAgDgAAAAkAIAEAAOMDACAIAAC8AwAgFwAAwwQAIJ0BAQC6AgAhpgFAAL0CACGnAUAAvQIAIb0BAQC6AgAhvgEBALoCACG_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-Xg4_Xx1AYQZBYw5CZB5DZQZEZgZFZw5Gah9HayNIbQlJbglKcAlLcQlMcglNdAlOdg5PdyRQeQlRew5SfCVTfQlUfglVfw5YggEmWYMBLFqEAQpbhQEKXIYBCl2HAQpeiAEKX4oBCmCMAQ5hjQEtYo8BCmORAQ5kkgEuZZMBCmaUAQpnlQEOaJgBL2mZATVqmgEFa5sBBWycAQVtnQEFbp4BBW-gAQVwogEOcaMBNnKlAQVzpwEOdKgBN3WpAQV2qgEFd6sBDniuATh5rwE-erEBAnuyAQJ8tAECfbUBAn62AQJ_uAECgAG6AQ6BAbsBP4IBvQECgwG_AQ6EAcABQIUBwQEChgHCAQKHAcMBDogBxgFBiQHHAUeKAckBA4sBygEDjAHNAQONAc4BA44BzwEDjwHRAQOQAdMBDpEB1AFIkgHWAQOTAdgBDpQB2QFJlQHaAQOWAdsBA5cB3AEOmAHfAUqZAeABTg"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  ServiceScalarFieldEnum: () => ServiceScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TechnicianProfileScalarFieldEnum: () => TechnicianProfileScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Availability: "Availability",
  Booking: "Booking",
  Category: "Category",
  Payment: "Payment",
  Review: "Review",
  Service: "Service",
  TechnicianProfile: "TechnicianProfile",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AvailabilityScalarFieldEnum = {
  id: "id",
  technicianId: "technicianId",
  day: "day",
  startTime: "startTime",
  endTime: "endTime",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  technicianId: "technicianId",
  serviceId: "serviceId",
  bookingDate: "bookingDate",
  startTime: "startTime",
  endTime: "endTime",
  address: "address",
  problemDescription: "problemDescription",
  status: "status",
  cancelReason: "cancelReason",
  availabilityId: "availabilityId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  transactionId: "transactionId",
  amount: "amount",
  method: "method",
  provider: "provider",
  status: "status",
  stripePaymentIntentId: "stripePaymentIntentId",
  paidAt: "paidAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  customerId: "customerId",
  technicianId: "technicianId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ServiceScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  price: "price",
  categoryId: "categoryId",
  technicianProfileId: "technicianProfileId",
  estimatedDuration: "estimatedDuration",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TechnicianProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  experience: "experience",
  location: "location",
  hourlyRate: "hourlyRate",
  averageRating: "averageRating",
  completedJobs: "completedJobs",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  role: "role",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN"
};
var BookingStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  PAID: "PAID",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
var PaymentMethod = {
  CARD: "CARD"
};
var PaymentProvider = {
  STRIPE: "STRIPE"
};
var PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${config_default.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/utils/createToken.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

// src/modules/auth/auth.service.ts
var createUserIntoDB = async (payload) => {
  const { name, email, password, phone, role, status } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isUserExist) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(
    String(password),
    Number(config_default.BCRYPT_SALT_ROUNDS)
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status
    }
  });
  const user = prisma.user.findUnique({
    where: {
      id: createdUser.id
    },
    omit: {
      password: true
    }
  });
  return user;
};
var loginUser = async (payload) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }
  const isPasswordCorrect = await bcrypt.compare(
    String(payload.password),
    String(user.password)
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = createToken(
    jwtPayload,
    config_default.JWT_ACCESS_SECRET,
    config_default.JWT_ACCESS_EXPIRATION
  );
  const { password: _, ...data } = user;
  return { data, accessToken };
};
var getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    omit: {
      password: true
    }
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }
  return user;
};
var authService = {
  createUserIntoDB,
  loginUser,
  getMe
};

// src/modules/auth/auth.controller.ts
import httpStatus from "http-status";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
var catchAsync_default = catchAsync;

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data
  });
};
var sendResponse_default = sendResponse;

// src/modules/auth/auth.controller.ts
var createUser = catchAsync_default(async (req, res) => {
  const result = await authService.createUserIntoDB(req.body);
  sendResponse_default(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result
  });
});
var loginUser2 = catchAsync_default(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { accessToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1e3
    // 1 day
  });
  sendResponse_default(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result
  });
});
var getMe2 = catchAsync_default(async (req, res) => {
  const userId = req.user?.userId;
  const user = await authService.getMe(userId);
  sendResponse_default(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user
  });
});
var authController = {
  createUser,
  loginUser: loginUser2,
  getMe: getMe2
};

// src/utils/tokenVerify.ts
import jwt2 from "jsonwebtoken";
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt2.verify(token, secret);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, decoded: null };
  }
};

// src/middlewares/auth.ts
import httpStatus2 from "http-status";
var auth = (...requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided" });
      }
      const verifiedToken = verifyToken(
        token,
        config_default.JWT_ACCESS_SECRET
      );
      if (!verifiedToken.success || typeof verifiedToken.decoded === "string") {
        return res.status(httpStatus2.UNAUTHORIZED).json({ message: "Unauthorized. Invalid token" });
      }
      const { id, email, role } = verifiedToken.decoded;
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res.status(httpStatus2.FORBIDDEN).json({ message: "Forbidden. Insufficient permissions" });
      }
      const user = await prisma.user.findUnique({
        where: {
          id,
          email
        }
      });
      if (!user) {
        return res.status(httpStatus2.UNAUTHORIZED).json({ message: "Unauthorized. User not found" });
      }
      if (user.status === "BLOCKED") {
        return res.status(httpStatus2.FORBIDDEN).json({ message: "User is blocked. Please contact support." });
      }
      req.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      res.status(httpStatus2.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  };
};

// src/modules/auth/auth.route.ts
var router = Router();
router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get(
  "/me",
  auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  authController.getMe
);
var authRouter = router;

// src/app.ts
import cookieParser from "cookie-parser";

// src/modules/technicianProfile/technicianProfile.route.ts
import { Router as Router2 } from "express";

// src/modules/technicianProfile/technicianProfile.controller.ts
import httpStatus3 from "http-status";

// src/modules/technicianProfile/technicianProfile.service.ts
var createTechnicianProfile = async (userId, payload) => {
  const isProfileExists = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (isProfileExists) {
    throw new Error("Technician profile already exists");
  }
  const result = await prisma.technicianProfile.create({
    data: {
      userId,
      ...payload
    }
  });
  return result;
};
var updateTechnicianProfile = async (userId, payload) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!profile) {
    throw new Error("Technician profile not found");
  }
  const result = await prisma.technicianProfile.update({
    where: {
      userId
    },
    data: payload
  });
  return result;
};
var getMyProfile = async (userId) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      services: true,
      availabilities: true
    }
  });
  if (!result) {
    throw new Error("Technician profile not found");
  }
  return result;
};
var getSingleTechnician = async (id) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      },
      services: true,
      availabilities: true,
      bookings: true
    }
  });
  if (!result) {
    throw new Error("Technician not found");
  }
  return result;
};
var TechnicianProfileService = {
  createTechnicianProfile,
  updateTechnicianProfile,
  getMyProfile,
  getSingleTechnician
};

// src/modules/technicianProfile/technicianProfile.controller.ts
var createTechnicianProfile2 = catchAsync_default(
  async (req, res) => {
    const result = await TechnicianProfileService.createTechnicianProfile(
      req.user.userId,
      req.body
    );
    sendResponse_default(res, {
      statusCode: httpStatus3.CREATED,
      success: true,
      message: "Technician profile created successfully",
      data: result
    });
  }
);
var updateTechnicianProfile2 = catchAsync_default(
  async (req, res) => {
    const result = await TechnicianProfileService.updateTechnicianProfile(
      req.user.userId,
      req.body
    );
    sendResponse_default(res, {
      statusCode: httpStatus3.OK,
      success: true,
      message: "Technician profile updated successfully",
      data: result
    });
  }
);
var getMyProfile2 = catchAsync_default(async (req, res) => {
  const result = await TechnicianProfileService.getMyProfile(req.user.userId);
  sendResponse_default(res, {
    statusCode: httpStatus3.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result
  });
});
var getSingleTechnician2 = catchAsync_default(async (req, res) => {
  const result = await TechnicianProfileService.getSingleTechnician(
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: httpStatus3.OK,
    success: true,
    message: "Technician retrieved successfully",
    data: result
  });
});
var TechnicianProfileController = {
  createTechnicianProfile: createTechnicianProfile2,
  updateTechnicianProfile: updateTechnicianProfile2,
  getMyProfile: getMyProfile2,
  getSingleTechnician: getSingleTechnician2
};

// src/modules/technicianProfile/technicianProfile.route.ts
var router2 = Router2();
router2.post(
  "/",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.createTechnicianProfile
);
router2.patch(
  "/",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.updateTechnicianProfile
);
router2.get(
  "/me",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.getMyProfile
);
router2.get("/:id", TechnicianProfileController.getSingleTechnician);
var technicianProfileRouter = router2;

// src/modules/category/category.route.ts
import { Router as Router3 } from "express";

// src/modules/category/category.controller.ts
import httpStatus4 from "http-status";

// src/modules/category/category.service.ts
var createCategory = async (payload) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      name: payload.name
    }
  });
  if (isCategoryExists) {
    throw new Error("Category already exists");
  }
  const result = await prisma.category.create({
    data: payload
  });
  return result;
};
var getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSingleCategory = async (id) => {
  const result = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      services: true
    }
  });
  if (!result) {
    throw new Error("Category not found");
  }
  return result;
};
var updateCategory = async (id, payload) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      id
    }
  });
  if (!isCategoryExists) {
    throw new Error("Category not found");
  }
  if (payload.name) {
    const duplicateCategory = await prisma.category.findUnique({
      where: {
        name: payload.name
      }
    });
    if (duplicateCategory && duplicateCategory.id !== id) {
      throw new Error("Category already exists");
    }
  }
  const result = await prisma.category.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};
var deleteCategory = async (id) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      id
    }
  });
  if (!isCategoryExists) {
    throw new Error("Category not found");
  }
  const result = await prisma.category.delete({
    where: {
      id
    }
  });
  return result;
};
var categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse_default(res, {
    statusCode: httpStatus4.CREATED,
    success: true,
    message: "Category created successfully",
    data: result
  });
});
var getAllCategories2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.getAllCategories();
  sendResponse_default(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result
  });
});
var getSingleCategory2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.getSingleCategory(id);
  sendResponse_default(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result
  });
});
var updateCategory2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Category updated successfully",
    data: result
  });
});
var deleteCategory2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  res.status(httpStatus4.OK).json({
    success: true,
    message: "Category deleted successfully"
  });
  sendResponse_default(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Category deleted successfully",
    data: null
  });
});
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var router3 = Router3();
router3.get("/", categoryController.getAllCategories);
router3.get("/:id", categoryController.getSingleCategory);
router3.post("/", auth(Role.ADMIN), categoryController.createCategory);
router3.patch("/:id", auth(Role.ADMIN), categoryController.updateCategory);
router3.delete("/:id", auth(Role.ADMIN), categoryController.deleteCategory);
var categoryRouter = router3;

// src/modules/service/service.route.ts
import { Router as Router4 } from "express";

// src/modules/service/service.controller.ts
import httpStatus5 from "http-status";

// src/modules/service/service.service.ts
var createService = async (userId, payload) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianProfileId: technicianProfile.id
    },
    include: {
      category: true,
      technicianProfile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          }
        }
      }
    }
  });
  return result;
};
var updateService = async (userId, serviceId, payload) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId
    }
  });
  if (!service) {
    throw new Error("Service not found");
  }
  if (service.technicianProfileId !== technicianProfile.id) {
    throw new Error("You are not authorized to update this service");
  }
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId
      }
    });
    if (!category) {
      throw new Error("Category not found");
    }
  }
  const result = await prisma.service.update({
    where: {
      id: serviceId
    },
    data: payload,
    include: {
      category: true
    }
  });
  return result;
};
var deleteService = async (userId, serviceId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId
    }
  });
  if (!service) {
    throw new Error("Service not found");
  }
  if (service.technicianProfileId !== technicianProfile.id) {
    throw new Error("You are not authorized to delete this service");
  }
  await prisma.service.delete({
    where: {
      id: serviceId
    }
  });
  return null;
};
var getMyServices = async (userId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const result = await prisma.service.findMany({
    where: {
      technicianProfileId: technicianProfile.id
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getAllServices = async (query) => {
  const {
    searchTerm,
    category,
    location,
    minPrice,
    maxPrice,
    rating,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "10"
  } = query;
  const andConditions = [
    {
      isAvailable: true
    }
  ];
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (category) {
    andConditions.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive"
        }
      }
    });
  }
  if (location) {
    andConditions.push({
      technicianProfile: {
        location: {
          contains: location,
          mode: "insensitive"
        }
      }
    });
  }
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        gte: minPrice ? Number(minPrice) : void 0,
        lte: maxPrice ? Number(maxPrice) : void 0
      }
    });
  }
  if (rating) {
    andConditions.push({
      technicianProfile: {
        averageRating: {
          gte: Number(rating)
        }
      }
    });
  }
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const whereCondition = {
    AND: andConditions
  };
  const [services, total] = await prisma.$transaction([
    prisma.service.findMany({
      where: whereCondition,
      include: {
        category: true,
        technicianProfile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limitNumber
    }),
    prisma.service.count({
      where: whereCondition
    })
  ]);
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber)
    },
    data: services
  };
};
var getSingleService = async (serviceId) => {
  const result = await prisma.service.findUnique({
    where: {
      id: serviceId
    },
    include: {
      category: true,
      technicianProfile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          }
        }
      }
    }
  });
  if (!result) {
    throw new Error("Service not found");
  }
  return result;
};
var serviceService = {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getAllServices,
  getSingleService
};

// src/modules/service/service.controller.ts
var createService2 = catchAsync_default(async (req, res) => {
  const result = await serviceService.createService(req.user.userId, req.body);
  res.status(httpStatus5.CREATED).json({
    success: true,
    message: "Service created successfully",
    data: result
  });
  sendResponse_default(res, {
    statusCode: httpStatus5.CREATED,
    success: true,
    message: "Service created successfully",
    data: result
  });
});
var updateService2 = catchAsync_default(async (req, res) => {
  const result = await serviceService.updateService(
    req.user.userId,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "Service updated successfully",
    data: result
  });
});
var deleteService2 = catchAsync_default(async (req, res) => {
  await serviceService.deleteService(req.user.userId, req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "Service deleted successfully",
    data: null
  });
});
var getMyServices2 = catchAsync_default(async (req, res) => {
  const result = await serviceService.getMyServices(req.user.userId);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "My services retrieved successfully",
    data: result
  });
});
var getAllServices2 = catchAsync_default(async (req, res) => {
  const result = await serviceService.getAllServices(req.query);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result
  });
});
var getSingleService2 = catchAsync_default(async (req, res) => {
  const result = await serviceService.getSingleService(req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result
  });
});
var serviceController = {
  createService: createService2,
  updateService: updateService2,
  deleteService: deleteService2,
  getMyServices: getMyServices2,
  getAllServices: getAllServices2,
  getSingleService: getSingleService2
};

// src/modules/service/service.route.ts
var router4 = Router4();
router4.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router4.get(
  "/my-services",
  auth(Role.TECHNICIAN),
  serviceController.getMyServices
);
router4.patch("/:id", auth(Role.TECHNICIAN), serviceController.updateService);
router4.delete("/:id", auth(Role.TECHNICIAN), serviceController.deleteService);
router4.get("/", serviceController.getAllServices);
router4.get("/:id", serviceController.getSingleService);
var serviceRouter = router4;

// src/modules/availability/availability.route.ts
import { Router as Router5 } from "express";

// src/modules/availability/availability.controller.ts
import httpStatus6 from "http-status";

// src/modules/availability/availability.service.ts
var createAvailability = async (userId, payload) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  if (payload.startTime >= payload.endTime) {
    throw new Error("End time must be greater than start time");
  }
  const existingSlots = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id,
      day: payload.day
    }
  });
  const isOverlapping = existingSlots.some((slot) => {
    return payload.startTime < slot.endTime && payload.endTime > slot.startTime;
  });
  if (isOverlapping) {
    throw new Error("Time slot overlaps with an existing slot");
  }
  const result = await prisma.availability.create({
    data: {
      technicianId: technicianProfile.id,
      ...payload
    }
  });
  return result;
};
var updateAvailability = async (userId, availabilityId, payload) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId
    }
  });
  if (!availability) {
    throw new Error("Availability not found");
  }
  if (availability.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized to update this slot");
  }
  const startTime = payload.startTime ?? availability.startTime;
  const endTime = payload.endTime ?? availability.endTime;
  if (startTime >= endTime) {
    throw new Error("End time must be greater than start time");
  }
  const existingSlots = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id,
      day: payload.day ?? availability.day,
      NOT: {
        id: availabilityId
      }
    }
  });
  const isOverlapping = existingSlots.some((slot) => {
    return startTime < slot.endTime && endTime > slot.startTime;
  });
  if (isOverlapping) {
    throw new Error("Time slot overlaps with an existing slot");
  }
  const result = await prisma.availability.update({
    where: {
      id: availabilityId
    },
    data: payload
  });
  return result;
};
var deleteAvailability = async (userId, availabilityId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId
    }
  });
  if (!availability) {
    throw new Error("Availability not found");
  }
  if (availability.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized to delete this availability");
  }
  await prisma.availability.delete({
    where: {
      id: availabilityId
    }
  });
  return null;
};
var getMyAvailability = async (userId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const result = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id
    },
    orderBy: [
      {
        day: "asc"
      },
      {
        startTime: "asc"
      }
    ]
  });
  return result;
};
var getTechnicianAvailability = async (technicianId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician not found");
  }
  const result = await prisma.availability.findMany({
    where: {
      technicianId,
      isAvailable: true
    },
    orderBy: [
      {
        day: "asc"
      },
      {
        startTime: "asc"
      }
    ]
  });
  return result;
};
var availabilityService = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getMyAvailability,
  getTechnicianAvailability
};

// src/modules/availability/availability.controller.ts
var createAvailability2 = catchAsync_default(async (req, res) => {
  const result = await availabilityService.createAvailability(
    req.user.userId,
    req.body
  );
  sendResponse_default(res, {
    statusCode: httpStatus6.CREATED,
    success: true,
    message: "Availability created successfully",
    data: result
  });
});
var updateAvailability2 = catchAsync_default(async (req, res) => {
  const result = await availabilityService.updateAvailability(
    req.user.userId,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Availability updated successfully",
    data: result
  });
});
var deleteAvailability2 = catchAsync_default(async (req, res) => {
  await availabilityService.deleteAvailability(
    req.user.userId,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Availability deleted successfully",
    data: null
  });
});
var getMyAvailability2 = catchAsync_default(async (req, res) => {
  const result = await availabilityService.getMyAvailability(req.user.userId);
  sendResponse_default(res, {
    statusCode: httpStatus6.OK,
    success: true,
    message: "Availability retrieved successfully",
    data: result
  });
});
var getTechnicianAvailability2 = catchAsync_default(
  async (req, res) => {
    const result = await availabilityService.getTechnicianAvailability(
      req.params.technicianId
    );
    sendResponse_default(res, {
      statusCode: httpStatus6.OK,
      success: true,
      message: "Availability retrieved successfully",
      data: result
    });
  }
);
var availabilityController = {
  createAvailability: createAvailability2,
  updateAvailability: updateAvailability2,
  deleteAvailability: deleteAvailability2,
  getMyAvailability: getMyAvailability2,
  getTechnicianAvailability: getTechnicianAvailability2
};

// src/modules/availability/availability.route.ts
var router5 = Router5();
router5.post(
  "/",
  auth(Role.TECHNICIAN),
  availabilityController.createAvailability
);
router5.get(
  "/my-slots",
  auth(Role.TECHNICIAN),
  availabilityController.getMyAvailability
);
router5.patch(
  "/:id",
  auth(Role.TECHNICIAN),
  availabilityController.updateAvailability
);
router5.delete(
  "/:id",
  auth(Role.TECHNICIAN),
  availabilityController.deleteAvailability
);
router5.get("/:technicianId", availabilityController.getTechnicianAvailability);
var availabilityRouter = router5;

// src/modules/booking/booking.route.ts
import { Router as Router6 } from "express";

// src/modules/booking/booking.controller.ts
import httpStatus7 from "http-status";

// src/modules/booking/booking.service.ts
var createBooking = async (userId, payload) => {
  const customer = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  const service = await prisma.service.findUnique({
    where: {
      id: payload.serviceId
    },
    include: {
      technicianProfile: true
    }
  });
  if (!service) {
    throw new Error("Service not found");
  }
  if (!service.isAvailable) {
    throw new Error("Service is not available");
  }
  const availability = await prisma.availability.findUnique({
    where: {
      id: payload.availabilityId
    }
  });
  if (!availability) {
    throw new Error("Availability not found");
  }
  if (!availability.isAvailable) {
    throw new Error("Selected slot is unavailable");
  }
  if (availability.technicianId !== service.technicianProfileId) {
    throw new Error("Invalid availability selected");
  }
  const bookingDate = new Date(payload.bookingDate);
  if (isNaN(bookingDate.getTime())) {
    throw new Error("Invalid booking date");
  }
  const existingBooking = await prisma.booking.findFirst({
    where: {
      availabilityId: payload.availabilityId,
      bookingDate,
      status: {
        in: [
          BookingStatus.REQUESTED,
          BookingStatus.ACCEPTED,
          BookingStatus.PAID,
          BookingStatus.IN_PROGRESS
        ]
      }
    }
  });
  if (existingBooking) {
    throw new Error("This slot is already booked");
  }
  const date = bookingDate.toISOString().split("T")[0];
  const startTime = /* @__PURE__ */ new Date(`${date}T${availability.startTime}:00`);
  const endTime = /* @__PURE__ */ new Date(`${date}T${availability.endTime}:00`);
  const result = await prisma.booking.create({
    data: {
      customerId: userId,
      technicianId: service.technicianProfileId,
      serviceId: payload.serviceId,
      availabilityId: payload.availabilityId,
      bookingDate,
      startTime,
      endTime,
      address: payload.address,
      problemDescription: payload.problemDescription
    },
    include: {
      customer: {
        omit: {
          password: true
        }
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      service: true,
      availability: true
    }
  });
  return result;
};
var getMyBookings = async (userId) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId
    },
    include: {
      service: {
        include: {
          category: true
        }
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      availability: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSingleBooking = async (userId, bookingId) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    },
    include: {
      customer: {
        omit: {
          password: true
        }
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      service: {
        include: {
          category: true
        }
      },
      availability: true
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  const isCustomer = booking.customerId === userId;
  const isTechnician = technicianProfile && booking.technicianId === technicianProfile.id;
  if (!isCustomer && !isTechnician) {
    throw new Error("You are not authorized");
  }
  return booking;
};
var getTechnicianBookings = async (userId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const result = await prisma.booking.findMany({
    where: {
      technicianId: technicianProfile.id
    },
    include: {
      customer: {
        omit: {
          password: true
        }
      },
      service: {
        include: {
          category: true
        }
      },
      availability: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateBookingStatus = async (userId, bookingId, status) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized");
  }
  switch (booking.status) {
    case BookingStatus.REQUESTED:
      if (status !== BookingStatus.ACCEPTED && status !== BookingStatus.DECLINED) {
        throw new Error("Booking can only be ACCEPTED or DECLINED");
      }
      break;
    case BookingStatus.PAID:
      if (status !== BookingStatus.IN_PROGRESS) {
        throw new Error("Only PAID bookings can be marked as IN_PROGRESS");
      }
      break;
    case BookingStatus.IN_PROGRESS:
      if (status !== BookingStatus.COMPLETED) {
        throw new Error("Only IN_PROGRESS bookings can be marked as COMPLETED");
      }
      break;
    default:
      throw new Error(`Cannot change status from ${booking.status}`);
  }
  const result = await prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      status
    },
    include: {
      customer: true,
      technician: {
        include: {
          user: true
        }
      },
      service: true,
      availability: true
    }
  });
  return result;
};
var cancelBooking = async (userId, bookingId, cancelReason) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }
  if (booking.status === BookingStatus.IN_PROGRESS || booking.status === BookingStatus.COMPLETED) {
    throw new Error("Booking cannot be cancelled after work has started");
  }
  const result = await prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      status: BookingStatus.CANCELLED,
      cancelReason
    }
  });
  return result;
};
var bookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  getTechnicianBookings,
  updateBookingStatus,
  cancelBooking
};

// src/modules/booking/booking.controller.ts
var createBooking2 = catchAsync_default(async (req, res) => {
  const result = await bookingService.createBooking(req.user.userId, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus7.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result
  });
});
var getMyBookings2 = catchAsync_default(async (req, res) => {
  const result = await bookingService.getMyBookings(req.user.userId);
  sendResponse_default(res, {
    statusCode: httpStatus7.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result
  });
});
var getSingleBooking2 = catchAsync_default(async (req, res) => {
  const result = await bookingService.getSingleBooking(
    req.user.userId,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: httpStatus7.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result
  });
});
var getTechnicianBookings2 = catchAsync_default(
  async (req, res) => {
    const result = await bookingService.getTechnicianBookings(req.user.userId);
    sendResponse_default(res, {
      statusCode: httpStatus7.OK,
      success: true,
      message: "Technician bookings retrieved successfully",
      data: result
    });
  }
);
var updateBookingStatus2 = catchAsync_default(async (req, res) => {
  const result = await bookingService.updateBookingStatus(
    req.user.userId,
    req.params.id,
    req.body.status
  );
  sendResponse_default(res, {
    statusCode: httpStatus7.OK,
    success: true,
    message: "Booking status updated successfully",
    data: result
  });
});
var cancelBooking2 = catchAsync_default(async (req, res) => {
  const result = await bookingService.cancelBooking(
    req.user.userId,
    req.params.id,
    req.body?.cancelReason
  );
  sendResponse_default(res, {
    statusCode: httpStatus7.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result
  });
});
var bookingController = {
  createBooking: createBooking2,
  getMyBookings: getMyBookings2,
  getSingleBooking: getSingleBooking2,
  getTechnicianBookings: getTechnicianBookings2,
  updateBookingStatus: updateBookingStatus2,
  cancelBooking: cancelBooking2
};

// src/modules/booking/booking.route.ts
var router6 = Router6();
router6.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router6.get("/", auth(Role.CUSTOMER), bookingController.getMyBookings);
router6.get(
  "/technician",
  auth(Role.TECHNICIAN),
  bookingController.getTechnicianBookings
);
router6.get(
  "/:id",
  auth(Role.CUSTOMER, Role.TECHNICIAN),
  bookingController.getSingleBooking
);
router6.patch(
  "/:id/status",
  auth(Role.TECHNICIAN),
  bookingController.updateBookingStatus
);
router6.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER),
  bookingController.cancelBooking
);
var bookingRouter = router6;

// src/modules/payment/payment.route.ts
import { Router as Router7 } from "express";

// src/modules/payment/payment.controller.ts
import httpStatus8 from "http-status";

// src/config/stripe.ts
import Stripe from "stripe";
var stripe = new Stripe(config_default.STRIPE_SECRET_KEY);

// src/modules/payment/payment.service.ts
var createPaymentIntent = async (userId, bookingId) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerId: userId
    },
    include: {
      service: true
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error("Payment can only be made for accepted bookings");
  }
  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId
    }
  });
  if (existingPayment && existingPayment.status === PaymentStatus.COMPLETED) {
    throw new Error("Payment already completed");
  }
  const amount = Math.round(booking.service.price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    metadata: {
      bookingId
    },
    automatic_payment_methods: {
      enabled: true
    }
  });
  await prisma.payment.upsert({
    where: {
      bookingId
    },
    update: {
      amount: booking.service.price,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id
    },
    create: {
      bookingId,
      amount: booking.service.price,
      method: PaymentMethod.CARD,
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id
    }
  });
  return {
    clientSecret: paymentIntent.client_secret
  };
};
var stripeWebhook = async (event) => {
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const payment = await prisma.payment.findFirst({
        where: {
          stripePaymentIntentId: paymentIntent.id
        }
      });
      if (!payment) {
        break;
      }
      await prisma.$transaction([
        prisma.payment.update({
          where: {
            id: payment.id
          },
          data: {
            status: PaymentStatus.COMPLETED,
            transactionId: paymentIntent.id,
            paidAt: /* @__PURE__ */ new Date()
          }
        }),
        prisma.booking.update({
          where: {
            id: payment.bookingId
          },
          data: {
            status: BookingStatus.PAID
          }
        })
      ]);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const payment = await prisma.payment.findFirst({
        where: {
          stripePaymentIntentId: paymentIntent.id
        }
      });
      if (!payment) {
        break;
      }
      await prisma.payment.update({
        where: {
          id: payment.id
        },
        data: {
          status: PaymentStatus.FAILED
        }
      });
      break;
    }
    default:
      console.log("Unhandled:", event.type);
  }
};
var getMyPayments = async (userId) => {
  const result = await prisma.payment.findMany({
    where: {
      booking: {
        customerId: userId
      }
    },
    include: {
      booking: {
        include: {
          service: true,
          technician: {
            include: {
              user: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSinglePayment = async (userId, paymentId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId
    },
    include: {
      booking: {
        include: {
          service: true,
          technician: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });
  if (!payment) {
    throw new Error("Payment not found");
  }
  if (payment.booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }
  return payment;
};
var paymentService = {
  createPaymentIntent,
  stripeWebhook,
  getMyPayments,
  getSinglePayment
};

// src/modules/payment/payment.controller.ts
var createPaymentIntent2 = catchAsync_default(async (req, res) => {
  const { bookingId } = req.body;
  const result = await paymentService.createPaymentIntent(
    req.user.userId,
    bookingId
  );
  sendResponse_default(res, {
    statusCode: httpStatus8.CREATED,
    success: true,
    message: "Payment intent created successfully",
    data: result
  });
});
var stripeWebhook2 = catchAsync_default(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    return res.status(httpStatus8.BAD_REQUEST).json({
      success: false,
      message: "Stripe signature is missing"
    });
  }
  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    config_default.STRIPE_WEBHOOK_SECRET
  );
  await paymentService.stripeWebhook(event);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Webhook triggered successfully.",
    data: null
  });
});
var getMyPayments2 = catchAsync_default(async (req, res) => {
  const result = await paymentService.getMyPayments(req.user.userId);
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result
  });
});
var getSinglePayment2 = catchAsync_default(async (req, res) => {
  const result = await paymentService.getSinglePayment(
    req.user.userId,
    req.params.id
  );
  sendResponse_default(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result
  });
});
var paymentController = {
  createPaymentIntent: createPaymentIntent2,
  stripeWebhook: stripeWebhook2,
  getMyPayments: getMyPayments2,
  getSinglePayment: getSinglePayment2
};

// src/modules/payment/payment.route.ts
var router7 = Router7();
router7.post(
  "/create",
  auth(Role.CUSTOMER),
  paymentController.createPaymentIntent
);
router7.get("/", auth(Role.CUSTOMER), paymentController.getMyPayments);
router7.get("/:id", auth(Role.CUSTOMER), paymentController.getSinglePayment);
var paymentRouter = router7;

// src/modules/review/review.route.ts
import { Router as Router8 } from "express";

// src/modules/review/review.controller.ts
import httpStatus9 from "http-status";

// src/modules/review/review.service.ts
var createReview = async (userId, payload) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId
    },
    include: {
      technician: true
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("Review can only be submitted after job completion");
  }
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId
    }
  });
  if (existingReview) {
    throw new Error("Review already submitted");
  }
  const result = await prisma.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        bookingId: payload.bookingId,
        customerId: userId,
        technicianId: booking.technicianId,
        rating: payload.rating,
        comment: payload.comment
      }
    });
    const reviews = await tx.review.findMany({
      where: {
        technicianId: booking.technicianId
      }
    });
    const totalRating = reviews.reduce((sum, review2) => {
      return sum + review2.rating;
    }, 0);
    const averageRating = Number((totalRating / reviews.length).toFixed(1));
    await tx.technicianProfile.update({
      where: {
        id: booking.technicianId
      },
      data: {
        averageRating
      }
    });
    return review;
  });
  return result;
};
var getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      booking: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSingleReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      technician: {
        include: {
          user: true
        }
      },
      booking: true
    }
  });
  if (!review) {
    throw new Error("Review not found");
  }
  return review;
};
var getTechnicianReviews = async (technicianId) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId
    }
  });
  if (!technician) {
    throw new Error("Technician not found");
  }
  const reviews = await prisma.review.findMany({
    where: {
      technicianId
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true
        }
      },
      booking: {
        select: {
          id: true,
          bookingDate: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var updateReview = async (userId, reviewId, payload) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });
  if (!review) {
    throw new Error("Review not found");
  }
  if (review.customerId !== userId) {
    throw new Error("You are not authorized");
  }
  const result = await prisma.$transaction(async (tx) => {
    const updatedReview = await tx.review.update({
      where: {
        id: reviewId
      },
      data: {
        rating: payload.rating,
        comment: payload.comment
      }
    });
    const reviews = await tx.review.findMany({
      where: {
        technicianId: review.technicianId
      }
    });
    const totalRating = reviews.reduce((sum, item) => {
      return sum + item.rating;
    }, 0);
    const averageRating = totalRating / reviews.length;
    await tx.technicianProfile.update({
      where: {
        id: review.technicianId
      },
      data: {
        averageRating
      }
    });
    return updatedReview;
  });
  return result;
};
var deleteReview = async (userId, reviewId) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });
  if (!review) {
    throw new Error("Review not found");
  }
  if (review.customerId !== userId) {
    throw new Error("You are not authorized");
  }
  await prisma.$transaction(async (tx) => {
    await tx.review.delete({
      where: {
        id: reviewId
      }
    });
    const reviews = await tx.review.findMany({
      where: {
        technicianId: review.technicianId
      }
    });
    let averageRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, item) => {
        return sum + item.rating;
      }, 0);
      averageRating = Number((totalRating / reviews.length).toFixed(1));
    }
    await tx.technicianProfile.update({
      where: {
        id: review.technicianId
      },
      data: {
        averageRating
      }
    });
  });
  return null;
};
var reviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  getTechnicianReviews,
  updateReview,
  deleteReview
};

// src/modules/review/review.controller.ts
var createReview2 = catchAsync_default(async (req, res) => {
  const result = await reviewService.createReview(req.user.userId, req.body);
  sendResponse_default(res, {
    statusCode: httpStatus9.CREATED,
    success: true,
    message: "Review created successfully",
    data: result
  });
});
var getAllReviews2 = catchAsync_default(async (req, res) => {
  const result = await reviewService.getAllReviews();
  sendResponse_default(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result
  });
});
var getSingleReview2 = catchAsync_default(async (req, res) => {
  const result = await reviewService.getSingleReview(req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result
  });
});
var getTechnicianReviews2 = catchAsync_default(async (req, res) => {
  const result = await reviewService.getTechnicianReviews(
    req.params.technicianId
  );
  sendResponse_default(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "Technician reviews retrieved successfully",
    data: result
  });
});
var updateReview2 = catchAsync_default(async (req, res) => {
  const result = await reviewService.updateReview(
    req.user.userId,
    req.params.id,
    req.body
  );
  sendResponse_default(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "Review updated successfully",
    data: result
  });
});
var deleteReview2 = catchAsync_default(async (req, res) => {
  await reviewService.deleteReview(req.user.userId, req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus9.OK,
    success: true,
    message: "Review deleted successfully",
    data: null
  });
});
var reviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getSingleReview: getSingleReview2,
  getTechnicianReviews: getTechnicianReviews2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/modules/review/review.route.ts
var router8 = Router8();
router8.get("/", reviewController.getAllReviews);
router8.get("/technician/:technicianId", reviewController.getTechnicianReviews);
router8.get("/:id", reviewController.getSingleReview);
router8.post("/", auth(Role.CUSTOMER), reviewController.createReview);
router8.patch("/:id", auth(Role.CUSTOMER), reviewController.updateReview);
router8.delete("/:id", auth(Role.CUSTOMER), reviewController.deleteReview);
var reviewRouter = router8;

// src/modules/admin/admin.route.ts
import { Router as Router9 } from "express";

// src/modules/admin/admin.controller.ts
import httpStatus10 from "http-status";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: { not: Role.ADMIN }
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
      technicianProfile: {
        select: {
          id: true,
          experience: true,
          location: true,
          hourlyRate: true,
          averageRating: true,
          completedJobs: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return users;
};
var updateUserStatus = async (userId, status) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new Error("User not found");
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    omit: {
      password: true
    },
    data: {
      status
    }
  });
  return result;
};
var getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          }
        }
      },
      service: {
        include: {
          category: true
        }
      },
      payment: true,
      review: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return bookings;
};
var getAllCategories3 = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          services: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return categories;
};
var createCategory3 = async (name) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name
    }
  });
  if (existingCategory) {
    throw new Error("Category already exists");
  }
  const result = await prisma.category.create({
    data: {
      name
    }
  });
  return result;
};
var updateCategory3 = async (categoryId, name) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  const existingCategory = await prisma.category.findFirst({
    where: {
      name,
      NOT: {
        id: categoryId
      }
    }
  });
  if (existingCategory) {
    throw new Error("Category name already exists");
  }
  const result = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      name
    }
  });
  return result;
};
var deleteCategory3 = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    },
    include: {
      services: true
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  if (category.services.length > 0) {
    throw new Error(
      "Cannot delete category because services exist under this category"
    );
  }
  await prisma.category.delete({
    where: {
      id: categoryId
    }
  });
  return null;
};
var deleteService3 = async (serviceId) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId
    }
  });
  if (!service) {
    throw new Error("Service not found");
  }
  await prisma.service.delete({
    where: {
      id: serviceId
    }
  });
  return null;
};
var getDashboardStats = async () => {
  const [
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalBookings,
    completedBookings,
    totalServices,
    totalCategories,
    totalRevenue
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        role: Role.CUSTOMER
      }
    }),
    prisma.user.count({
      where: {
        role: Role.TECHNICIAN
      }
    }),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        status: BookingStatus.COMPLETED
      }
    }),
    prisma.service.count(),
    prisma.category.count(),
    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED
      },
      _sum: {
        amount: true
      }
    })
  ]);
  return {
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalBookings,
    completedBookings,
    totalServices,
    totalCategories,
    totalRevenue: totalRevenue._sum.amount || 0
  };
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories: getAllCategories3,
  createCategory: createCategory3,
  updateCategory: updateCategory3,
  deleteCategory: deleteCategory3,
  deleteService: deleteService3,
  getDashboardStats
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = catchAsync_default(async (req, res) => {
  const result = await adminService.getAllUsers();
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result
  });
});
var updateUserStatus2 = catchAsync_default(async (req, res) => {
  const { status } = req.body;
  const result = await adminService.updateUserStatus(
    req.params.id,
    status
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "User status updated successfully",
    data: result
  });
});
var getAllBookings2 = catchAsync_default(async (req, res) => {
  const result = await adminService.getAllBookings();
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result
  });
});
var getAllCategories4 = catchAsync_default(async (req, res) => {
  const result = await adminService.getAllCategories();
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result
  });
});
var createCategory4 = catchAsync_default(async (req, res) => {
  const { name } = req.body;
  const result = await adminService.createCategory(name);
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Categories created successfully",
    data: result
  });
});
var updateCategory4 = catchAsync_default(async (req, res) => {
  const { name } = req.body;
  const result = await adminService.updateCategory(
    req.params.id,
    name
  );
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Category updated successfully",
    data: result
  });
});
var deleteCategory4 = catchAsync_default(async (req, res) => {
  await adminService.deleteCategory(req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Category deleted successfully",
    data: null
  });
});
var deleteService4 = catchAsync_default(async (req, res) => {
  await adminService.deleteService(req.params.id);
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Service deleted successfully",
    data: null
  });
});
var getDashboardStats2 = catchAsync_default(async (req, res) => {
  const result = await adminService.getDashboardStats();
  sendResponse_default(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully",
    data: result
  });
});
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getAllBookings: getAllBookings2,
  getAllCategories: getAllCategories4,
  createCategory: createCategory4,
  updateCategory: updateCategory4,
  deleteCategory: deleteCategory4,
  deleteService: deleteService4,
  getDashboardStats: getDashboardStats2
};

// src/modules/admin/admin.route.ts
var router9 = Router9();
router9.get("/dashboard", auth(Role.ADMIN), adminController.getDashboardStats);
router9.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router9.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router9.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
router9.get("/categories", auth(Role.ADMIN), adminController.getAllCategories);
router9.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router9.patch(
  "/categories/:id",
  auth(Role.ADMIN),
  adminController.updateCategory
);
router9.delete(
  "/categories/:id",
  auth(Role.ADMIN),
  adminController.deleteCategory
);
router9.delete("/services/:id", auth(Role.ADMIN), adminController.deleteService);
var adminRouter = router9;

// src/middlewares/notFound.ts
import httpStatus11 from "http-status";
var notFound = (req, res, next) => {
  res.status(httpStatus11.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};
var notFound_default = notFound;

// src/middlewares/globalErrorHandler.ts
import jwt3 from "jsonwebtoken";

// src/errors/handlePrismaError.ts
var handlePrismaError = (error) => {
  let statusCode = 400;
  let message = "Database Error";
  switch (error.code) {
    case "P2002":
      message = `Duplicate value for ${error.meta?.target}`;
      break;
    case "P2025":
      statusCode = 404;
      message = "Record not found";
      break;
    case "P2003":
      message = "Foreign key constraint failed";
      break;
    case "P2014":
      message = "Invalid relation data";
      break;
    default:
      message = error.message;
      break;
  }
  return {
    success: false,
    statusCode,
    message
  };
};
var handlePrismaError_default = handlePrismaError;

// src/middlewares/globalErrorHandler.ts
var globalErrorHandler = (error, req, res, next) => {
  console.error(error);
  let statusCode = 500;
  let message = "Internal Server Error";
  if (error instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError_default(error);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
  } else if (error instanceof jwt3.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid Token";
  } else if (error instanceof jwt3.TokenExpiredError) {
    statusCode = 401;
    message = "Token Expired";
  } else if (error instanceof Error) {
    message = error.message;
  }
  return res.status(statusCode).json({
    success: false,
    message
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/app.ts
var app = express();
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.stripeWebhook
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to FixItNow!");
});
app.use("/api/auth", authRouter);
app.use("/api/technician-profile", technicianProfileRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availabilities", availabilityRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);
app.use(notFound_default);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(config_default.PORT, () => {
      console.log(`Server is running on port ${config_default.PORT}`);
    });
  } catch (error) {
    prisma.$disconnect();
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map