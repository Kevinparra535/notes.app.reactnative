type Props = {
  seconds: number;
  nanoseconds: number;
}

export const TimeSince = (timeStamp: Props) => {
  const { seconds, nanoseconds } = timeStamp;

  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return "hace un momento";
  }
  if (secondsPast < 3600) {
    return `hace ${Math.floor(secondsPast / 60)} minutos`;
  }
  if (secondsPast <= 86400) {
    return `hace ${Math.floor(secondsPast / 3600)} hora`;
  }
  if (secondsPast <= 86400 * 2) {
    return "ayer";
  }
  if (secondsPast <= 86400 * 3) {
    return "antier";
  }
  if (secondsPast <= 86400 * 7) {
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    return days[date.getDay()];
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
