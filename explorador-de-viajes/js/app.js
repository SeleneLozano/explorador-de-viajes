/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */

/* =========================================
   IMPORTACIONES
========================================= */
import { obtenerPaises } from "./api/countriesApi.js";
import {
  mostrarCargando,
  mostrarError,
  renderPaises,
  actualizarContador
} from "./ui/ui.js";

/* =========================================
   REFERENCIAS DEL DOM
========================================= */
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");

/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */
let paises = [];

/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
async function init() {
  /* =====================================
     MOSTRAR ESTADO DE CARGA
  ====================================== */
  mostrarCargando(destinationsContainer);

  /* =====================================
     OBTENER PAÍSES DESDE LA API
  ====================================== */
  paises = await obtenerPaises();

  /* =====================================
     VALIDAR RESULTADOS
  ====================================== */
  if (paises.length === 0) {
    mostrarError(destinationsContainer);
    actualizarContador(paises.length, resultsCount);
    return;
  }

  /* =====================================
     RENDERIZAR DESTINOS Y CONTADOR
  ====================================== */
  renderPaises(paises, destinationsContainer);
  actualizarContador(paises.length, resultsCount);

  /* =====================================
     LOGS DE CONSOLA
  ====================================== */
  console.log("Países obtenidos:", paises);
}

/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();