window.onload = () => {

    let query = new URLSearchParams(location.search);
    console.log(query)
    if(query.has('id')){
        let pelicula = query.get('id')
        document.getElementById("crear-Pelicula").style.display = "none";

        fetch(`http://localhost:3031/api/movies/${pelicula}`)
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function (pelicula){
            console.log(pelicula.data)
            document.getElementById('title').value = pelicula.data.title
            document.getElementById('rating').value = parseFloat(pelicula.data.rating)
            document.getElementById('awards').value = parseInt(pelicula.data.awards)
            document.getElementById('release_date').value = moment(pelicula.data.release_date).format('YYYY-MM-DD')
            document.getElementById('genre').value = parseInt(pelicula.data.genre_id)
            document.getElementById('length').value = parseInt(pelicula.data.length)
        })

        /* Editar Pelicula */
        document.getElementById('editar-Pelicula').addEventListener('click', function(e){
            e.preventDefault()
            formularioEdit = {
                title : document.getElementById('title').value,
                rating : document.getElementById('rating').value,
                awards : document.getElementById('awards').value,
                release_date : document.getElementById('release_date').value,
                genre_id : document.getElementById('genre').value,
                length : document.getElementById('length').value,
            }

            fetch(`http://localhost:3031/api/movies/update/1`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioEdit)

            }).then(res => res.json()).then(respuesta => {
            console.log(respuesta)
            alert('La Pelicula ha sido Editada!!')
            })
        })

        /* Eliminar Pelicula */
        document.getElementById('borrar-Pelicula').addEventListener('click', function(e){
            e.preventDefault()
            var id = 1;  
            fetch(`http://localhost:3031/api/movies/delete/${pelicula}`, {
            method: "DELETE",
            }).then(res => res.json()).then(respuesta => {
            console.log(respuesta)
            alert('La Pelicula ha sido Eliminada!!')
            })
        })
    }else{
        document.getElementById("borrar-Pelicula").style.display = "none";
        document.getElementById("editar-Pelicula").style.display = "none";

        document.getElementById("crear-Pelicula").addEventListener("click", function (e) {
            e.preventDefault();

            let formularioCrear = {
                title: document.getElementById("title").value,
                rating: document.getElementById("rating").value,
                awards: document.getElementById("awards").value,
                release_date: document.getElementById("release_date").value,
                length: document.getElementById("length").value,
                genre_id: 5
            }

            //Creo la pelicula y la guardo
            fetch(`http://localhost:3031/api/movies/create`, {
                method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioCrear)

            }).then(res => res.json()).then(() => {

            alert('¡La película se ha creado!!')
            })
        })
    }
}