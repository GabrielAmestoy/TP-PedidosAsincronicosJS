window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  if(localStorage.getItem('calificaciones') !== null) {
    const link = document.getElementById("favoritas");
    link.innerHTML = '<a href="favoritas.html">Mis Peliculas Favoritas</a>';
  }
  // Aqui debemos agregar nuestro fetch
  fetch('http://localhost:3031/api/movies')
  .then(function(respuesta){
        return respuesta.json()
  })
  .then(function (peliculas){
    console.log(peliculas.data)
  /** Codigo que debemos usar para mostrar los datos en el frontend   */
    let data = peliculas.data;
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      /*  */
      const favoritas = document.createElement("p");
      favoritas.innerHTML = '<div>&#9734;</div>';
      console.log(localStorage)
      favoritas.addEventListener("click", function (e) {
        e.preventDefault()
        if (localStorage.calificaciones) {
          let arr = localStorage.calificaciones.split(',');
          arr.push(movie.id)
          localStorage.calificaciones = arr;
          console.log(localStorage)
        } else {
          localStorage.setItem('calificaciones', movie.id)
          console.log(localStorage)
        }
      })
      card.appendChild(duracion);
      card.appendChild(favoritas);
    });
  
  })

};
