// login.js

// Importa las funciones necesarias de crypto-js
const { AES, SHA256 } = window.CryptoJS;

// Función para encriptar la información usando un token
function encryptData(data, token) {
    const encryptedData = AES.encrypt(data, token).toString();
    return encryptedData;
}

// Función para desencriptar la información usando un token
function decryptData(encryptedData, token) {
    const decryptedData = AES.decrypt(encryptedData, token).toString(window.CryptoJS.enc.Utf8);
    return decryptedData;
}

const $btnSignIn = document.querySelector('.sign-in-btn');
const $btnSignUp = document.querySelector('.sign-up-btn');
const $signUp = document.querySelector('.sign-up');
const $signIn = document.querySelector('.sign-in');
const $signupForm = document.getElementById('signup-form');
const $signinForm = document.querySelector('.sign-in form');

document.addEventListener('click', async (e) => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }

    // Si el formulario de inicio de sesión está activo
    if (e.target.value === 'Iniciar Sesion') {
        const email = document.querySelector('.sign-in input[type="email"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        // Realizar la solicitud a la API para validar el inicio de sesión
        const response = await fetch('https://localhost:3001/usuarios');
        const data = await response.json();

        const user = data.find((user) => user.email === email && user.password === password);

        if (user) {
            alert('¡Inicio de sesión exitoso!');

            // Encriptar la sesión antes de almacenarla en el almacenamiento local
            const token = 'tuTokenSecreta'; // Reemplaza con tu token secreto
            const encryptedSession = encryptData(JSON.stringify({ email, password }), token);
            localStorage.setItem('loggedInUser', encryptedSession);

            window.location.href = '/';
            // Aquí puedes redirigir al usuario a la página principal, por ejemplo.
        } else {
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    }
});

// Comprobar si hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Desencriptar la sesión al cargar la página
        const token = 'tuTokenSecreta'; // Reemplaza con tu token secreto
        const decryptedSession = decryptData(loggedInUser, token);

        // Haz lo que necesites con la sesión desencriptada
        // Por ejemplo, redirigir al usuario a la página principal
        window.location.href = '/';
    }
});
