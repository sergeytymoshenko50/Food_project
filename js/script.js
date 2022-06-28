'use strict';

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
    const deadLine = "2022-07-10";

    function getTimeRemaining(deadline){
        const t = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)) - 2,
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        
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
});
