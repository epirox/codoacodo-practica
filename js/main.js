const currentIndex = 3;
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
    carouselItems[currentIndex - 1].classList.add('active')
    carouselItems[currentIndex ].classList.add('active')
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
    const firstItem = carouselItems[0];
    firstItem.parentNode.insertBefore(lastClone, firstItem);
    lastItem.remove()
}

const fadeIn = function (item) {
    item.classList.add('active')
    item.classList.add('fadeIn')
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeIn')
    });
}

const fadeOut = function (item) {
    item.classList.add('fadeOut');
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeOut')
        item.classList.remove('active')
    })
}
const loadItemsOfCarousel = function () {
    return document.querySelectorAll('.carousel-inner .carousel-item')
}

const moveLeftCaroucel = function(){
    const carouselItems = loadItemsOfCarousel()
    const currentIndexToLeave = currentIndex - 1
    const leaveCurrentItem = carouselItems[currentIndexToLeave]
    fadeOut(leaveCurrentItem)

    const currentIndexToappear = currentIndex + 2
    const appearCurrentItem = carouselItems[currentIndexToappear]
    fadeIn(appearCurrentItem)

}
const moveRightCaroucel = function(){
    const carouselItems = loadItemsOfCarousel()
    const currentIndexToLeave = currentIndex + 1
    const leaveCurrentItem = carouselItems[currentIndexToLeave]
    fadeOut(leaveCurrentItem)

    const currentIndexToappear = currentIndex - 2
    const appearCurrentItem = carouselItems[currentIndexToappear]
    fadeIn(appearCurrentItem)

}

const moveCarousel = function (direction) {
    

    if (direction > 0) {
        moveLeftCaroucel()
        moveItemStartToEnd()
        
    } else {
        moveRightCaroucel()
        moveItemEndToStart()
    }
    

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