import { CalendarPeriod } from "@/lib/types";

const errorNotISOtype = `ISO형 날짜가 아닙니다. | null이 입력되었습니다.`;

export function convertISOToYMD(isoString: string) {
  let date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return errorNotISOtype;
  }
  let year = date.getUTCFullYear();
  let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  let day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}
export function standardizeDate(userCalendar: CalendarPeriod) {
  const { startDay, endDay, startTime, endTime } = userCalendar;

  //set Data
  const startDateStr = startDay ? `${setDateStr(startDay)}` : "";
  const endDateStr = endDay ? `${setDateStr(endDay)}` : "";
  //set time
  const startTimeStr = startTime ? `${setTimeSTr(startTime)}` : "";
  const endTimeStr = endTime ? `${setTimeSTr(endTime)}` : "";

  return { startDateStr, endDateStr, startTimeStr, endTimeStr };
}

function setTimeSTr(time: string) {
  if (!time) return "";

  let h, m;
  let [oriH, oriM, oriS] = time.split(":").map((t) => Number(t));
  let timeStr = "";

  if (isNaN(oriH) || isNaN(oriM) || isNaN(oriS)) {
    console.error("시간 형식 오류입니다. \n 입력받은 time:", time);
    return "";
  }

  if (oriH === 0) {
    h = `오전 12시`;
  } else if (oriH === 12) {
    h = `오후 12시`;
  } else if (oriH > 12 && oriH <= 24) {
    h = `오후 ${oriH - 12}시`;
  } else {
    h = `오전 ${oriH}시`;
  }

  if (oriM === 0) {
    m = "";
  } else {
    m = `${oriM}분`;
  }

  timeStr = `${h} ${m}`.trim();

  return timeStr;
}

export function setDateStr(date: string) {
  if (!date) return "";

  if (date.length !== 8 || isNaN(Number(date))) {
    throw new Error(`유효하지 않은 날짜 형식입니다: ${date}`);
  }

  // 연, 월, 일 추출
  const yearStr = date.substring(2, 4);
  const monthStr = date.substring(4, 6);
  const dayStr = date.substring(6);

  const y = Number(yearStr);
  const m = Number(monthStr);
  const d = Number(dayStr);

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    throw new Error(`숫자 변환 실패\n 입력받은 date: ${date}`);
  }

  if (m < 1 || m > 12) {
    throw new Error(`유효하지 않은 월 값입니다: 입력받은 date: ${date}`);
  }

  if (d < 1 || d > 31) {
    throw new Error("유효하지 않은 일 값입니다");
  }

  return `${y}년 ${m}월 ${d}일`;
}
