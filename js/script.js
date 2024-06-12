var aficiones = []

function validar() {
    var retorno_nombre = validar_nombre();
    var retorno_contraseña = validar_contraseña();
    var retorno_contraseña2 = validar_contraseña2();
    var retorno_direccion = validar_direccion();
    var retorno_url = validar_url();
    var retorno_telefono = validar_telefono();
    var retorno_aficion = validar_aficiones();
    var retorno_comuna = validar_comuna();
    return retorno_nombre && retorno_contraseña && retorno_contraseña2 && retorno_telefono && retorno_direccion && retorno_comuna && retorno_aficion && retorno_url;
};


function actualizar() {
    var div_lista = document.getElementById('lista_aficiones');
    div_lista.innerHTML = "";
    var ul = document.createElement('ul');
    ul.className = 'list-group';
    for (var i in aficiones) {
        var li = document.createElement('li');
        li.innerHTML = aficiones[i];
        li.className = 'list-group-item';
        ul.appendChild(li);
    }
    div_lista.appendChild(ul);
}

function ingresar_aficion() {
    var input_aficion = document.getElementById('input-otro');
    var aficion = input_aficion.value;
    var ul = document.getElementById('lista-aficiones-ul');
    var div_error_aficiones = document.getElementById('error-aficiones');

    var aficionesExistentes = Array.from(ul.getElementsByTagName('label')).map(label => normalizarTexto(label.textContent));

    if (aficionesExistentes.includes(normalizarTexto(aficion))) {
        div_error_aficiones.innerHTML = 'Esta afición ya está en la lista';
        div_error_aficiones.className = 'text-danger small mt-1';
        input_aficion.classList.add('is-invalid')
        return;
    }


    if (aficion.trim() !== '' && !tiene_digito(aficion) && !caracter_especial(aficion)) {
        var li = document.createElement('li');
        li.classList.add('list-group-item', 'nueva-aficion');
        li.innerHTML = '<div class="col-md-3 col-sm-4 col-xs-4">' +
            '<input class="form-check-input" type="checkbox">' +
            '<label class="form-check-label">' + aficion + '</label>' +
            '</div>';

        ul.appendChild(li);
        input_aficion.value = '';
        div_error_aficiones.innerHTML = '';
        input_aficion.classList.remove('is-invalid')
    } else {
        div_error_aficiones.innerHTML = 'Por favor ingrese un pasatiempo válido';
        div_error_aficiones.className = 'text-danger small mt-1';
        input_aficion.classList.add('is-invalid')
        return;
    }
}


function caracter_especial(str) {
    var abc = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < str.length; i++) {
        if (abc.indexOf(str[i]) === -1) {
            return true;
        }
    }
    return false;
}

const selectElement = document.getElementById('select-prefijo');
const selectIcon = document.getElementById('select-icon');

function updateIcon() {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const iconSrc = selectedOption.getAttribute('data-icon');
    selectIcon.src = iconSrc;
}

selectElement.addEventListener('change', updateIcon);

updateIcon();

function validar_aficiones() {
    var input_aficion = document.getElementById('input-otro')
    var arr_check = document.getElementsByClassName('form-check-input');
    var div_error_aficiones = document.getElementById('error-aficiones');
    var count_new = 0;


    var nuevas_aficiones = document.querySelectorAll('.nueva-aficion input[type="checkbox"]');
    count_new = nuevas_aficiones.length;

    if (count_new < 2) {
        div_error_aficiones.innerHTML = 'Debe ingresar al menos 2 aficiones nuevas';
        div_error_aficiones.className = 'text-danger small mt-1';
        input_aficion.classList.add('is-invalid')
        return false;
    }
    else {
        div_error_aficiones.innerHTML = '';
        input_aficion.classList.remove('is-invalid')
        return true;
    }
}


function normalizarTexto(texto) {
    const acentos = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
        'Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u', 'Ü': 'u'
    };
    return texto.split('').map(letra => acentos[letra] || letra).join('').toLowerCase();
}

var input_nombre = document.getElementById('input-nombre');


function validar_nombre() {
    var input_nombre = document.getElementById('input-nombre');
    var div_error_nombre = document.getElementById('error-nombre')
    var nombre = input_nombre.value;


    function digito_inicial(str) {
        return str.length > 0 && !isNaN(str[0]);
    }

    function caracter_especial(str) {
        var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (var i = 0; i < str.length; i++) {
            if (abc.indexOf(str[i]) === -1) {
                return true;
            }
        }
        return false;
    }

    function digitos_final(str) {
        var i = 0;

        while (i < str.length && isNaN(str[i])) {
            i++;
        }

        while (i < str.length) {
            if (isNaN(str[i])) {
                return false;
            }
            i++;
        }
        return true;
    }

    if (nombre === '') {
        div_error_nombre.innerHTML = 'El nombre es obligatorio';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;
    } else if (digito_inicial(nombre)) {
        div_error_nombre.innerHTML = 'El nombre no puede comenzar con dígitos';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;
    } else if (caracter_especial(nombre)) {
        div_error_nombre.innerHTML = 'El nombre no puede contener caracteres especiales (símbolos o acentos)';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;
    } else if (!digitos_final(nombre)) {
        div_error_nombre.innerHTML = 'Los dígitos solo pueden ir al final del nombre';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;
    } else if (nombre.length < 5) {
        div_error_nombre.innerHTML = 'El nombre no puede tener menos de 5 caracteres';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;
    } else if (nombre.length > 10) {
        div_error_nombre.innerHTML = 'El nombre no puede tener más de 10 caracteres';
        div_error_nombre.className = 'text-danger small mt-1';
        input_nombre.classList.add('is-invalid')
        return false;

    } else {
        div_error_nombre.innerHTML = ''
        input_nombre.classList.remove('is-invalid')
        return true;
    }


};

function validar_contraseña() {
    var input_contraseña = document.getElementById('input-contraseña');
    var div_error_contraseña = document.getElementById('error-contraseña')
    var contraseña = input_contraseña.value;
    if (contraseña == '') {
        div_error_contraseña.innerHTML = 'La contraseña es obligatoria';
        div_error_contraseña.className = 'text-danger small mt-1';
        input_contraseña.classList.add('is-invalid')
        return false
    } else if (input_nombre.value !== '' && contraseña.toLowerCase().includes(input_nombre.value.toLowerCase())) {
        div_error_contraseña.innerHTML = 'La contraseña no puede contener el nombre de usuario';
        div_error_contraseña.className = 'text-danger small mt-1';
        input_contraseña.classList.add('is-invalid')
        return false;
    } else if (contraseña.length < 3 || contraseña.length > 6) {
        div_error_contraseña.innerHTML = 'La contraseña debe tener entre 3 y 6 caracteres';
        div_error_contraseña.className = 'text-danger small mt-1';
        input_contraseña.classList.add('is-invalid')
        return false;
    } else if (!tiene_digito(contraseña)) {
        div_error_contraseña.innerHTML = 'La contraseña requiere al menos un dígito';
        div_error_contraseña.className = 'text-danger small mt-1';
        input_contraseña.classList.add('is-invalid')
        return false;
    } else if (!tiene_letra(contraseña)) {
        div_error_contraseña.innerHTML = 'La contraseña requiere al menos una letra';
        div_error_contraseña.className = 'text-danger small mt-1';
        input_contraseña.classList.add('is-invalid')
        return false;
    } else {
        div_error_contraseña.innerHTML = '';
        input_contraseña.classList.remove('is-invalid')
        return true;
    }
};

var pass = document.getElementById('input-contraseña');
var icon = document.querySelector('.bx');

icon.addEventListener("click", e => {
    if (pass.type === 'password') {
        pass.type = 'text';
        icon.classList.add('bx-show-alt');
        icon.classList.remove('bx-hide');
    } else {
        pass.type = 'password';

        icon.classList.remove('bx-show-alt');
        icon.classList.add('bx-hide');
    }
});


function tiene_digito(str) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            return true;
        }
    }
    return false;
}

function tiene_letra(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) {
            return true;
        }
    }
    return false;
}

var input_contraseña = document.getElementById('input-contraseña');


function validar_contraseña2() {
    var contraseña = document.getElementById('input-contraseña').value;
    var confirmar_contraseña = document.getElementById('input-contraseña2').value;
    var valid_contra = document.getElementById('input-contraseña2')
    var div_error_confirmar_contraseña = document.getElementById('error-contraseña2');

    if (contraseña === "") {
        div_error_confirmar_contraseña.innerHTML = 'Primero debe ingresar su contraseña';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1';
        valid_contra.classList.add('is-invalid')
        return false;
    }else if (confirmar_contraseña === '') {
        div_error_confirmar_contraseña.innerHTML = 'Debe confirmar su contraseña';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1';
        valid_contra.classList.add('is-invalid')
        return false;

    } else if (contraseña !== confirmar_contraseña) {
        div_error_confirmar_contraseña.innerHTML = 'Las contraseñas no coinciden';
        div_error_confirmar_contraseña.className = 'text-danger small mt-1';
        valid_contra.classList.add('is-invalid')
        return false;
    } else {
        div_error_confirmar_contraseña.innerHTML = '';
        valid_contra.classList.remove('is-invalid')
        return true;
    };
};

function validar_comuna() {
    var select_comuna = document.getElementById('select-comuna');
    var div_error_comuna = document.getElementById('error-comuna');
    var comuna = select_comuna.value;
    console.log(comuna);

    if (comuna == 'default') {
        div_error_comuna.innerHTML = 'Debe seleccionar una comuna.';
        div_error_comuna.className = 'text-danger small mt-1';
        select_comuna.classList.add('is-invalid')
        return false;
    } else {
        div_error_comuna.innerHTML = '';
        select_comuna.classList.remove('is-invalid')
        return true;
    }
};

function validar_correo() {
    var correo = document.getElementById('input-correo').value;
    var div_error_correo = document.getElementById('error-correo');

    var pos_arroba = correo.indexOf('@');
    var post_punto = correo.lastIndexOf('.');

    var arr_correo = correo.split('.');
    var ext = arr_correo[arr_correo.length - 1];
    if (correo == '') {
        div_error_correo.innerHTML = 'El correo es obligatorio';
        div_error_correo.className = 'text-danger small mt-1';
        return false;
    } else if (pos_arroba > 0 && post_punto > pos_arroba && (ext.length > 1 && ext.length <= 3)) {
        div_error_correo.innerHTML = '';
        return true;
    } else {
        div_error_correo.innerHTML = 'Formato de correo invalido'
        div_error_correo.className = 'text-danger small mt-1'
        return false;
    }

}

function validar_url() {
    var url = document.getElementById('input-url').value.toLowerCase();
    var url1 = document.getElementById('input-url')
    var div_error_url = document.getElementById('error-url');

    var int = true;

    if (url.includes(" ")) {
        div_error_url.innerHTML = 'La URL no puede contener espacios.';
        div_error_url.className = 'text-danger small mt-1 mb-2';
        url1.classList.add('is-invalid')
        return false;
    }

    if (url.trim() === "") {
        div_error_url.innerHTML = '';
        div_error_url.className = '';
        url1.classList.remove('is-invalid')
        return true;
    }


    var http = url.startsWith("http://");
    var https = url.startsWith("https://");
    var www = url.startsWith("www.");
    var punto = url.lastIndexOf('.');

    var extension = url.substring(punto + 1);

    var dominio =  extension.length >= 2 && extension.length <= 6 ;


    if ((!http && !https && !www && ' ') || punto === -1 || !dominio) {
        div_error_url.innerHTML = 'Formato de página web invalido';
        div_error_url.className = 'text-danger small mt-1';
        url1.classList.add('is-invalid')
        int = false;
    } else {
        div_error_url.innerHTML = '';
        div_error_url.className = '';
        url1.classList.remove('is-invalid')
    }

    return int;
}


function mostrarModal() {
    if (validar()) {
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    }
  }


  
  function enviarFormulario() {
    if (validar()) {
      document.getElementById('Form').submit();
    }
  }
  

$('#exampleModal').on('show.bs.modal', function () {
    // Eliminar el modal-backdrop existente
    $('.modal-backdrop').remove();
    
    // Crear y agregar un nuevo modal-backdrop
    $('<div class="modal-backdrop custom-backdrop"></div>').appendTo(document.body);
  });
  

function validar_direccion() {
    var direccion = document.getElementById('input-direccion').value;
    var direccion1 = document.getElementById('input-direccion')
    var div_error_direccion = document.getElementById('error-direccion');
    var valid = true;
    var tieneNumero = false;
    var tieneLetra = false;

    if (direccion.trim() === "") {
        div_error_direccion.innerHTML = 'La dirección es obligatoria';
        div_error_direccion.className = 'text-danger small mt-1';
        direccion1.classList.add('is-invalid')
        return false;
    } else if (direccion.length < 5 || direccion.length > 100) {
        div_error_direccion.innerHTML = 'La dirección debe tener al menos 5 caracteres';
        div_error_direccion.className = 'text-danger small mt-1';
        direccion1.classList.add('is-invalid')
        return false;
    } else {
        for (var i = 0; i < direccion.length; i++) {
            var char = direccion[i];
            var isAlphaNum = (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') ||
                char === 'á' || char === 'é' || char === 'í' || char === 'ó' || char === 'ú' ||
                char === 'Á' || char === 'É' || char === 'Í' || char === 'Ó' || char === 'Ú' ||
                char === 'ñ' || char === 'Ñ' ||
                char === ' ' || char === '.' || char === ',' || char === '-' || char ==='#';

            if (!isAlphaNum) {
                valid = false;
                break;
            }


            if (!isNaN(char)) {
                tieneNumero = true;
            }

            if (isNaN(char) && isAlphaNum) {
                tieneLetra = true;
            }
        }

        // if (!tieneLetra) {
        //     div_error_direccion.innerHTML = 'La dirección debe contener ';
        //     div_error_direccion.className = 'text-danger small mt-1';
        //     return false;
        // }
        if (!valid) {
            div_error_direccion.innerHTML = 'La dirección contiene caracteres inválidos';
            div_error_direccion.className = 'text-danger small mt-1';
            direccion1.classList.add('is-invalid')
            return false;
        } else {

            div_error_direccion.innerHTML = '';
            div_error_direccion.className = '';
            direccion1.classList.remove('is-invalid')
            return true;
        }
    }
}



function validar_telefono() {
    var input_telefono = document.getElementById('input-telefono');
    var div_error_telefono = document.getElementById('error-telefono')
    var telefono = input_telefono.value;
    var prefijo = document.getElementById('select-prefijo').value;
    if (telefono == '') {
        div_error_telefono.innerHTML = 'El teléfono es obligatorio';
        div_error_telefono.className = 'text-danger small mt-1';
        input_telefono.classList.add('is-invalid')
        return false;
    } else if (isNaN(telefono)) {
        div_error_telefono.innerHTML = 'Ingrese valores númericos';
        div_error_telefono.className = 'text-danger small mt-1';
        input_telefono.classList.add('is-invalid')
        return false;
    }


    if (prefijo === "+1" && (telefono.length < 10 || telefono.length > 10)) {
        div_error_telefono.innerHTML = 'El formato de teléfono para EE. UU. debe tener 10 dígitos';
        div_error_telefono.className = 'text-danger small mt-1';
        input_telefono.classList.add('is-invalid')
        return false;
    } else if (prefijo === "+56" && (telefono.length < 9 || telefono.length > 9)) {
        div_error_telefono.innerHTML = 'El formato de teléfono para Chile debe tener 9 dígitos';
        div_error_telefono.className = 'text-danger small mt-1';
        input_telefono.classList.add('is-invalid')
        return false;
    } else if (prefijo === "+58" && (telefono.length < 10 || telefono.length > 10)) {
        div_error_telefono.innerHTML = 'El formato de teléfono para Venezuela debe tener 10 dígitos';
        div_error_telefono.className = 'text-danger small mt-1';
        input_telefono.classList.add('is-invalid')
        return false;
    }

    div_error_telefono.innerHTML = '';
    div_error_telefono.className = '';
    input_telefono.classList.remove('is-invalid')
    return true;
}

function guardarFormulario() {
    var nombre = document.getElementById('input_nombre').value;
    var contraseña = document.getElementById('input_contraseña').value;
    var direccion = document.getElementById('input_direccion').value;
    var url = document.getElementById('input_url').value;
    var telefono = document.getElementById('input_telefono').value;

    
    var datos = {
        nombre: nombre,
        contraseña: contraseña,
        direccion: direccion,
        url: url,
        telefono: telefono
    };
    
    localStorage.setItem('formularioDatos', JSON.stringify(datos));
            

    window.location.href = 'destino.html';

}






