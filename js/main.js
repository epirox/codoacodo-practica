let currentIndex = 1;
const moveBy = 1;
const carouselInner = document.querySelector('.carousel-inner');

const disabledControlCaousel = function () {
    carousel - control - prev
}
const startCarousel = function () {
    const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
    carouselItems[0].classList.add('active')
    carouselItems[1].classList.add('active')
    carouselItems[2].classList.add('active')
}

const fadeIn = function (item, appened = false) {
    if(appened){
        carouselInner.appendChild(item);
    }
    item.classList.add('active')
    item.classList.add('fadeIn')
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeIn')        
    });
}

const fadeOut = function (item, remove = false) {
    item.classList.add('fadeOut');
    item.addEventListener('animationend', function () {
        item.classList.remove('fadeOut')
        item.classList.remove('active')
        if (remove) {
            console.log("l")
            item.remove()
        }
        const prevButtons = document.querySelectorAll('.btn');

        prevButtons.forEach(button => {
            button.disabled = false;
        });

    });
}


const moveCarousel = function (direction) {
    const prevButtons = document.querySelectorAll('.btn');

    prevButtons.forEach(button => {
        button.disabled = true;
    });

    const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
    const carouselWidth = carouselItems[currentIndex].offsetWidth;

    if (direction === 1) {

        if ((currentIndex + 1) < carouselItems.length - 1) {
            
            const leftCurrentIndex = currentIndex - 1
            const leaveCurrentItem = carouselItems[leftCurrentIndex]
            fadeOut(leaveCurrentItem)

            const rightCurrentIndex = currentIndex + 2
            const appearCurrentItem = carouselItems[rightCurrentIndex]
            fadeIn(appearCurrentItem)


            currentIndex++
            console.log(leftCurrentIndex, currentIndex, rightCurrentIndex)


        } else {
            const firstClone = carouselItems[0].cloneNode(true);

            fadeIn(firstClone,true)

            const leaveCurrentItem = carouselItems[currentIndex - 1]
            fadeOut(leaveCurrentItem)

            const elementToRemove = carouselItems[0];
            elementToRemove.remove()

        }
    } else if (direction === -1) {

        if ((currentIndex - 1) > 0) {
            
            const leftCurrentIndex = currentIndex - 1
            const appearCurrentItem = carouselItems[leftCurrentIndex]
            fadeIn(appearCurrentItem)

            const rightCurrentIndex = currentIndex + 2
            const leaveCurrentItem = carouselItems[rightCurrentIndex]
            fadeOut(leaveCurrentItem)

            currentIndex--
            console.log(leftCurrentIndex, currentIndex, rightCurrentIndex)



        } else {
            const firstClone = carouselItems[carouselItems.length - 1].cloneNode(true);

            fadeIn(firstClone,true)

            const leaveCurrentItem = carouselItems[currentIndex + 1]
            fadeOut(leaveCurrentItem)

            const elementToRemove = carouselItems[carouselItems.length - 1];
            elementToRemove.remove()
        }

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