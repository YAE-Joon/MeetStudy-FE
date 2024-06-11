export function checkEnterOrExitFromMessages(message: string) {
  const pattern = /.+님이 (입장|퇴장)하셨습니다\./;
  return pattern.test(message);
}
