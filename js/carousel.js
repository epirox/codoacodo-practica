const currentIndex = 3;
const carouselInner = document.querySelector('.carousel-inner');

//falta implemenatar
/*
const adjustCarousel = function () {
    const windowWidth = window.innerWidth;
  
    // Ajusta el número de elementos visibles según el tamaño de la pantalla
    let numVisibleItems;
    if (windowWidth < 768) { // Tamaño de pantalla para dispositivos móviles
      numVisibleItems = 1;
    } else {
      numVisibleItems = 3; // Tamaño de pantalla para escritorio
    }
  
    // Oculta todos los elementos del carousel
  
    // Muestra solo el número requerido de elementos

  }
*/
const disabledControlCaousel = function () {
    const prevButtons = document.querySelectorAll('.btn');
    prevButtons.forEach(button => {
        button.disabled = true;
    })
}
const enabledControlCaousel = function () {
    const prevButtons = document.querySelectorAll('.btn');
    prevButtons.forEach(button => {
        button.disabled = false;
    })
}
const startCarousel = function () {
    const carouselItems = loadItemsOfCarousel()
    carouselItems[currentIndex - 1].classList.add('active')
    carouselItems[currentIndex].classList.add('active')
    carouselItems[currentIndex + 1].classList.add('active')
}

const moveItemStartToEnd = function () {
    const carouselItems = loadItemsOfCarousel()
    const firstItem = carouselItems[0]
    const firstClone = firstItem.cloneNode(true)
    firstClone.classList.remove('active')
    carouselInner.appendChild(firstClone)
    firstItem.remove()

}

const moveItemEndToStart = function () {
    const carouselItems = loadItemsOfCarousel()
    const lastItemIndex = carouselItems.length - 1
    const lastItem = carouselItems[lastItemIndex]
    const lastClone = lastItem.cloneNode(true)
    lastClone.classList.remove('active')
    const firstItem = carouselItems[0]
    firstItem.parentNode.insertBefore(lastClone, firstItem)
    lastItem.remove()
}

const fadeIn = function(item) {
    return new Promise((resolve) => {
        item.classList.add('active');
        item.classList.add('fadeIn');
        const handler = () => {
            item.classList.remove('fadeIn');
            item.removeEventListener('animationend', handler);
            return true;
        };
        resolve(true);
    });
};

const fadeOut = function(item) {
    return new Promise((resolve) => {
        item.classList.add('fadeOut');
        const handler = () => {
            item.classList.remove('fadeOut');
            item.classList.remove('active');
            item.removeEventListener('animationend', handler);
            resolve(true);
        };
        item.addEventListener('animationend', handler);
    });
};


const loadItemsOfCarousel = function () {
    return document.querySelectorAll('.carousel-inner .carousel-item')
}

const moveCaroucel = async function (direction) {
    disabledControlCaousel();

    const carouselItems = loadItemsOfCarousel();
    const currentIndexToLeave = currentIndex - direction;
    const leaveCurrentItem = carouselItems[currentIndexToLeave];
    const finishOut = fadeOut(leaveCurrentItem);

    const currentIndexToappear = currentIndex + 2*direction;
    const appearCurrentItem = carouselItems[currentIndexToappear];
    const finishIn = fadeIn(appearCurrentItem);

    await Promise.all([finishOut, finishIn]);

    enabledControlCaousel();
}


const actionCarousel = function (direction) {
    if (direction > 0) {
        moveCaroucel(direction);
        moveItemStartToEnd();
    } else {
        moveCaroucel(direction);
        moveItemEndToStart();
    }
}

export const loadEventCarousel = function () {
    startCarousel()
    document.getElementById('b-prev')
        .addEventListener('click', function () {
            actionCarousel(-1)
        });
    document.getElementById('b-next')
        .addEventListener('click', function () {
            actionCarousel(1)
        });
    /*
    window.addEventListener('load', adjustCarousel);
    window.addEventListener('resize', adjustCarousel);
    */
}