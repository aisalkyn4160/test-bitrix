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
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
        el: '.popular__swiper__pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.popular__swiper__next',
        prevEl: '.popular__swiper__prev',
    },
});