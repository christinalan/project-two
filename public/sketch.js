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
let freq1, amp2;

// let button, val;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    background('lightblue');
    

    osc = new p5.Oscillator('triangle');

}
function playOscillator() {
    osc.start();
    osc.amp(amp1);
    // start at 700Hz
    osc.freq(freq1);
    // ramp to 60Hz over 0.7 seconds
    osc.freq(60, 5);
    osc.amp(0, 0.1, 0.2);
}

function mousePressed () {

    let data = {
        x : mouseX,
        y : mouseY
    }

    ellipse(mouseX,mouseY,20,20);

    socket.emit('data', data);
    
}


  function draw() {


    freq1 = constrain(map(mouseX, 0, width, 50,700), 50,700);
    amp1 = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    textSize(16)
    text('Tap to Toggle ', width/2, 43);


    
    if (mouseIsPressed) {
        playing = !playing;
    }

    if (playing) {
        button = createButton('On');
        button.position(width/2 + 95, 15);
        button.style('background-color', "green");
        
     
    } 
    else {
        val = "red";
        button = createButton('Off');
        button.position(width/2 + 95, 15);
        button.style('background-color', "red");
        // osc.amp(0, 0.5);
    }
}

// function playOscillator() {
//     osc.start();

// }


// let value = 0;
// function keyPressed() {
//     if (value === 0) {
//         console.log("spacebar pressed");
//     }
// }