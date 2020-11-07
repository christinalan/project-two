// window.addEventListener('load', () => {

// });

let socket = io('/freq1');

socket.on('connect', () => {
    console.log("connected");
});

let cnv;
let osc; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;

let button, val;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    // getAudioContext().suspend();
    
    cnv.mousePressed(playOscillator);
    background('lightblue');

<<<<<<< Updated upstream:public/sketch.js
    osc = new p5.Oscillator('triangle');
}

function draw() {

    freq = constrain(map(mouseX, 0, width, 100, 600), 100, 600);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    textSize(16)
    text('Tap to Toggle ', width/2, 43);
6

    
    if (mouseIsPressed) {
        playing = !playing;
    }
=======
    osc = new p5.Oscillator('sine');

    //listen for messages from the server
    socket.on('data', function(obj) {
        playOscillator(obj);
        osc.amp(obj.amp)
        osc.freq(obj.freq);
        // drawPos(obj);
    })

}

function playOscillator() {
    osc.start();

}

function mousePressed() {
    // getAudioContext().resume();
    playing = !playing;


}

function mouseMoved() {

    if (playing) {
        freq = constrain(map(mouseX, 0, width, 50,1000), 50,1000);
        amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
        osc.amp(amp);
        osc.freq(freq);
    
        
        let data = {
                freq : mouseX,
                amp : mouseY
            }
        
            socket.emit('data', data);
        } 
        else {
        
        osc.stop(0.01);
        }
       

    }


  function draw() {

    textSize(16)
    text('Tap to Toggle ', width/2, 43);
>>>>>>> Stashed changes:public/freq1/sketch.js

    if (playing) {
        button = createButton('On');
        button.position(width/2 + 95, 15);
        button.style('background-color', "green");
<<<<<<< Updated upstream:public/sketch.js
        // playOscillator();
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);
    } 
    else {
=======
    } else {
>>>>>>> Stashed changes:public/freq1/sketch.js
        val = "red";
        button = createButton('Off');
        button.position(width/2 + 95, 15);
        button.style('background-color', "red");
<<<<<<< Updated upstream:public/sketch.js
        osc.amp(0, 0.5);
    }
}

function playOscillator() {
    osc.start();
    // playing = true;

}

let value = 0;
function keyPressed() {
    if (value === 0) {
        console.log("spacebar pressed");
    }
}
=======
    }
}

// function drawPos(pos) {
//     noFill();
//     ellipse(pos.freq, pos.amp, 20, 20);
//   }
>>>>>>> Stashed changes:public/freq1/sketch.js
