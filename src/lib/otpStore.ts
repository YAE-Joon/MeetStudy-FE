const otpStore = new Map<string, { otp: string; expiration: number }>();

export function saveOtp(email: string, otp: string, ttl: number = 300000) {
  const expiration = Date.now() + ttl; // 현재 시간 + TTL (기본 5분)
  otpStore.set(email, { otp, expiration });

  // TTL이 지난 후 OTP 삭제
  setTimeout(() => {
    deleteOtp(email); // OTP 삭제 작업을 실행합니다.
  }, ttl);
}

export function getOtp(email: string): string | undefined {
  const entry = otpStore.get(email);
  if (entry && Date.now() < entry.expiration) {
    return entry.otp;
  } else if (entry && Date.now() >= entry.expiration) {
    // 만료된 OTP는 삭제
    otpStore.delete(email);
  }
  // 만료되었거나 해당 이메일로 저장된 OTP가 없는 경우
  return undefined;
}

export function deleteOtp(email: string) {
  const entry = otpStore.get(email);
  if (entry && Date.now() < entry.expiration) {
    otpStore.delete(email);
  }
}
