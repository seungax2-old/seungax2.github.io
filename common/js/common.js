$(window).resize(function() {
	window.location.reload()
});

window.onbeforeunload = function(e) {
	alert(window.location.href);
};