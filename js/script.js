"use strict";

window.addEventListener("DOMContentLoaded", ()=>{
    //tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    const hideTabContent =() =>{
        tabsContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("show", "fade");
        });

        tabs.forEach(tab =>{
            tab.classList.remove("tabheader__item_active");
        });

    };

    const showTabContent = (i = 0) =>{
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) =>{
        const target = e.target;

        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((tab, i)=>{
                if(target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer
    

    const deadLine = "2022-06-25";

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
    setClock(".timer", deadLine);

    //modal

    const modalTrigger = document.querySelectorAll("[data-modal"),
        modal = document.querySelector(".modal");

    function openModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
    }

    modalTrigger.forEach(btn=>{
        btn.addEventListener("click", ()=>{        
           openModal();
        });
    });    

    
    function closeModal(){
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
        // clearInterval(modalTimerId);
    }
    
    modal.addEventListener("click", (e)=>{
        if(e.target === modal || e.target.getAttribute("data-close") == ""){
            closeModal();
        }
    });

    document.addEventListener("keydown",(e)=>{
        if(e.code === "Escape" && modal.classList.contains("show")){
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // const btns = document.querySelectorAll("[data-modal"),

    //     closeModal = document.querySelector("[data-close]");

    // for(let btn of btns){
    //     btn.addEventListener("click", ()=>{
    //         document.querySelector(".modal").style.display = "block";            
    //     });
    // }
    
    // closeModal.addEventListener("click", ()=>{
    //     document.querySelector(".modal").style.display = "none";
    // });


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

    const geyResources = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    geyResources("http://localhost:3000/menu")
    .then(data =>{
        data.forEach(({img, altimg, title, descr, price, src}) =>{
            new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
        });
    });

    

    // forms work with server

    const forms = document.querySelectorAll("form");
    
    const message = {
        loading: "img/form/spinner.svg",
        success: "Success",
        failure: "Faile"
    };
   
    forms.forEach(form => {
        bindPostData(form);
    });
   
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
                        
            postData("http://localhost:3000/requests", json)
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
        openModal();

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
            closeModal();
        }, 4000);

    }

    // slider

    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(".offer__slider");

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

    //calculator

   const result = document.querySelector(".calculating__result span");
   let sex = "femail",
        ratio = 1.375, 
        height, weight, age;

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

   function getStaticInformation(parent, activeClass){
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(elem =>{
            elem.addEventListener("click", (e)=>{
                if(e.target.getAttribute("data-ratio")){
                    ratio = +e.target.getAttribute("data-ratio");
                }else {
                    sex = e.target.getAttribute("id");
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
        
    }

   getStaticInformation("#gender", "calculating__choose-item_active");
   getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

   function getDynamycInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input", () =>{
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
            console.log(sex, height, weight, age, ratio);
        });
        
   }

   getDynamycInformation("#height");
   getDynamycInformation("#weight");
   getDynamycInformation("#age");
   
});

