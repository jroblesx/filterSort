/**
 * Esto carga el json dentro de una variable
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import
 */
import charactersJson from "../harry.json" assert { type: "json" };

/**
 * Con esta funcion vamos a pintar en pantalla los resultados
 * Es nuestra funcion principal.
 */
function print(characters) {
  const resultsList = document.getElementById("list-of-results");
  const resultsTotal = document.getElementById("text-resultados");

  //La funcion map la usamos para recorrer el arreglo de personajes
  characters.map((character) => {
    /**
     * A continuacion utilizo string literal para concatenar el string en lugar de usar + https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
    */
    const newListItem = `
    <li class="result-item">nombre: ${character.name}, casa: ${character.house}</li>
    `;
    /**
     * Utilizo insertAdjacentHTML para crear un nuevo nodo html (un <li>) dentro de nuestra lista de resultados https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
     */
    resultsList.insertAdjacentHTML("beforeend", newListItem);
  });

  /**
   * Utilizo el caracter ? para hacer optional chaining https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining
   * la finalidad el mostrar el total de registros que se estan pintado pero no es necesario si no lo consideraron en el diseño
   * lo que hace es validar que characters no esté nulo y si es asi toma el length sino coloca el string "0"
   */
  resultsTotal.innerHTML = characters?.length || "0";
}

/**
 * Limpia la lista de resultados
 */
function clearResults() {
  document.getElementById("list-of-results").innerHTML = ""; //Limpiamos la lista <ul> eliminando todos los li
  document.getElementById("text-resultados").innerHTML = "0"; //Ponemos nuestro indicador de resultados en 0
}

/**
 * Filtra los personajes segun su género
 * @param {"Male" o "Female"} gender
 * @returns una lista de caracteres que tengan el genero seleccionado
 */
function filterByGender(gender) {
  return charactersJson.characters.filter(
    (character) => character.gender === gender
  );
}

/**
 * Sortea u ordena la lista de resultados https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @param {"asc" o "desc"} order
 */
function sortByName(order) {
  //Toma el género que esté seleccionado
  const currentGender = document.getElementById("gender-filter").value;
  //Va a filtrar con nuestra funcion filterByGender
  const filteredAndSortedCharactersByGender = filterByGender(currentGender);
  //Dependiendo del genero seleciconado aplica un filtro u otro es decir, ascendente o descendente
  if (order === "asc") {
    filteredAndSortedCharactersByGender.sort(function (a, b) { 
      return a.name.localeCompare(b.name); //Se debe utilizar la funcion localcompara para ayudar al filtro a determinar que palabra va primero y cual despues https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    });
  } else if (order === "desc") {
    filteredAndSortedCharactersByGender.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  }
  //finalmente retorna la lista filtrada y ordenada.
  return filteredAndSortedCharactersByGender;
}

/**
 * Eventos js
 */

/**
 * Este evento hace lo siguiente:
 * 0. Escucha cada vez que cambie el <select> 'gender-filter' es decir cada vez que seleccionamos un género
 * 1. A traves de e.target.value toma el valor del input
 * 2. Ejecuta la funcion filterByGender que retorna solo los personajes que tengan el genero seleccionado
 * 3. Limpia la lista de resultados
 * 4. Pinta el resultado de la busqueda en nuestro <ul>
 */
document
  .getElementById("gender-filter")
  .addEventListener("change", function (e) {
    // Se ejecuta cada vez que se selecciona un filtro de genero
    const filteredCharactersByGender = filterByGender(e.target.value);
    clearResults();
    print(filteredCharactersByGender);
  });

/**
 * Este evento hace lo siguiente:
 * 0. Escucha cada vez que cambie el <select> 'gender-filter' es decir cada vez que seleccionamos un género
 * 1. A traves de e.target.value toma el valor del input
 * 2. Ejecuta la funcion filterByGender que retorna solo los personajes que tengan el genero seleccionado
 * 3. Limpia la lista de resultados
 * 4. Pinta el resultado de la busqueda en nuestro ul
 */
document.getElementById("name-sort").addEventListener("change", function (e) {
  // Se ejecuta cada vez que se selecciona un filtro de genero
  const filteredCharactersByGender = sortByName(e.target.value);
  clearResults();
  print(filteredCharactersByGender);
});

{
  print(charactersJson.characters);
}