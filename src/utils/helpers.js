export function formatDate(inputDate) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(inputDate).toLocaleString("en-US", options);
  return formattedDate;
}

export function getTimeDifference(startDate, endDate) {
  const diffInMilliseconds = endDate - startDate;

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const remainingMilliseconds = diffInMilliseconds % (1000 * 60 * 60 * 24);

  const hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));

  return `${days} days and ${hours} hours`;
}

export function extractTimeFromDate(dateString) {
  const dateObject = new Date(dateString);
  const timeOnly = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return timeOnly;
}
