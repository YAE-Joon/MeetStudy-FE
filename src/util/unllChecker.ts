// 가끔 문자열과 숫자에 null 이 있을 때 사용할 null checker...
export function nullChecker(
  target: any,
  targetType: "number" | "string",
  callback?: (value?: any) => number | string
): any {
  const dummyDataByTypes = {
    number: 0,
    string: "입력없음(문자열)",
  };

  // target이 null 또는 undefined일 때
  let result = target;
  if (target === null || target === undefined) {
    result = dummyDataByTypes[targetType];
    return result;
  }

  // target이 null도 아니고 undefined도 아닌데 콜백 함수가 있을 경우
  if (callback) {
    try {
      result = callback(result);
      return result;
    } catch (e) {
      // 문제생겼을시 (joinDate...)
      return dummyDataByTypes[targetType];
    }
  } else {
    return result;
  }
}

// 날짜 null 체크용(callback을 해야)
export function nullDateChecker(
  target: any,
  targetType: "number" | "string",
  callback?: (value?: any) => number | string
): any {
  const dummyDataByTypes = {
    number: 0,
    string: "입력없음(문자열)",
  };

  // target이 null 또는 undefined일 때
  let result = target;
  if (target === null || target === undefined) {
    result = dummyDataByTypes[targetType];
    return result;
  }

  // target이 null도 아니고 undefined도 아닌데 콜백 함수가 있을 경우
  if (callback) {
    return callback(result);
  } else {
    return result;
  }
}
