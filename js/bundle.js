/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    //calculator

   const result = document.querySelector(".calculating__result span");

   let sex, ratio, height, weight, age;
   
   if(localStorage.getItem("sex")){
       sex = localStorage.getItem("sex");
   }else{
       sex = "female";
       localStorage.setItem("sex", "female");
   }

   if(localStorage.getItem("ratio")){
       ratio = localStorage.getItem("ratio");
   }else {
       ratio = 1.375;
       localStorage.setItem("ratio", 1.375);
   }
   
   function initLocalSet(selector, activeClass){
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem =>{
           elem.classList.remove(activeClass);

           if(elem.getAttribute("id") === localStorage.getItem("sex")){
               elem.classList.add(activeClass);
           }

           if(elem.getAttribute("data-ratio") === localStorage.getItem("ratio")){
               elem.classList.add(activeClass);
           }
          
       });
   }

   initLocalSet("#gender div", "calculating__choose-item_active");
   initLocalSet(".calculating__choose_big div", "calculating__choose-item_active");

   function calcTotal(){
       if(!height || !weight || !age){
           result.textContent = "____";
           return;
       }

       if(sex == "femail"){
           result.textContent = ((447.6 + (9.2 *weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
       }else{
           result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
       }
   }

  calcTotal();

  function getStaticInformation(selector, activeClass){
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem =>{
           elem.addEventListener("click", (e)=>{
               if(e.target.getAttribute("data-ratio")){
                   ratio = +e.target.getAttribute("data-ratio");
                   localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
               }else {
                   sex = e.target.getAttribute("id");
                   localStorage.setItem("sex", e.target.getAttribute("id"));
               }

               elements.forEach(elem => {
                   elem.classList.remove(activeClass);
               });

               e.target.classList.add(activeClass);

               calcTotal();
           });
       });
       
   }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

  function getDynamycInformation(selector){
       const input = document.querySelector(selector);

       input.addEventListener("input", () =>{

           if(input.value.match(/\D/g)){
               input.style.border = "1px solid red";
           }else{
               input.style.border = "none";
           }

           switch(input.getAttribute("id")) {
               case "height": 
                   height = +input.value;
                   break;
               case "weight": 
                   weight = +input.value;
                   break;
               case "age":
                   age = +input.value;
           }
           calcTotal();
       });
       
  }

  getDynamycInformation("#height");
  getDynamycInformation("#weight");
  getDynamycInformation("#age");

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //our menu card
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...clases){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.clases = clases;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;

        }

        render() {
            const element =document.createElement("div");
            if(this.clases.length == 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            }else{
                this.clases.forEach(className => element.classList.add(className));
            }
            
            this.clases.forEach(className => element.classList.add(className));
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu")
    .then(data =>{
        data.forEach(({img, altimg, title, descr, price, src}) =>{
            new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 


function forms(formSelector, modalTimerId){
     // forms work with server

     const forms = document.querySelectorAll(formSelector);
    
     const message = {
         loading: "img/form/spinner.svg",
         success: "Success",
         failure: "Faile"
     };
    
     forms.forEach(form => {
         bindPostData(form);
     });
    
     
 
     function bindPostData(form){
         form.addEventListener("submit", (e)=>{
             e.preventDefault();
                         
             const statusMessage = document.createElement("img");
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
 
             const btnText = form.querySelector("button").innerHTML;
             form.querySelector("button").innerHTML ="";
             form.querySelector("button").append(statusMessage);
 
             
             //use headers if we need send data in json format
             // r.setRequestHeader("Content-type", "multipart/form-data"); -> if we use new FormData setRequestHeader we dont need use HEADER!!!!!! IMPORTANT!!!!!
             // multipart/form-data -> use for works with FormData
 
             
             const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
                         
             (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
             .then(data =>{
                 showThanksModal(message.success);
                 statusMessage.remove();
                 form.querySelector("button").innerHTML = btnText;
             }).catch(()=>{
                 showThanksModal(message.failure);
             }).finally(()=>{
                 form.reset();
             });
         });
 
     }
 
     function showThanksModal(message){
         const prevModalDialog = document.querySelector(".modal__dialog");
 
         prevModalDialog.classList.add("hide");
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
 
         const thanlsModal = document.createElement("div");
         thanlsModal.classList.add("modal__dialog");
         thanlsModal.innerHTML = `            
             <div class="modal__content">
                 <div data-close class="modal__close">&times;</div>
                 <div class="modal__title">${message}</div>
             </div>`;
         document.querySelector(".modal").append(thanlsModal);
         setTimeout(()=>{
             thanlsModal.remove();
             prevModalDialog.classList.add("show");
             prevModalDialog.classList.remove("hide");
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
         }, 4000);
 
     }
 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
    const  modal = document.querySelector(modalSelector);
    
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    console.log(modalTimerId);

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector){
    const  modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId){

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn=>{
        btn.addEventListener("click", ()=> openModal(modalSelector, modalTimerId));
    });  

    modal.addEventListener("click", (e)=>{
        if(e.target === modal || e.target.getAttribute("data-close") == ""){
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown",(e)=>{
        if(e.code === "Escape" && modal.classList.contains("show")){
            closeModal(modalSelector);
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    // slider

    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);

    let slideIndex = 1,
        offset = 0;
    
    function addZero(arrSlides, currElem, ...rest){
        if(rest.length > 0){
            if(arrSlides.length < 10){
                rest[0].textContent = `0${arrSlides.length}`;
                currElem.textContent = `0${slideIndex}`;
            }else{
                rest.textContent = arrSlides.length;
                currElem.textContent = slideIndex;
            }
        }else {
            if(arrSlides.length < 10){
                currElem.textContent = `0${slideIndex}`;
            }else{
                currElem.textContent = slideIndex;
            }
        }
    }
    
    addZero(slides, current, total);
        
    slidesField.style.cssText = `
                        display: flex;
                        transition: 0.5s all;
                        width: ${100 * slides.length}%;
                    `;

    slidesWrapper.style.overflow = "hidden";
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];

    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for(let i = 0; i < slides.length;i++){
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if(i == 0 ){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener("click", ()=>{
        if(offset == parseInt(width) * (slides.length -1)){
            offset = 0;
        }else {
            offset += parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        addZero(slides, current);
       makeActiveDot(dots);
    });

    prev.addEventListener("click", ()=> {
        if(offset == 0 ){
            offset = parseInt(width) * (slides.length -1);
        }else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }

        addZero(slides, current);

        makeActiveDot(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e)=>{
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo -1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero(slides, current);

            makeActiveDot(dots);
        });
    });

    function makeActiveDot(dotsArr){
        dotsArr.forEach(dot => dot.style.opacity = "0.5");
        dotsArr[slideIndex - 1].style.opacity = 1;
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    //tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    const hideTabContent =() =>{
        tabsContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("show", "fade");
        });

        tabs.forEach(tab =>{
            tab.classList.remove(activeClass);
        });

    };

    const showTabContent = (i = 0) =>{
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) =>{
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((tab, i)=>{
                if(target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){
    
    function getTimeRemaining(deadline){
        let days, hours, minutes, seconds;
        const t = Date.parse(deadline) - Date.parse(new Date());

        if(t <= 0){
            days = hours = minutes = seconds = 0;
        }else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24)) - 2;
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
        
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, deadline){
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(deadline);

            days.innerHTML = getZero(t.days) ;
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadLine);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });

    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











window.addEventListener("DOMContentLoaded", ()=>{
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId), 5000);
       
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal", ".modal", modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2022-08-06");
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map