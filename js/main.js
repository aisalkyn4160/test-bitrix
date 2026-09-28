import { Fancybox } from "@fancyapps/ui";
import { Mask, MaskInput } from "maska"
import 'jquery';

import '../sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './slider.js';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input