export function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date
    .toLocaleString("pt-BR", options)
    .replace(".", "")
    .replace(",", "");
}
