import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"
import 'jquery';

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input