export const setHtml = (id, html, hide = false) => {
  const element = document.querySelector(id);

  if (hide)
    setTimeout(() => {
      element.classList.add("invisible");
    }, 300);
  else if (element) {
    element.classList.remove("invisible");
    element.innerHTML = html;
  }

  return element;
};
