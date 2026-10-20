document.addEventListener("DOMContentLoaded", () => {
    const cart = document.getElementById('cart');
    const openCart = document.getElementById('js-open-cart');

    openCart.addEventListener('click', (e) => {
        e.stopPropagation(); 
        cart.classList.toggle('active');
        document.classList.toggle('lock');
    });

    document.addEventListener('click', (e) => {
        if (!cart.classList.contains('active')) return; 

        if (cart.contains(e.target) || openCart.contains(e.target)) return;

        cart.classList.remove('active');
    });
});



document.addEventListener("DOMContentLoaded", () => {
const FREE_DELIVERY_THRESHOLD = 3000; // порог бесплатной доставки

function updateDeliveryBlock(cartTotal) {
  const block = document.querySelector('.cart__delivery');
  const title = block.querySelector('h6');
  const subtitle = block.querySelector('span');

  const remaining = FREE_DELIVERY_THRESHOLD - cartTotal;

  if (remaining > 0) {
    // Нужно добрать сумму
    title.textContent = `Еще ${formatPrice(remaining)}`;
    subtitle.textContent = 'До бесплатной доставки';
    block.classList.remove('cart__delivery--free');
  } else {
    // Доставка бесплатна
    title.textContent = 'Бесплатная доставка';
    subtitle.textContent = 'Поздравляем!';
    block.classList.add('cart__delivery--free');
  }
}

function formatPrice(value) {
  // 1686 -> "1 686 ₽"
  return `${new Intl.NumberFormat('ru-RU').format(Math.ceil(value))} ₽`;
}

function onCartChange() {
  const cartTotal = calculateCartTotal(); // ваша функция подсчёта
  updateDeliveryBlock(cartTotal);
}

});