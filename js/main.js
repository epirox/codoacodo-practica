window.onload = function () {

    console.log("La página se ha cargado completamente.");
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('active');
    });
};