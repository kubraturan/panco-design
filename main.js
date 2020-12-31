/**
 * Slider işlemlerinin yapıldığı metod
 * @param {*} data slider itemlarının içeriği
 * @param {*} sliderItems slider içindeki itemlar
 */
function showSlider (data, sliderItems) {
    const slider = document.querySelector('.slider');
    const sliderBox = document.querySelector('.slider-box');

    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    let sliderBoxWidth = sliderBox.offsetWidth;

    let index = 0;
    let sumOfRight = 0;
    let sumOfLeft = 0;

    let initialPosition = null;
    let moving = false;
    let transform = 0;
    let lastPageX = 0;
    let transformValue = 0;

    right.addEventListener('click', function() {
        slider.classList.add('smooth-transition');
        index++;
        left.classList.add('show');
        sumOfRight = sumOfRight + sliderBoxWidth;

        if ((sumOfRight + sliderBoxWidth) < slider.offsetWidth) {
            slider.style.transform = slider.style.transform + `translate(-${sliderBoxWidth}px)`;
        } 
        else {
            slider.style.transform = `translate(-${slider.offsetWidth - sliderBoxWidth}px)`;
        }

        if (slider.offsetWidth - (index * sliderBoxWidth) < sliderBoxWidth) {
            // right.classList.add('hide');
            right.classList.add('lock');
        }
    });

    left.addEventListener('click', function () {
        slider.classList.add('smooth-transition');
        sumOfLeft = sumOfRight - sliderBoxWidth;

        if (sumOfLeft >= sliderBoxWidth) {
            slider.style.transform = slider.style.transform + `translate(${sliderBoxWidth}px)`;
        } else {
            slider.style.transform = `translate(-${0}px)`;
        }
        index--;
        right.classList.remove('hide');
        right.classList.remove('lock');
        sumOfRight -= sliderBoxWidth;
        if (index === 0) {
            left.classList.remove('show');
        }

    });

    const sliderStart =  (e) => {
        initialPosition = e.pageX;
        moving = true;
        const transformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');

        if (transformMatrix !== 'none') {
            transform = parseInt(transformMatrix.split(',')[4].trim());
        }
    };

    const sliderMove = (e) => {
        slider.classList.remove('smooth-transition');

        if (moving) {
            const diff = e.pageX - initialPosition;
            if (e.pageX - lastPageX > 0) {
                if (transformValue > 0)
                    return;
            } 
            else {
                if (Math.abs(transformValue) > slider.offsetWidth - sliderBox.offsetWidth)
                    return;
            }
            transformValue = parseInt(transform) + diff;
            slider.style.transform = `translateX(${transformValue}px)`;
        }

        lastPageX = e.pageX;
    };

    const sliderEnd = (e) => {
        moving = false;
        document.getElementById('grid-container').innerHTML = "";
        var elem = sliderItems.find(x => x.value === e.target.innerHTML)
        data[elem.key].forEach(addProductCard);
    };


    if (window.PointerEvent) {
        sliderBox.addEventListener('pointerdown', sliderStart);
        sliderBox.addEventListener('pointermove', sliderMove);
        sliderBox.addEventListener('pointerup',sliderEnd);
    } 
    else {
        sliderBox.addEventListener('touchdown', sliderStart);
        sliderBox.addEventListener('touchmove', sliderMove);
        sliderBox.addEventListener('touchup',sliderEnd);
        sliderBox.addEventListener('mousedown', sliderStart);
        sliderBox.addEventListener('mousemove', sliderMove);
        sliderBox.addEventListener('mouseup',sliderEnd);
    }

    sliderItems.forEach(el => {
        const itemNext = document.createElement('div');
        itemNext.innerHTML = el.value;
        itemNext.className = 'card';
        slider.appendChild(itemNext)
    })
}

/**
 * Ürünleri html'e eklemek için
 * @param {*} item eklenecek olan ürün bilgileri
*/
function addProductCard(item) {
    var product = document.getElementById('grid-container'); 
    product.innerHTML += `<div>
        <div class="item-box">
            <div class="item-image">
                <!-- Resim  -->
                <img src=${item.imgUrl}>
            </div>
            <div class="item-category">
                <!-- Yazılar  -->
                <span>
                    ${item.imgTitle}
                </span>
                <span>
                    ${item.imgCode}
                </span>
            </div>
            <div class="item-price">
                <!-- Fiyat  -->
                <strong>
                    ${item.imgPrice}
                </strong>
                <del>
                    ${item.imgCutPrice}
                </del>
            </div>
        </div>
    </div>`; 
    document.body.appendChild(product);
}

/**
 * Popular aramaları göstermek için
 * @param {*} popularItems popular aranan itemlar
*/
function getPopular (popularItems) {
    popularItems.forEach(el => {
        const itemNext = document.createElement('li');
        const list = document.getElementById('populer-search-items-list');
        itemNext.innerHTML = el.value;
        itemNext.style.backgroundColor = el.color;
        list.appendChild(itemNext)
    });
}