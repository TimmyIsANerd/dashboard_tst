// tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Initialize the plugin
const qs = new PerfectScrollbar(".sidebar-menu");

jQuery(document).on("click", "#sidebarCollapse", function () {
    jQuery("body").toggleClass("sidebar-main");
});

// JavaScript for label effects only

$(document).on('focusout', '.custom-form textarea, .custom-form input', function() {
    if($(this).val() != "") {
        $(this).parent().addClass("not-empty");
    } else {
        $(this).parent().removeClass("not-empty");
    }
});

// searchable dropdown 
$('.autocomplete input').focus(function(){
  $(".dropdown-menu").addClass('show');
});

$('.dropdown-item').click(function(){
    let a =$(this).html();
    $('.autocomplete input').val(a);
    $(".dropdown-menu").removeClass('show');
});

// Audio JS
// Audio JS
var play_music_button = document.getElementsByClassName("playPause");
var pause_music_button = document.getElementsByClassName("playPause");

function playAudio(buttonId, id) {
    for (j = 0; j < pause_music_button.length; j++) {
        var pauseId = pause_music_button[j].getAttribute('data-id');
        var pauseButtonId = pause_music_button[j].getAttribute('id');
        if(id != pauseId) {
            var pauseAudio = document.getElementById(pauseId);
            pauseAudio.pause();
            pauseAudio.currentTime = 0;
            document.getElementById(pauseButtonId).innerHTML = '<em class="btn-play-icon"></em>';
        }
    }
    
    var audio = document.getElementById(id);
    if(audio.paused){
        audio.play();
        document.getElementById(buttonId).innerHTML = '<em class="btn-pause-icon"></em>';
    }
    else{
        audio.pause();
        document.getElementById(buttonId).innerHTML = '<em class="btn-play-icon"></em>';
    }
    audio.addEventListener('ended',function() {
      document.getElementById(buttonId).innerHTML = '<em class="btn-play-icon"></em>';
    });
}

$(document).ready(function() {

    for (i = 0; i < play_music_button.length; i++) {
        play_music_button[i].addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            var buttonId = this.getAttribute('id');
            playAudio(buttonId, id);
        });
    }
    
});

$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		slideTransition: 'linear',
		autoplaySpeed: 6000,
		smartSpeed: 6000,
		center: true,
		margin:22,
		dots: false,
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			600: {
				items: 2,
				nav: true
			},
			992:{
				items: 3,
				nav: true
			},
			1300: {
				items: 4,
				nav: true
			},
			1500: {
				items: 4,
				nav: true
			},
		}
	});
	$('.owl-carousel').trigger('play.owl.autoplay',[2000]);
	function setSpeed(){
		jQuery('.owl-carousel').trigger('play.owl.autoplay',[6000]);
	}
	$('.owl-nav').css('display','none');
	setTimeout(setSpeed, 1000);
});

$(document).ready(function(){
    $('.custom-form').submit(function(e){
        
        e.preventDefault(); 
        var form = $(this);
        var url = form.attr('action');
    
        $.ajax({
           type: "POST",
           url: url,
           data: form.serialize(), // serializes the form's elements.
           success: function(data) {
               console.log(data);
               var obj = JSON.parse(data);
               if(obj.error == 'ok') {
                   toastr.success('Email successfully sended.');
               }
               else {
                   toastr.error(obj.error);
               }
               form[0].reset();
           }
         });

    });
});