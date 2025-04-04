document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById('registro');
    registroForm.addEventListener("submit", validaForm);
});

function validaForm(e) {
    e.preventDefault();
    const form = this;

    const formData = new FormData(form);
    if (form.enviar) {
        formData.append(form.enviar.name, form.enviar.value);
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', 'index.php', true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        const response = xhr.response;
        form.classList.remove('was-validated');

        // Limpiar errores anteriores
        Array.from(form.elements).forEach(input => {
            const feedback = input.parentElement.querySelector('.invalid-feedback');
            if (feedback) {
                feedback.textContent = '';
                feedback.style.display = 'none';
            }
            input.classList.remove('is-invalid', 'is-valid');
        });

        // Mostrar errores nuevos si los hay
        for (const name in response.errors) {
            const input = form.elements[name];
            if (input) {
                const feedback = input.parentElement.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.textContent = response.errors[name];
                    feedback.style.display = 'block';
                }
                input.classList.add('is-invalid');
            }
        }

        // Si no hay errores, reenviar
        if (response.success) {
            form.submit();
        }
    };

    xhr.onerror = function () {
        console.error('Error en la red, no se pudo completar la solicitud.');
    };
    // Enviamos el DNI como parámetro POST
        const params = "accion=cuentasPorDni&dni=" + encodeURIComponent(dni);
        xhr.send(params);

    xhr.send(formData);
}
