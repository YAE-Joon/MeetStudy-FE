export interface CalendarPeriod {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}
export interface UserCalendar extends CalendarPeriod {
  id: number;
  title: string;
  content: string;

  isHoliday: boolean;
}
