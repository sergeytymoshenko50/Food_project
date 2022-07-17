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

export default slider;