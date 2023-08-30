import { TranslateHelper } from "../i18n";

type Props = {
  seconds: number;
  nanoseconds: number;
};

export const TimeSince = (timeStamp: Props) => {
  const { seconds, nanoseconds } = timeStamp;

  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return TranslateHelper("messages.notes.times.moment_ago");
  }
  if (secondsPast < 3600) {
    return TranslateHelper("messages.notes.times.minutes_ago").replace(
      "{{minutes}}",
      Math.floor(secondsPast / 60).toString()
    );
  }
  if (secondsPast <= 86400) {
    return TranslateHelper("messages.notes.times.an_hour_ago");
  }
  if (secondsPast <= 86400 * 2) {
    return TranslateHelper("messages.notes.times.yesterday");
  }
  if (secondsPast <= 86400 * 3) {
    return TranslateHelper("messages.notes.times.day_before_yesterday");
  }
  if (secondsPast <= 86400 * 7) {
    const days = TranslateHelper("days");
    return days[date.getDay()];
  }
  return TranslateHelper("messages.notes.times.date_format")
    .replace("{{day}}", date.getDate().toString())
    .replace("{{month}}", (date.getMonth() + 1).toString())
    .replace("{{year}}", date.getFullYear().toString());
};
