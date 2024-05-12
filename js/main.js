let currentIndex = 1;
const moveBy = 1;
const carouselInner = document.querySelector('.carousel-inner');

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
    const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
    carouselItems[0].classList.add('active')
    carouselItems[1].classList.add('active')
    carouselItems[2].classList.add('active')
}

const moveItemStartToEnd = function (currentIndex, direction, carouselItems) {
    const endIndexCarouselItems = carouselItems.length - 1
    const isEndCarouselItems = (currentIndex + direction) >= endIndexCarouselItems

    console.log(isEndCarouselItems)

    if (isEndCarouselItems) {
        const firstItemIndex = 0
        const firstClone = carouselItems[firstItemIndex].cloneNode(true);

        carouselItems.appendChild(firstClone)

        const elementToRemove = carouselItems[firstItemIndex];
        elementToRemove.remove()
    }
    return isEndCarouselItems
}

const moveItemEndToStart = function (currentIndex, direction, carouselItems) {
    const startIndexCarouselItems = 1
    const isBeginCarouselItems = (currentIndex + direction) < startIndexCarouselItems
    console.log(isBeginCarouselItems)
    if (isBeginCarouselItems) {
        const lastItemIndex = carouselItems.length - 1
        const lastClone = carouselItems[lastItemIndex].cloneNode(true);

        carouselInner.insertAdjacentElement('afterbegin', lastClone);

        const elementToRemove = carouselItems[lastItemIndex]
        elementToRemove.remove()
    }
    return isBeginCarouselItems
}

const fadeIn = function (item, appened = false) {
    item.classList.add('active')
    item.classList.add('fadeIn')
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeIn')
    });
}

const fadeOut = function (item, prepend = false) {
    item.classList.add('fadeOut');
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeOut')
        item.classList.remove('active')
    })
}



const moveCarousel = function (direction) {
    const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item')

    const isEnd = moveItemStartToEnd(currentIndex, direction, carouselItems)
    const isStart = moveItemEndToStart(currentIndex, direction, carouselItems)

    const carouselItemsActive = document.querySelectorAll('.carousel-inner .carousel-item.active');
    const centerIndexCarouselItemsActive = 1
    const currentIndexToLeave = centerIndexCarouselItemsActive - direction
    const leaveCurrentItem = carouselItemsActive[currentIndexToLeave]
    fadeOut(leaveCurrentItem)


    for (const item of carouselItems) {
        console.log(item)
    }

    let currentIndexToAdd = currentIndex
    if (isEnd) {
        currentIndexToAdd += 2

    } else if (isStart) {

        currentIndexToAdd = 0

    } else {
        currentIndexToAdd += 2 * direction
        currentIndex += direction
    }
    console.log(direction, currentIndex, currentIndexToAdd)
    const appearCurrentItem = carouselItems[currentIndexToAdd]
    console.log = appearCurrentItem
    fadeIn(appearCurrentItem)



}

const loadBibliotecaImgenes = function () {
    const url = 'json/biblioteca.json';

    const bibliotecaContainer = document.getElementById('biblioteca');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let clave in data) {
                if (data.hasOwnProperty(clave)) {
                    const foto = data[clave];

                    const contenedor = document.createElement('div');
                    contenedor.classList.add('foto-contenedor');
                    contenedor.classList.add('item');

                    const imagen = document.createElement('img');
                    imagen.src = foto.src;
                    imagen.alt = foto.title;
                    imagen.classList.add('imagen');

                    const texto = document.createElement('div');
                    texto.classList.add('texto-polarizado');
                    texto.innerHTML = `
                        <h3>${foto.title}</h3>
                        <p>${foto.description}</p>
                        <p>Género: ${foto.gen}</p>
                    `;

                    contenedor.appendChild(imagen);
                    contenedor.appendChild(texto);

                    bibliotecaContainer.appendChild(contenedor);
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

const isInViewport = function (element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const showItems = function () {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('mostrar');
        } else {
            item.classList.remove('mostrar');
        }
    });
}

const loadEventScroll = function () {
    window.addEventListener('scroll', showItems);
}

const debugLoad = function () {
    console.log("La página se ha cargado completamente.")
}

const loadEventMenuToggle = function () {
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('active');
    });
}

const loadEventCarousel = function () {
    startCarousel()
    document.getElementById('b-prev')
        .addEventListener('click', function () {
            moveCarousel(-1)
        });
    document.getElementById('b-next')
        .addEventListener('click', function () {
            moveCarousel(1)
        });
}


window.onload = function () {

    loadEventMenuToggle()
    loadBibliotecaImgenes()
    loadEventScroll()
    loadEventCarousel()
    debugLoad()
}