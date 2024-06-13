// debounce for prevent popping rendering

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
