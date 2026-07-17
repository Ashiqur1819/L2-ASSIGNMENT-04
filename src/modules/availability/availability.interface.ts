import { Day } from "../../../generated/prisma/enums";

export interface IAvailability {
  day: Day;
  startTime: string;
  endTime: string;
}

export interface IUpdateAvailability {
  day?: Day;
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
}
