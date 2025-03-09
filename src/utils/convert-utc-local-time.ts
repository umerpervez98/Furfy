export const covertUTCToLocalTime = (date: string) => {
  const convertToLocalDateTime = (
    utcDateTime: string,
    optionsProps: object
  ) => {
    const utcDate = new Date(utcDateTime);
    const options = {
      timeZone: "Australia/Sydney", // Replace with your desired time zone
      ...optionsProps,
    };
    return utcDate.toLocaleString("en-AU", options);
  };

  const localTimeString = convertToLocalDateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  });

  return localTimeString;
};
