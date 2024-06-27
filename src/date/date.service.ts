import { format, parseISO, addDays, subDays, differenceInDays } from "date-fns";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {
  getDateFormat(date: Date, dateFormat: string) {
    if (typeof date === "string") {
      date = parseISO(date);
    }
    return format(date, dateFormat);
  }

  addDays(date: Date | string, days: number): Date {
    if (typeof date === "string") {
      date = parseISO(date);
    }
    return addDays(date, days);
  }

  subDays(date: Date | string, days: number): Date {
    if (typeof date === "string") {
      date = parseISO(date);
    }
    return subDays(date, days);
  }

  differenceInDays(dateLeft: Date | string, dateRight: Date | string): number {
    if (typeof dateLeft === "string") {
      dateLeft = parseISO(dateLeft);
    }
    if (typeof dateRight === "string") {
      dateRight = parseISO(dateRight);
    }
    return differenceInDays(dateLeft, dateRight);
  }
}
