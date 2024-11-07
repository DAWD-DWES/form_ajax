document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById('registro');
    registroForm.addEventListener("submit", validaForm);
});

function validaForm(e) {
    event.preventDefault();
    const form = this;

    // Preparar datos del formulario para enviar
    const formData = new FormData(form);
    formData.append(form.enviar.name, form.enviar.value);

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // Configurar la solicitud
    xhr.open('POST', 'index.php', true);
    xhr.setRequestHeader('Accept', 'application/json'); // Esperamos JSON de vuelta
    xhr.send(formData);

    // Manejar la respuesta
    xhr.onload = function () {
        form.classList.remove('was-validated');
        const response = xhr.response;
        // Ajustar la validación en cada campo específico
        Array.from(form.elements).forEach(input => {
            if (response.errors[input.name]) {
                const feedback = input.nextElementSibling;
                feedback.textContent = response.errors[input.name];
                feedback.style.display = 'block';
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid'); // Añadir is-valid si no hay errores
                if (input.nextElementSibling) {
                    feedback = input.nextElementSibling;
                    feedback.textContent = "";
                }
            }
        });
        if (response.success) {
            // alert('Registro completado con éxito.');
            form.submit();
        }
    };

    // Manejar errores de red
    xhr.onerror = function () {
        console.error('Error en la red, no se pudo completar la solicitud.');
    };

    // Enviar la solicitud
    xhr.send(formData);
}