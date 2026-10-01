import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const BannerSwiper = new Swiper('.banner__swiper', {
    loop: true,
    pagination: {
        el: '.banner__swiper__pagination',
        clickable: true,
    },
});

const PopularSwiper = new Swiper('.popular__list', {
    // loop: true,
    slidesPerView: '6',
    spaceBetween: 24,
    speed: 400,
    // pagination: {
    //     el: '.popular__swiper__pagination',
    //     clickable: true,
    // },
    navigation: {
        nextEl: '.popular .slider-next',
        prevEl: '.popular .slider-prev', 
    },
});

const NewProductsSwiper = new Swiper('.new-products__list', {
    // loop: true,
    slidesPerView: '6',
    spaceBetween: 24,
    speed: 400,
    // pagination: {
    //     el: '.popular__swiper__pagination',
    //     clickable: true,
    // },
    navigation: {
        nextEl: '.new-products .slider-next',
        prevEl: '.new-products .slider-prev', 
    },
});

const reviewsSwiper = new Swiper('.reviews__items', {
    // loop: true,
    slidesPerView: '4',
    spaceBetween: 24,
    speed: 400,
    // pagination: {
    //     el: '.popular__swiper__pagination',
    //     clickable: true,
    // },
    navigation: {
        nextEl: '.reviews .slider-next',
        prevEl: '.reviews .slider-prev', 
    },
});