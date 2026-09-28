import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const BannerSwiper = new Swiper('.banner__swiper', {
    loop: true,
    pagination: {
        el: '.banner__swiper__pagination',
        clickable: true,
    },
});