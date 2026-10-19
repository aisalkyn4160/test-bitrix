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