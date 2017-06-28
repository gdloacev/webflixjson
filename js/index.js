$(document).ready(function(){

	leerJSON();

	$(window).on('online', function(){
		$('#contactForm').show();
		$('video').show();
	});

	$(window).on('offline', function(){
		$('#contactForm').hide();
		$('video').hide();
	});

	poster = localStorage.getItem('poster');
	if (poster != "" && poster != 'undefined'){
		$('video').attr('poster', 'images/' + poster);
	}

	$('video').on('animationend',function(){
		$('video').removeClass('animate');
	});


	$("#btnSinopsis").click(function(e){
		e.preventDefault();
		state = $("#sinopsis").css("visibility");

		newcss = {
			"height": "auto",
			"visibility": "visible"
		};

		oldcss = {
			"height": "0",
			"visibility": "hidden"
		};

		if (state == "visible"){
			$("#sinopsis").css(oldcss);
		}else{
			$("#sinopsis").css(newcss);
		}
	});

	$("#contactForm").submit(function(e){
		e.preventDefault();
		name = $("input[type=text]").val();
		email = $("input[type=email]").val();
		alert("Hola " + name + " tu correo es " + email);
	});

	$("nav ul li a").click(function(e){
		e.preventDefault();
		category = e.target.innerText;
		localStorage.setItem('category',category);
		filterCategory(category);
	});

	$("input[type=text]").change(function(){
		validcss = {
			"border": "3px solid green"
		};

		invalidcss = {
			"border": "3px solid red"
		};

		$("input[type=text]:valid").css(validcss);
		$("input[type=text]:invalid").css(invalidcss);
	});

	$("input[type=email]").change(function(){
		validcss = {
			"border": "3px solid green"
		};

		invalidcss = {
			"border": "3px solid red"
		};

		$("input[type=email]:valid").css(validcss);
		$("input[type=email]:invalid").css(invalidcss);
	});
});

function leerJSON(){
	$.getJSON(
		'json/movies.json',
		function(data){
	        $.each(data, function(i, item) {
	        	if (item.image != null){
		            $("#movies").append("<a href='#'><img src='images/" + item.image + 
		            	"' alt='portada de pelicula' data-title='"+ item.title + 
		            	"' data-category='"+ item.category +"' data-sinopsis='"+ item.sinopsis +"'></a>");
	        	}
	        });
    	},
    false)
    .done(function (){
    	category = localStorage.getItem("category");
    	filterCategory(category);
    	$('img').on('click',function (e){
		   	e.preventDefault();
		   	changePoster(e);
    	});
    });
}

function changePoster(e){
	$('video').attr('poster', e.currentTarget.src);
	$("#sinopsis p").text(e.currentTarget.getAttribute('data-sinopsis'));
	localStorage.setItem('poster',e.currentTarget.src.split("/")[5]);
	$('video').css('display','inline-block');
	$('video').addClass("animate");
}

function filterCategory(category){
	if (category == "" || category == 'undefined' || category == null){
		return;
	}

	$("h3").html(category);
	$('img[data-category!="'+ category +'"]').hide();
	$('img[data-category="'+ category +'"]').show();
	if (category == "Todas"){
		$('#movies img').show();
	}
}