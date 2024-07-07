const isInViewport = function (element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}

const showItems = function () {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (isInViewport(item, 100)) { // Aquí puedes ajustar el valor de offset según lo necesites
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
    //const url = 'json/biblioteca.json'
    const url = 'https://mangapoject.onrender.com/mangas/'

    const LibraryContainer = document.getElementById('biblioteca');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            return new Promise((resolve) => {
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
                resolve()
            })
        })
        .then(() => {
            showItems();
            loadEventScroll();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        })
}