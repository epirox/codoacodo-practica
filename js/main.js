import { loadEventCarousel } from './carousel.js';
import { loadLibraryImges } from './library.js';
import { loadEventContactSubmit } from './contactForm.js';


const debugLoad = function () {
    console.log("La página se ha cargado completamente.")
}

const loadEventMenuToggle = function () {
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('active');
    });
}



const apiManga = function () {
    const options = {
        method: 'GET',
        url: 'https://mangaverse-api.p.rapidapi.com/manga/image',
        params: {
            id: '659524e9597f3b00281f070d'
        },
        headers: {
            'X-RapidAPI-Key': 'e96dd4fc0fmsh45983479f88aa72p1d0a83jsnc1e9e7a7c58e',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    fetch(`${options.url}?id=${options.params.id}`, {
        method: options.method,
        headers: options.headers
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


window.onload = function () {

    loadEventMenuToggle()
    loadEventCarousel()    
    loadLibraryImges()
    loadEventContactSubmit()
    
    //hola
    apiManga()
    debugLoad()
}