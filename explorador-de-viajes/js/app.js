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

//IMPORTAR PROCESAR PAISES
import { procesarPaises } from './utils/filters.js';

/* =========================================
   REFERENCIAS DEL DOM
========================================= */
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");

//CONTROLES DEL DOM
const searchInput = document.querySelector('#search-input');
const continentFilter = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');


//// APLICAR FILTROS
function aplicarFiltros() {

  //OBTENER VALORES SELECCIONADOS
  const texto = searchInput.value;
  const continente = continentFilter.value;
  const criterioOrden = sortFilter.value;

  //PROCESAR LOS DATOS
  const resultados = procesarPaises(paises, texto, continente, criterioOrden);

  // RENDERIZAR LOS RESULTADOS
  renderPaises(resultados, destinationsContainer, 'explorar');

  // ACTUALIZAR EL CONTADOR
  actualizarContador(resultados.length, resultsCount);
}

//REGISTRAR EVENTOS
function registrarEventos() {
 
  // EVENTO INPUT PARABUSCAR EN TIEMPO REAL
  searchInput.addEventListener('input', aplicarFiltros);

  // CONTINENTEEVENTO CHANGE CUANDO CAMBIA EL CRITERIO DE BUSQUEDA
  continentFilter.addEventListener('change', aplicarFiltros);

  // EVENTO CHANGE PARA ORDENAMIENTO
  sortFilter.addEventListener('change', aplicarFiltros);
}

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
  //BORRAMOS renderPaises y actualizarContador
  aplicarFiltros();

  //REGISTRAR EVENTOS
  registrarEventos();
}

/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();