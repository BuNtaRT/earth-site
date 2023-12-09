import { docSlider } from "../libs/docSlider/docSlider";
import "../libs/docSlider/docSlider.css";
import { setPage } from "../pageSwitcher";

docSlider.init({
  beforeChange: (index, page, toIndex, toPage, type) => {
    if (index !== toIndex && type === "scroll") setPage(toIndex, !!!toIndex);
  },
});
