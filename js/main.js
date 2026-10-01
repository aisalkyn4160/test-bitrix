import { Fancybox } from "@fancyapps/ui";
import { Mask, MaskInput } from "maska";
import "jquery";

import "../sass/_app.scss";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./slider.js";

Fancybox.bind("[data-fancybox]", {});

new MaskInput("[data-maska]");

//------------------------------------ counter----------------------------------------------
$(function () {
  $(".js-open-counter").click(function () {
    $(this).parent().siblings(".product-card__counter").addClass("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const parsePrice = (text) => {
    const normalized = text.trim().replace(/\s/g, "").replace(",", ".");
    return parseFloat(normalized) || 0;
  };

  const formatPrice = (value) => {
    const rounded = Math.round(value * 100) / 100;
    return Number.isInteger(rounded)
      ? String(rounded)
      : rounded.toFixed(1).replace(".", ",");
  };
  const initCounter = (counter) => {
    const decrementBtn = counter.querySelector(".js-decrement");
    const incrementBtn = counter.querySelector(".js-increment");
    const valueEl = counter.querySelector(".product-card__counter__value");
    const priceEl = counter.querySelector(".product-card__counter__price");

    const unitPrice = parsePrice(priceEl.textContent);
    let count = parseInt(valueEl.textContent, 10) || 1;

    const render = () => {
      valueEl.textContent = count;
      priceEl.textContent = formatPrice(unitPrice * count);
    };

    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count -= 1;
      } else {
        counter.classList.remove("active");
      }

      render();
    });

    incrementBtn.addEventListener("click", () => {
      count += 1;
      render();
    });

    render();
  };

  document.querySelectorAll(".product-card__counter").forEach(initCounter);
});
