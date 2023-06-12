//mailconfirm
$( document ).ready(function() {
    
    if (window.location.search === '?email=success') {
        var window_id = 'emailConfirm';
        $('#'+window_id).css('display','block');
            setTimeout(function() {
        $('#'+window_id).removeClass('hidden')
        }, 50);
    }
});


var $draggable = $('.draggable').draggabilly({
    containment: '.desktop',
    handle: '.window-buttons'
  })

$(document).ready(function() {
    clockUpdate();
    setInterval(clockUpdate, 1000);
  })
  
  function clockUpdate() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + " " + session;
  
    $('#time').text(time)
}

$('.close-button').click(function() {
    var window_id = $(this).attr('data-window-id');
    $('#'+window_id).addClass('hidden');
    setTimeout(function(){
        $('#'+window_id).css('display','none') 
    }, 300);
});

$('.desktop-icon').click(function() {
    var window_id = $(this).attr('data-window-id');
    $('#'+window_id).css('display','block');
    setTimeout(function() {
        $('#'+window_id).removeClass('hidden')
    }, 50);
});

var main = document.querySelector('main'),
	canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	idx = 0,
	count = ul.childElementCount - 1,
	toggle = true,
	frame;

// Set canvas size
canvas.width = ww / 3;
canvas.height = (ww * 0.5625) / 3;

// Generate CRT noise
function snow(ctx) {

	var w = ctx.canvas.width,
		h = ctx.canvas.height,
		d = ctx.createImageData(w, h),
		b = new Uint32Array(d.data.buffer),
		len = b.length;

	for (var i = 0; i < len; i++) {
		b[i] = ((255 * Math.random()) | 0) << 24;
	}

	ctx.putImageData(d, 0, 0);
}

function animate() {
	snow(ctx);
	frame = requestAnimationFrame(animate);
};

