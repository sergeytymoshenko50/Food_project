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
    //my version
    // const endTimer = "2022-06-29";

    // function getTime(endTimer){
    //     const leftTotalTimeMs = Date.parse(endTimer) - Date.parse(new Date()),
    //         leftDays = Math.floor(leftTotalTimeMs / (1000*60*60*24)),
    //         leftHours = Math.floor(leftTotalTimeMs / 1000 / 60 / 60 % 24) - 2,
    //         leftMinutes = Math.floor(leftTotalTimeMs / 1000 / 60 % 60),
    //         leftSeconds = Math.floor((leftTotalTimeMs / 1000) % 60);
            
    //         return {                
    //             leftDays,
    //             leftHours,
    //             leftMinutes,
    //             leftSeconds,
    //             leftTotalTimeMs
    //         };
        
    // }

    // function addZero(num){
    //     if(num < 10){
    //         return `0${num}`;
    //     }else{
    //         return num;
    //     }
    // }

    // function setTime(timeObj){
    //     const timerBlocks = document.querySelectorAll(".timer__block span");
    //     const keys = Object.keys(timeObj);
        
    //     timerBlocks.forEach((span, i)=>{            
    //         span.innerHTML = addZero(timeObj[keys[i]]);
    //     });
    //     if(timeObj.leftTotalTimeMs <= 0){
    //         clearInterval(startTimer);
    //     }
        
    // }
    // setTime(getTime(endTimer));
    // const startTimer = setInterval(()=>{
    //     setTime(getTime(endTimer));
    // }, 1000);
    
    //by lesson
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
                this.clases.forEach(className => element.classList.add(className))
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
                console.log(data); 
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

    
   

});

