document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registro');
    form.addEventListener("submit", validarFormulario);
    // Limpiar error al teclear
    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
            const feedback = input.closest('.input-group')?.querySelector('.invalid-feedback');
            if (feedback) {
                feedback.textContent = '';
                feedback.style.display = 'none';
            }
        });
    });
});

function limpiarErrores(form) {
    form.querySelectorAll('.is-valid, .is-invalid').forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });

    form.querySelectorAll('.invalid-feedback').forEach(feedback => {
        feedback.textContent = '';
        feedback.style.display = 'none';
    });
}

function mostrarErrores(form, errores) {
    for (const name in errores) {
        const input = form.elements[name];
        if (!input)
            continue;

        const feedback = input.closest('.input-group')?.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = errores[name];
            feedback.style.display = 'block';
        }

        input.classList.add('is-invalid');
    }
}

function validarFormulario(e) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const submitButton = form.querySelector('[type="submit"][name]');
    if (submitButton) {
        formData.append(submitButton.name, submitButton.value);
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', 'index.php', true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        const response = xhr.response;

        limpiarErrores(form);

        if (response?.errors) {
            mostrarErrores(form, response.errors);
        }

        if (response?.success) {
            form.submit(); // reenviar si todo está correcto
        }
    };

    xhr.onerror = function () {
        console.error('Error en la red. No se pudo completar la solicitud.');
    };

    xhr.send(formData);
}

