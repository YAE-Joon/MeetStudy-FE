const otpStore = new Map<string, { otp: string; expiration: number }>();

export function saveOtp(email: string, otp: string, ttl: number = 300000) {
  const expiration = Date.now() + ttl; // 현재 시간 + TTL (기본 5분)
  otpStore.set(email, { otp, expiration });

  setTimeout(() => {
    otpStore.delete(email);
  }, ttl);
}

export function getOtp(email: string): string | undefined {
  const entry = otpStore.get(email);
  if (entry && Date.now() < entry.expiration) {
    return entry.otp;
  }
  otpStore.delete(email); // 만료된 OTP는 삭제
  return undefined;
}

export function deleteOtp(email: string) {
  otpStore.delete(email);
}
