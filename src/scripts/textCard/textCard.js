import "../../styles/components/textBlock/textBlock.scss";

const textCardInit = () => {
  const cards = document.querySelectorAll(".textBlock");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (evt) => {
      const rect = card.getBoundingClientRect();

      const offsetX = evt.clientX - rect.left - rect.width / 2;
      const offsetY = evt.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.width / 2)) * 3;
      const rotationY = (offsetX / (rect.height / 2)) * 3;

      card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s ease";
      card.style.transform = "rotateX(0) rotateY(0)";
      setTimeout(() => {
        card.style.transition = "";
      }, 500);
    });
  });
};

export default textCardInit;
