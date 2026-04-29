export const getDate = (dateString) => {
  const date = new Date(dateString);

  return {
    dateString: date.toLocaleDateString("es-AR"),

    hourDateString: date.toLocaleString("es-AR", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
