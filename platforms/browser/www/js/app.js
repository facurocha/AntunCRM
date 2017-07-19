document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onDeviceReady, false);

function onDeviceReady() {
	cordova.plugins.autoStart.enable();
	navigator.splashscreen.hide();
}


var url = "http://www.antunpeugeot.com.ar/crm/app/php/";
var usuario = window.localStorage;

$("#footer").html('<div class="col-xs-12 navbar navbar-fixed-bottom"><div class="row" id="bottomNav"><center><div class="col-xs-3"><a href="ver_contactos.html"><i class="glyphicon glyphicon-home"></i><br>APP CRM</a></div></center><center><div class="col-xs-3"><a href="ver_contactos_web.html"><i class="glyphicon glyphicon-search"></i><br>CONSULTAS</a></div></center><center><div class="col-xs-3"><a href="agregar_contactos.html"><i class="glyphicon glyphicon-plus-sign"></i><br> APP CRM</a></div></center><center><div class="col-xs-3"><a onclick="cerrarSesion()"><i class="glyphicon glyphicon-log-out"></i><br>SALIR</a></div></center></div></div>');

var $form = $("form");
$successMsg = $(".alert");
$.validate({
	modules: 'location, date, security, file',
	lang: 'es',
	errorMessageClass: "error",
	onSuccess: function () {
		$successMsg.show();
	}
});

$(".validadorNumero").keypress(function (event) {
	var controlKeys = [8, 9, 13, 35, 36, 37, 39];
	var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
	if (!event.which ||
		(48 <= event.which && event.which <= 57) || ($(this).attr("value")) || isControlKey) {
		return;
	} else {
		event.preventDefault();
	}
});

function Login(email, pass) {
	$.ajax({
		type: "GET",
		url: url + "login.usuario.php",
		data: "email=" + email + "&pass=" + pass,
		async: true,
		dataType: "text",
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			if (data == 1) {
				traerUsuario(email);
			} else {
				$("#mensaje").html("<div class='container'><div class='clearfix'></div><div class='col-xs-12 alert alert-danger' style='display:block'>Datos incorrectos</div></div>");
			}
		}
	});
}

function traerUsuario(email) {
	//alert("traer");
	$.ajax({
		type: "GET",
		url: url + "read.usuario.php",
		data: "email=" + email,
		dataType: 'json',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			usuario.setItem('idUsuario', data[0].id);
			window.location.href = 'ver_contactos.html';
		}
	});
}
 
function eliminarUsuario(id) {
	$.ajax({
		type: "GET",
		url: url + "eliminar.usuario.php",
		data: "id=" + id,
		dataType: 'html',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			window.location.href = 'ver_contactos.html';
		}
	});
}

function modificarUsuario(id) {
	$.ajax({
		type: "GET",
		url: url + "modificar.usuario.php",
		data: "id=" + id,
		dataType: 'html',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			$('#formModificar').html(data);
			$("#botonModificar").show();
			$('#formModificar').show();
		}
	});
}


function modificarUsuarioWeb(id) {
	$.ajax({
		type: "GET",
		url: url + "modificar.usuario.web.php",
		data: "id=" + id,
		dataType: 'html',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			$('#formModificar').html(data);
			$("#botonModificar").show();
			$('#formModificar').show();
		}
	});
}


function traerContactos(id) {
	$.ajax({
		type: "GET",
		url: url + "read.contactos.usuario.php",
		data: "usuario=" + id,
		dataType: 'html',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			$("#contactos").html(data);
		}
	});
}

function traerContactosWeb(id) {
	$.ajax({
		type: "GET",
		url: url + "read.contactos.usuario.web.php",
		data: "usuario=" + id,
		dataType: 'html',
		beforeSend: function () {
			$("#loading").show();
		},
		success: function (data) {
			$("#loading").hide();
			$("#contactos").html(data);
		}
	});
}



function cerrarSesion() {
	usuario.clear();
	window.location.href = 'index.html';
}

/************ GEOTRACKING /********************/