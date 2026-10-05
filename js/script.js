document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initBuscador();
    initFormulario();
});

/* ===== Menú responsive ===== */
function initMenu() {
    var boton = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    if (!boton || !nav) return;

    boton.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
}

/* ===== Búsqueda de estudiantes ===== */
function initBuscador() {
    var buscador = document.getElementById('buscador');
    var tabla = document.getElementById('tablaEstudiantes');
    if (!buscador || !tabla) return;

    var filas = tabla.querySelectorAll('tbody tr');
    var contador = document.getElementById('contador');
    var sinResultados = document.getElementById('sinResultados');

    function actualizar() {
        var texto = buscador.value.trim().toLowerCase();
        var visibles = 0;

        filas.forEach(function (fila) {
            var coincide = fila.textContent.toLowerCase().indexOf(texto) !== -1;
            fila.style.display = coincide ? '' : 'none';
            if (coincide) visibles++;
        });

        contador.textContent = visibles + ' de ' + filas.length + ' estudiantes';
        sinResultados.hidden = visibles !== 0;
    }

    buscador.addEventListener('input', actualizar);
    actualizar();
}

/* ===== Validación del formulario ===== */
function initFormulario() {
    var form = document.getElementById('formRegistro');
    if (!form) return;

    var mensaje = document.getElementById('mensajeExito');
    var campos = ['nombre', 'apellido', 'carrera', 'email', 'telefono'];

    var reglas = {
        nombre: function (v) {
            if (!v) return 'El nombre es obligatorio.';
            if (v.length < 2) return 'Debe tener al menos 2 caracteres.';
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(v)) return 'Solo se permiten letras.';
            return '';
        },
        apellido: function (v) {
            if (!v) return 'El apellido es obligatorio.';
            if (v.length < 2) return 'Debe tener al menos 2 caracteres.';
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(v)) return 'Solo se permiten letras.';
            return '';
        },
        carrera: function (v) {
            return v ? '' : 'Selecciona una carrera.';
        },
        email: function (v) {
            if (!v) return 'El correo es obligatorio.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ingresa un correo válido.';
            return '';
        },
        telefono: function (v) {
            if (!v) return 'El teléfono es obligatorio.';
            if (!/^\d{7,10}$/.test(v)) return 'Debe tener entre 7 y 10 dígitos.';
            return '';
        }
    };

    function validarCampo(id) {
        var input = document.getElementById(id);
        var grupo = input.closest('.form-group');
        var error = grupo.querySelector('.error-msg');
        var texto = reglas[id](input.value.trim());

        error.textContent = texto;
        grupo.classList.toggle('has-error', texto !== '');
        grupo.classList.toggle('is-valid', texto === '');
        return texto === '';
    }

    campos.forEach(function (id) {
        var input = document.getElementById(id);
        input.addEventListener('blur', function () { validarCampo(id); });
        input.addEventListener('input', function () {
            if (input.closest('.form-group').classList.contains('has-error')) validarCampo(id);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var todoValido = true;

        campos.forEach(function (id) {
            if (!validarCampo(id)) todoValido = false;
        });

        if (!todoValido) {
            mensaje.hidden = true;
            return;
        }

        var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        mensaje.textContent = '✅ El estudiante ' + nombre + ' ' + apellido + ' fue registrado correctamente.';
        mensaje.hidden = false;

        form.reset();
        form.querySelectorAll('.form-group').forEach(function (g) {
            g.classList.remove('is-valid', 'has-error');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    form.addEventListener('reset', function () {
        mensaje.hidden = true;
        form.querySelectorAll('.error-msg').forEach(function (s) { s.textContent = ''; });
        form.querySelectorAll('.form-group').forEach(function (g) {
            g.classList.remove('is-valid', 'has-error');
        });
    });
}
