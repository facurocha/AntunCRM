document.addEventListener("deviceready", GeoTracking, false);
document.addEventListener("pause", GeoTracking, false);
//document.addEventListener("resume", GeoTracking, false);
//document.addEventListener("resume", onResume, false);

var options = {
	enableHighAccuracy: true,
	maximumAge: 0
};

function success(pos) {
	var crd = pos.coords;
	if (localStorage.getItem('geo') != (crd.latitude + " " + crd.longitude)) {
		localStorage.setItem('geo', crd.latitude + " " + crd.longitude);
		//alert(crd.latitude + " " + crd.longitude);
		ProcesarGeo(crd.latitude, crd.longitude);
	}
};

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
};

function GeoTracking() {
	try {
		if (navigator.geolocation !== null) {
			navigator.geolocation.getCurrentPosition(success, error, options);
		}
	} catch (e) {
		//alert(e.message);
	}
}

function ProcesarGeo(latUser, longUser) {
	var lat = latUser;
	var lon = longUser;
	var user = localStorage.getItem("idUsuario");
	$.ajax({
		type: "GET",
		url: "http://antunpeugeot.com.ar/crm/app/php/insert.geolocation.php",
		data: "lat=" + lat + "&long=" + lon + "&user=" + user,
		success: function (html) {
			//console.log(html);
		}
	});
	return false;
}

setInterval(function () {
	GeoTracking();
}, 5000);