let currentIndex = 0;

const moveCarousel = function (direction) {
    console.log(currentIndex)
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');

    const carouselWidth = carouselItems[0].offsetWidth;
    const maxIndex = carouselItems.length - 1;

    if (direction === -1 && currentIndex > 0) {
        currentIndex--;
    } else if (direction === 1 && currentIndex < maxIndex) {
        currentIndex++;
    }

    const newPosition = -currentIndex * carouselWidth;
    carouselInner.style.transform = `translateX(${newPosition}px)`;
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

const loadEventCarousel = function(){
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