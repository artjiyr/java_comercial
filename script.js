let slider = document.querySelector('.slider');
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');


let firstClone = items[0].cloneNode(true);
let lastClone = items[items.length - 1].cloneNode(true);

list.appendChild(firstClone);
list.insertBefore(lastClone, items[0]);

items = document.querySelectorAll('.slider .list .item');


let active = 1;
let total = dots.length;


list.style.left = -items[active].offsetLeft + 'px';


function reloadSlider(animate = true) {
    list.style.transition = animate ? 'left 0.5s ease' : 'none';

    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    
    let lastActiveDot = document.querySelector('.slider .dots li.active');
    if (lastActiveDot) lastActiveDot.classList.remove('active');
    let dotIndex = active - 1;
    if (dotIndex < 0) dotIndex = total - 1;
    if (dotIndex >= total) dotIndex = 0;
    dots[dotIndex].classList.add('active');
}


next.onclick = function () {
    active++;
    reloadSlider();

    if (active === total + 1) {
        setTimeout(() => {
            active = 1;
            reloadSlider(false);
        }, 500);
    }
}


prev.onclick = function () {
    active--;
    reloadSlider();

    if (active === 0) {
        setTimeout(() => {
            active = total;
            reloadSlider(false);
        }, 500);
    }
}


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        active = index + 1;
        reloadSlider();
    });
});


let autoSlide = setInterval(() => {
    next.click();
}, 8000);