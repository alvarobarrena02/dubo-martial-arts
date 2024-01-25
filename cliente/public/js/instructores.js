// Obtener la sección de instructores del DOM
const instructoresSection = document.getElementById('instructoresSection');

// URL de la API
const apiUrl = 'https://localhost:3001/instructores';

// Función para obtener y mostrar la información de los instructores
const obtenerInstructores = async () => {
    try {
        // Hacer la solicitud a la API
        const respuesta = await fetch(apiUrl);

        // Verificar si la solicitud fue exitosa (código de respuesta 200)
        if (respuesta.ok) {
            // Convertir la respuesta a formato JSON
            const instructores = await respuesta.json();

            // Mostrar la información de los instructores
            mostrarInstructores(instructores);
        } else {
            // Si la solicitud no fue exitosa, mostrar un mensaje de error
            console.error('Error al obtener los instructores:', respuesta.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

// Función para mostrar la información de los instructores en el DOM
const mostrarInstructores = (instructores) => {
    // Limpiar el contenido previo en caso de recarga
    instructoresSection.innerHTML = '';

    // Iterar sobre la lista de instructores
    instructores.forEach((instructor) => {
        // Crear un elemento div para cada instructor
        const instructorDiv = document.createElement('div');
        instructorDiv.classList.add('card', 'mb-3');

        // Ancho máximo de la tarjeta en 500 píxeles
        instructorDiv.style.maxWidth = '500px';

        // Crear el contenido del card
        // Asignar el contenido al div del card
        instructorDiv.innerHTML = `
      <img src="${instructor.img}" class="card-img-top img-fluid" alt="${instructor.nombre}" style="width: 500px; height: 500px; object-fit: cover">
      <div class="card-body">
        <h5 class="card-title">${instructor.nombre}</h5>
        <p class="card-text">${instructor.cargo}</p>
      </div>
    `;

        // Agregar el card al contenedor de instructores
        instructoresSection.appendChild(instructorDiv);


    });
};

// Llamar a la función para obtener y mostrar los instructores al cargar la página
obtenerInstructores();
