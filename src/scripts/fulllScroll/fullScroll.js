import { docSlider } from "../libs/docSlider/docSlider";
import "../libs/docSlider/docSlider.css";
import { setPage } from "../pageSwitcher";

docSlider.init({
  speed: 1500,
  easing: "ease-in-out",
  beforeChange: (index, page, toIndex, toPage, type) => {
    if (index !== toIndex && (type === "scroll" || type === "pager"))
      setPage(toIndex, index);
  },
});
