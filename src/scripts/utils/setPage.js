export const setPage = (id, html) => {
  const element = document.querySelector(id);

  if (element) element.innerHTML = html;
};
