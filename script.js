document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector('.slider');
    if (!slider) return;

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

    next.onclick = () => {
        active++;
        reloadSlider();

        if (active === total + 1) {
            setTimeout(() => {
                active = 1;
                reloadSlider(false);
            }, 500);
        }
    };

    prev.onclick = () => {
        active--;
        reloadSlider();

        if (active === 0) {
            setTimeout(() => {
                active = total;
                reloadSlider(false);
            }, 500);
        }
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            active = index + 1;
            reloadSlider();
        });
    });

    setInterval(() => {
        next.click();
    }, 8000);

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".titulo1 h1, .textoSobre p", {
        opacity: 0,
        y: 40,
        filter: "blur(20px)",
        duration: 5,
        stagger: .5,
        scrollTrigger: {
            trigger: "#sobre",
            start: "-40% top",
            end: "85% bottom",
            scrub: 2,
            once: true
        }
    });


    gsap.fromTo (".imgSobre img", {
        opacity: 0,
        x: 250,
        y: 100
    },{
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.3,
        ease: "circ.out",
        scrollTrigger: {
            trigger: "#sobre",
            start: "-20% top",
            end: "85% bottom",
            scrub: 1,
        }
    });

    gsap.fromTo (".logo img", {
        opacity: 0,
        x: -80,
    },{
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.fromTo(".menu a",
    {
        opacity: 0,
        y: -20
    },
    {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
        ease: "power4.out"
    }); 

    gsap.fromTo(".slider .item img, .buttons button, .dots li",
    {
        opacity: 0,
        y: -20
    },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
    }); 

    gsap.fromTo("#catalogo h1", {
        opacity: 0,
        y: -50
    },{
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#catalogo",
            start: "-60% top",
            end: "85% bottom",
            scrub: 2,
            markers: true,
            once: true
        }
    });

    gsap.fromTo(".botoesCategoria .cards",
    {
        opacity: 0,
        y: 80,
        filter: "blur(10px)"
    },
    {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#catalogo",
            start: "-50% top",
            end: "85% bottom",
            scrub: 1,
            once: true
        }
    });
});