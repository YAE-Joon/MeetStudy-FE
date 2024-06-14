export interface CalendarPeriod {
  startDate?: string;
  endDate?: string;
  //for build
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
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
