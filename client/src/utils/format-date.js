export function formatDate(isoString) {
  const date = new Date(isoString);
  const today = new Date();

  const sameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const sameMonth =
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const sameYear = date.getFullYear() === today.getFullYear();

  // Apenas horário se for hoje
  if (sameDay) {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  // Dia + horário (mesmo mês + mesmo ano)
  if (sameMonth) {
    const day = date.getDate().toString().padStart(2, "0");
    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `dia ${day} - ${time}`;
  }

  // Mês + dia + horário (mesmo ano)
  if (sameYear) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "");

    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${day}/${month} - ${time}`;
  }

  // Fora do ano atual → formato completo
  return date
    .toLocaleString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(".", "")
    .replace(",", "");
}
