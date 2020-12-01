function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){

    //slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector('.offer_slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1,
        offset = 0;

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carusel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i =0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    

    next.addEventListener('click', () => {
        if(offset == getDidits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '50%')
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset == 0){

            offset = getDidits(width) * (slides.length - 1);
        } else {
            offset -= getDidits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '50%');
        dots[slideIndex - 1].style.opacity = 1;
    });

    slides.forEach(slide => {
        slide.style.width = width;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getDidits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `${slideIndex}`;
            }

            dots.forEach(dot => dot.style.opacity = '50%');
            dots[slideIndex - 1].style.opacity = 1;


        });
    });

    function getDidits(word){
        return +word.replace(/\D/g, '');
    }

    // showSlides(slideIndex);
    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = `${slides.length}`;
    // }

    // function showSlides(n){

    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     }else{
    //         current.textContent = `${slideIndex}`;
    //     }

    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () =>{
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () =>{
    //     plusSlides(1);
    // });

    //------------------------------------------------------------------------    
    // const prevBtn = document.querySelector('.offer__slider-prev'),
    //       nextBtn = document.querySelector('.offer__slider-next'),
    //       currentCounter = document.querySelector('#current'),
    //       totalCounter = document.querySelector('#total'),
    //       sliderTotalNum = +totalCounter.innerText;
     

    // let sliderNum = +currentCounter.innerText;
    // console.log(sliderNum);

    // function switchSlide(e){
        
    //     let target = e.target.closest('div');

    //     document.querySelector(`[data-num="${sliderNum}"]`).classList.remove('show');
    //     document.querySelector(`[data-num="${sliderNum}"]`).classList.add('hide');

    //     if(target === prevBtn){

    //         currentCounter.innerText = getZero(--sliderNum);

    //         if(sliderNum == 0){
    //             currentCounter.innerText = getZero(sliderTotalNum);
    //             sliderNum = sliderTotalNum;
    //         }
            
    //     } else {

    //         currentCounter.innerText = getZero(++sliderNum);

    //         if(sliderNum == sliderTotalNum+1){
    //             currentCounter.innerText = getZero(1);
    //             sliderNum = 1;
    //         } 
    //     }

    //     document.querySelector(`[data-num="${sliderNum}"]`).classList.remove('hide');
    //     document.querySelector(`[data-num="${sliderNum}"]`).classList.add('show');

    // }

    // prevBtn.addEventListener('click', switchSlide);
    // nextBtn.addEventListener('click', switchSlide);


}

export default slider;