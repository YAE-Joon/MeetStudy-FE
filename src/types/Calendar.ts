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

export interface UserPersonalCaledar {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  holiday: boolean;
}
