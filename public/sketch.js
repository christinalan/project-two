window.addEventListener('load', () => {

});

let socket = io();

socket.on('connect', () => {
    console.log("connected");
});

let cnv;
let osc; //base oscillator
let button;
// let modulator; // oscillator will modulate frequency of the base osc
let playing;
let freq, amp;

// let button, val;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    background('lightblue');

    osc = new p5.Oscillator('sin');

    //listen for messages from the server
    socket.on('data', function(obj) {
        console.log(obj);

        playOscillator(obj);
        osc.amp(obj.amp)
        osc.freq(obj.freq);
        drawPos(obj);
    })

}

function playOscillator(freq, amp) {
    osc.start();
    freq = constrain(map(mouseX, 0, width, 50,700), 50,700);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
}

function mouseMoved() {

    if (playing) {
    let data = {
        freq : mouseX,
        amp : mouseY
    }


    socket.emit('data', data);
        }

    }


  function draw() {


    // freq = constrain(map(mouseX, 0, width, 50,700), 50,700);
    // amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    textSize(16)
    text('Tap to Toggle ', width/2, 43);


    
    if (mouseIsPressed) {
        playing = !playing;

        // let playState = {
        //     play : true,
        // }

        // socket.emit('bool', playState)
    }

    if (playing) {
        button = createButton('On');
        button.position(width/2 + 95, 15);
        button.style('background-color', "green");
        
        osc.amp(amp);
        osc.freq(freq);

     
    } 
    else {
        val = "red";
        button = createButton('Off');
        button.position(width/2 + 95, 15);
        button.style('background-color', "red");

        osc.freq(60, 5);
        osc.amp(0, 0.5);
    }
}

function drawPos(pos) {
    fill(0);
    ellipse(pos.freq, pos.amp, 20, 20);
  }