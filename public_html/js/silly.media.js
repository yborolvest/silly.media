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
    function addZero(x) {
      if (x < 10) {
        return x = '0' + x;
      } else {
        return x;
      }
    }
  
    function twelveHour(x) {
      if (x > 12) {
        return x = x - 12;
      } else if (x == 0) {
        return x = 12;
      } else {
        return x;
      }
    }
  
    var h = addZero(twelveHour(date.getHours()));
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
  
    $('#time').text(h + ':' + m + ':' + s)
}

$('.close-button').click(function() {
    var window_id = $(this).attr('data-window-id');
    $('#'+window_id).addClass('hidden');
});

$('.desktop-icon').click(function() {
    var window_id = $(this).attr('data-window-id');
    $('#'+window_id).removeClass('hidden');
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