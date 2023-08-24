let timer: NodeJS.Timeout;

export function debounce(func: Function, delay: number) {
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
