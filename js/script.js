"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calculator";
import forms from "./modules/forms";
import slider from "./modules/slider";
import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", ()=>{
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 5000);
       
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal", ".modal", modalTimerId);
    timer(".timer", "2022-08-06");
    cards();
    calc();
    forms("form", modalTimerId);
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
        totalCounter: "#total",
        currentCounter: "#current"
    });
       
});


