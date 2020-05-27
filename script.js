var t = 0;
var rate = 0.005;

var get_mouse_pos = false;
var get_touch_pos = false;

var x_touch = 0;
var y_touch = 0;

var fps, fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(60);

function draw() {
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  
  let n = 20;
  let d = 10;
  let w = n*d;
  
  for (let i = 0; i < canvas.width/w ; i++) {
    for (let j = 0; j < canvas.height/w ; j++) {
      let distance = Math.sqrt((w*(i+0.5) - x_touch)**2 + (w*(j+0.5) - y_touch)**2);
      tile(ctx, n, d, w*i - 10, w*j - 10, 0.02*distance*t);
    }
  }
  
  t += rate;
  
  
        canvas.addEventListener('mousedown', e => {
        get_mouse_pos = true;
        getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
        get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
          if(get_mouse_pos) {
            getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
            get_touch_pos = false;
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
}


function tile(ctx, n, d, x, y, p) {
  for(i=20;i<n*n;i++) {
    let k=i%n+1;
    let j=(i-k)/n;
    let s=.3*(j*k+n*n)+20 + p;
    ctx.fillRect(x + d*j, y + d*k, d*Math.sin(s+t), d*Math.cos(s+t))
  }
}

function getMousePosition(canvas, event) {
    x_touch = event.clientX;
    y_touch = event.clientY;
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    x_touch = touch.clientX;
    y_touch = touch.clientY;   
}

function startAnimating(fps) {
    
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   
   animate();
}

function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();  
    }
}