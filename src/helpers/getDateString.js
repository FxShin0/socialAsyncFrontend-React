export const getDate = (dateString) => {
  const date = new Date(dateString);
  return {
    dateString: date.toLocaleDateString(),
    hourDateString: date.toLocaleString(),
  };
};
