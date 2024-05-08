window.onload = function () {

    console.log("La página se ha cargado completamente.");
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('active');
    });

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

};