export const getRandomEmoji = () => {
  const start = 0x1f600;
  const end = 0x1f64f;
  const randomCode = Math.floor(Math.random() * (end - start + 1)) + start;
  return String.fromCodePoint(randomCode);
};
