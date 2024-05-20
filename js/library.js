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

export const loadLibraryImges = function () {
    const url = 'json/biblioteca.json';

    const LibraryContainer = document.getElementById('biblioteca');

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

                    LibraryContainer.appendChild(contenedor);
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
    loadEventScroll()
}