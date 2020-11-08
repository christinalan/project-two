// window.addEventListener('load', () => {

// });

let socket = io('/freq1');

socket.on('connect', () => {
    console.log("connected");
});

let cnv;
let osc, osc1, osc2; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let drawing, playing;
let freq, amp;
let freq1, freq2;
let mouseFreq;

let button, val;
let volumeSlider, sliderX;

function setup() {
    getAudioContext().suspend();

    amp = new p5.Amplitude();

    osc = new p5.Oscillator('sine');
    osc1 = new p5.Oscillator('sine');
    osc2 = new p5.Oscillator('sine');

    cnv = createCanvas(windowWidth, windowHeight);
    
    freq1 = random(100, 800);
    freq2 = freq1 * random(0.9,1.1);
    osc1.pan(-1);
    osc1.amp(1);
    osc1.freq(freq1);
    osc2.freq(freq2);
    osc2.pan(1);
    osc2.amp(1);
    
    // cnv.mousePressed(playOscillator);
    background('lightblue');

    //listen for messages from the server
    // socket.on('data', function(obj) {
    //     playOscillator(obj);
    //     osc.amp(obj.amp)
    //     osc.freq(obj.freq);
    //     drawPos(obj);
    // })

    button = createButton('play');
    button.mousePressed(togglePlaying);
    button.position(width/2, 20);
    sliderX = width/2 + 50;
    volumeSlider = createSlider(0, 255, 255, 1);
    volumeSlider.position(sliderX, 20);
}

function playOscillator() {
    osc1.start();

    osc2.start(1);
    osc1.amp(volumeSlider.value());
    osc2.amp(volumeSlider.value());
    console.log(volumeSlider.value());
}

function freqFromMouse(freq2) {
    mouseFreq = map(mouseX, 0, width-1, freq2 * 0.9, freq2 *1.1);
}



function mouseClicked() {

    userStartAudio();

    drawing = !drawing;

    console.log(abs(mouseFreq - freq1).toFixed(2));

}

function togglePlaying() {
    if (!playing) {
        playOscillator();
        button.html("pause");
        playing = true;
    
    } else {
        playing = false
        osc1.stop();
        osc2.stop();
        button.html("play");
    }
}

function mouseMoved() {
    if (playing) {
        osc2.freq(mouseFreq);
        // console.log(freq2)
        // osc2.freq(freqFromMouse());
    
        let data = {
                freq : mouseFreq,
                x : mouseX,
                y : mouseY
            }
        
            socket.emit('data', data);
        } 
        // else {
        
        // osc1.stop(0.01);
        // osc2.stop(0.01);
        // }

    if (drawing) {
        drawPos(mouseX, mouseY, freq2);
        freqFromMouse(freq2);
       
    }
}

  function draw() {

    // textSize(16)
    // text('Tap to Toggle ', width/2, 43);

    // if (playing) {
    //     button = createButton('On');
    //     button.position(width/2 + 95, 15);
    //     button.style('background-color', "green");
    // } else {
    //     val = "red";
    //     button = createButton('Off');
    //     button.position(width/2 + 95, 15);
    //     button.style('background-color', "red");
    // }


}

function drawPos(mouseX, mouseY, freq2) {
    noFill();
    ellipse(mouseX, mouseY, freq2);
  }
