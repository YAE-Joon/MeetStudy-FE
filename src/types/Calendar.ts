export interface CalendarPeriod {
  startDate: string;
  endDate: string;
}
export interface UserCalendar extends CalendarPeriod {
  id: number;
  title: string;
  content: string;

  isHoliday: boolean;
}
