// cambia color navegación al hacer scroll
window.onscroll = function (e) {
    let scroll = window.scrollY;

    const headerScroll = document.querySelector('#navegacion-principal');
    if (scroll > 300) {
        headerScroll.classList.remove("bg-transparent");
        headerScroll.classList.add('bg-primary');

    } else {
        headerScroll.classList.remove('bg-primary');
        headerScroll.classList.add("bg-transparent");

    }
};




// Animacion carga progressbar cuando aparezca en pantalla
//REFERNECIA: https://www.jasoft.org/Blog/post/Detectar-la-aparicion-y-desaparicion-de-un-elemento-evento-inViewport

/**
 * true = esta oculto y se puede cargar
 */
let oculto;

addEventListener("DOMContentLoaded", function () {
    let progresBars = document.querySelectorAll(".mi-progresbar");

    //Cargo la variable oculto como un array con valores true
    oculto = new Array(progresBars.length).fill(true);

    for (let i = 0; i < progresBars.length; i++) {
        inViewportPartially(progresBars[i], cargaProgresBar);
    }
});

function cargaProgresBar() {
    let progresBars = document.querySelectorAll(".mi-progresbar");
    let width = new Array(progresBars.length);
    let id = new Array(progresBars.length);
    for (let i = 0; i < progresBars.length; i++) {

        // Si el progresbar esta visible y antes estaba oculto
        if (isElementPartiallyVisible(progresBars[i]) && oculto[i]) {
            progresBars[i].style.width = "0%";

            width[i] = 0;
            id[i] = setInterval(function () {
                if (width[i] >= progresBars[i].getAttribute("aria-valuenow")) {
                    clearInterval(id[i]);
                    width[i] = 0;
                } else {
                    width[i]++;
                    progresBars[i].style.width = `${width[i]}%`;
                    progresBars[i].textContent = `${width[i]}%`;
                }
            }, 15);
            oculto[i] = false;
        } else {
            // Si antes estaba visible pero ahora no lo vacio y le digo que se pueda volver a cargar
            if (!isElementPartiallyVisible(progresBars[i])) {
                oculto[i] = true;
                progresBars[i].style.width = "0%";
            }

        }
    }
}

/**
 * Comprueba si un elemento esta visible
 * @param {object} elto 
 */
function isElementPartiallyVisible(elto) {
    var anchoViewport = window.innerWidth || document.documentElement.clientWidth;
    var alturaViewport = window.innerHeight || document.documentElement.clientHeight;
    //Posición de la caja del elemento
    var caja = elto.getBoundingClientRect();
    var cajaDentroH = (caja.left >= 0 && caja.left <= anchoViewport) ||
        (caja.right >= 0 && caja.right <= anchoViewport);
    var cajaDentroV = (caja.top >= 0 && caja.top <= alturaViewport) ||
        (caja.bottom >= 0 && caja.bottom <= alturaViewport);
    return (cajaDentroH && cajaDentroV);
}

/**
 * 
 * @param {object} elto 
 * @param {function} handler 
 */
function inViewportPartially(elto, handler) {
    var anteriorVisibilidad = isElementPartiallyVisible(elto);
    //Defino un manejador para determinar posibles cambios
    function detectarPosibleCambio() {
        var esVisible = isElementPartiallyVisible(elto);
        if (esVisible != anteriorVisibilidad) { //ha cambiado el estado de visibilidad del elemento
            anteriorVisibilidad = esVisible;
            if (typeof handler == "function")
                handler(esVisible, elto);
        }
    }
    //Asocio esta función interna a los diversos eventos que podrían producir un cambio en la visibilidad
    window.addEventListener("load", detectarPosibleCambio);
    window.addEventListener("resize", detectarPosibleCambio);
    window.addEventListener("scroll", detectarPosibleCambio);
}





// Validacion formulario
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


// Boton para ir arriba
// Referencia: https://codepen.io/rdallaire/pen/apoyx
$(document).ready(function () {

    $('.ir-arriba').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.ir-arriba').slideDown(300);
            
            $('.ir-arriba').css("display","flex");
            $('.ir-arriba').css("justify-content","center");
            $('.ir-arriba').css("align-items","center");
        } else {
            $('.ir-arriba').slideUp(300);
        }
    });
    console.log($(this).scrollTop());
});