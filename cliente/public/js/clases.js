fetch('https://localhost:3001/clases')
    .then(response => response.json())
    .then(data => {
        // Obtener el contenedor de las clases en el DOM
        const clasesContainer = document.getElementById('clasesContainer');

        // Verificar si 'data' es definido y es un array
        if (Array.isArray(data)) {
            // Iterar sobre las clases y crear elementos HTML
            data.forEach(clase => {
                const claseElement = document.createElement('div');
                claseElement.classList.add('col-md-4', 'mb-4', 'd-flex', 'flex-column');

                claseElement.innerHTML = `
                    <div class="card">
                        <img src="${clase.img}" class="card-img-top" alt="${clase.nombre}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title"><b>${clase.nombre}</b></h5>
                            <p class="card-text">${clase.descripcion}</p>
                            <p class="card-text"><b>Aforo:</b> ${clase.aforo}</p>
                            <p class="card-text"><b>Horario:</b> ${clase.horario}</p>
                            <p class="card-text"><b>Instructor:</b> ${clase.instructor}</p>
                            <a href="/login" class="btn btn-danger mt-auto">¡Únete!</a>
                        </div>
                    </div>
                `;

                // Agregar el elemento de la clase al contenedor
                clasesContainer.appendChild(claseElement);
            });
        } else {
            console.error('El formato de los datos devueltos no es el esperado.');
        }
    })
    .catch(error => console.error('Error al obtener las clases:', error));
