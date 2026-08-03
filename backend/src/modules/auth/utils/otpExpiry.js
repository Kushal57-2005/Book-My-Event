
export const isOtpExpires = (otpExpires) => {
  return Date.now() > otpExpires;
};
