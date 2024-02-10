export const setHtml = (id, html) => {
  const element = document.querySelector(id);

  if (element) element.innerHTML = html;

  return element;
};
