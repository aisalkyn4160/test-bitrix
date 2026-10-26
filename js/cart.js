(function () {
  'use strict';

  function initCart() {
    const cart = document.getElementById('cart');
    const openCart = document.getElementById('js-open-cart');
    if (!cart) {
      console.warn('[cart] #cart не найден');
      return;
    }

    const FREE_DELIVERY_THRESHOLD = 5000;
    const cartTotalEl = document.getElementById('cart-total');
    const progressCircle = document.querySelector('.cart__delivery__progress');
    const titleEl = document.querySelector('.cart__delivery__title');
    const infoEl = document.querySelector('.cart__delivery__info');
    const CIRCUMFERENCE = 2 * Math.PI * 19.25;

    if (progressCircle) {
      progressCircle.style.strokeDasharray = String(CIRCUMFERENCE);
    }

    /* ---------- Открытие/закрытие ---------- */
    if (openCart) {
      openCart.addEventListener('click', (e) => {
        e.stopPropagation();
        cart.classList.toggle('active');
    
      });
    }

    document.addEventListener('click', (e) => {
      if (!cart.classList.contains('active')) return;
      if (cart.contains(e.target) || (openCart && openCart.contains(e.target))) return;
      cart.classList.remove('active');
  
    });

    /* ---------- Цена из текста ---------- */
    const parsePrice = (str) => {
      const n = parseInt(String(str).replace(/[^\d]/g, ''), 10);
      return isNaN(n) ? 0 : n;
    };

    /* ---------- Пересчёт ---------- */
    function recalcTotal() {
      let total = 0;

      cart.querySelectorAll('.cart__item').forEach((item) => {
        const price = parsePrice(item.querySelector('.cart__item__price')?.textContent);
        const qty = parseInt(item.querySelector('.cart__item__counter input')?.value, 10) || 0;
        total += price * qty;
      });

      cart.querySelectorAll('.cart__extra__item').forEach((item) => {
        const priceEl = item.querySelector('.cart__extra__price');
        if (!priceEl) return;
        const price = parsePrice(priceEl.textContent);
        const qty = parseInt(item.querySelector('.cart__extra__item__counter input')?.value, 10) || 0;
        total += price * qty;
      });

      if (cartTotalEl) cartTotalEl.textContent = total.toLocaleString('ru-RU');
      updateDeliveryProgress(total);
    }

    function updateDeliveryProgress(total) {
      if (!progressCircle || !titleEl) return;
      const percent = Math.min(total / FREE_DELIVERY_THRESHOLD, 1);
      progressCircle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - percent));

      if (percent >= 1) {
        titleEl.textContent = 'Бесплатная доставка';
        if (infoEl) infoEl.textContent = '';
      } else {
        const left = FREE_DELIVERY_THRESHOLD - total;
        titleEl.textContent = 'Еще ' + left.toLocaleString('ru-RU') + ' ₽';
        if (infoEl) infoEl.textContent = 'До бесплатной доставки';
      }
    }

    /* ---------- Счётчик ---------- */
    function initCounter(container, opts) {
      opts = opts || {};
      const min = opts.min != null ? opts.min : 1;
      const max = opts.max != null ? opts.max : 99;
      const onChange = opts.onChange;

      const input = container.querySelector('input');
      if (!input) {
        console.warn('[cart] input не найден в счётчике', container);
        return;
      }

      // Ищем кнопки строго внутри контейнера
      const buttons = container.querySelectorAll('button');
      if (buttons.length < 2) {
        console.warn('[cart] нужно 2 кнопки в счётчике', container);
        return;
      }
      const minusBtn = buttons[0];
      const plusBtn = buttons[buttons.length - 1];

      // Кнопки внутри формы — принудительно type=button
      minusBtn.type = 'button';
      plusBtn.type = 'button';

      const clamp = (v) => Math.max(min, Math.min(max, v));

      function setValue(v, fire) {
        input.value = String(clamp(v));
        if (fire && typeof onChange === 'function') {
          onChange(Number(input.value), container);
        }
      }

      minusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setValue((parseInt(input.value, 10) || 0) - 1, true);
      });

      plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setValue((parseInt(input.value, 10) || 0) + 1, true);
      });

      input.addEventListener('input', () => {
        const v = input.value === '' ? min : parseInt(input.value, 10) || min;
        input.value = String(clamp(v));
        onChange?.(Number(input.value), container);
      });

      input.addEventListener('blur', () => {
        setValue(parseInt(input.value, 10) || min, true);
      });

      console.log('[cart] счётчик инициализирован', container);
    }

    /* ---------- Запуск ---------- */
    const itemCounters = cart.querySelectorAll('.cart__item__counter');
    const extraCounters = cart.querySelectorAll('.cart__extra__item__counter');
    console.log('[cart] найдено счётчиков товаров:', itemCounters.length);
    console.log('[cart] найдено счётчиков допов:', extraCounters.length);

    itemCounters.forEach((c) =>
      initCounter(c, { min: 1, max: 99, onChange: () => recalcTotal() })
    );
    extraCounters.forEach((c) =>
      initCounter(c, { min: 0, max: 99, onChange: () => recalcTotal() })
    );

    /* ---------- Удаление товара ---------- */
    cart.querySelectorAll('.cart__item__side span').forEach((btn) => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => {
        btn.closest('.cart__item')?.remove();
        recalcTotal();
      });
    });

    /* ---------- Очистка корзины ---------- */
    cart.querySelector('.confirm-btn')?.addEventListener('click', () => {

      cart.querySelectorAll('.cart__item').forEach((i) => i.remove());
      document.querySelector('.cart__content').remove();
      document.querySelector('.cart__delete__btn').remove();
      document.querySelector('.cart__empty').style.display = 'block';
    
    });

    recalcTotal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }
})();