let socket = io('/freq2');

socket.on('connect', () => {
    console.log("connected");
});

let cnv;
let osc, osc1, osc2; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;
let freq1, freq2;
let mouseFreq, mouseAmp;

let button, val;

function setup() {

    socket.on('data', data => {
        // console.log(data.freq);
        freq2 = data.freq
        drawPos(data, data, freq2);
        // osc2.freq(freq2);
        freqFromMouse(freq2);
    })


    osc = new p5.Oscillator('sine');
    osc1 = new p5.Oscillator('sine');
    osc2 = new p5.Oscillator('sine');

    cnv = createCanvas(windowWidth, windowHeight);
    
    freq1 = random(100, 800);
    // freq2 = freq1 * random(0.9,1.1);
    osc1.pan(-1);
    osc1.freq(freq1);
    // osc2.freq(freq2);
    // console.log(freq2);
    osc2.pan(1);
    
    cnv.mousePressed(playOscillator);
    background('lightblue');

    //listen for messages from the server
    // socket.on('data', function(obj) {
    //     console.log(obj);
    //     playOscillator(obj);
    //     osc.amp(obj.amp)
    //     osc.freq(obj.freq);
    //     drawPos(obj);
    // })

}

function playOscillator() {
    osc1.start();

    osc2.start(1);

}

function freqFromMouse(freq2) {
    mouseFreq = map(mouseX, 0, width-1, freq2 * 0.9, freq2 *1.1);
}

function mouseClicked() {
    playing = !playing;

    console.log(abs(mouseFreq - freq1).toFixed(2));
}

function mouseMoved() {

    if (playing) {

        drawPos(data, data, freq2);
        osc2.freq(mouseFreq);
        console.log(mouseFreq)
        // osc2.freq(freqFromMouse());
    
        // let data = {
        //         freq : mouseX,
        //         amp : mouseY
        //     }
        
        //     socket.emit('data', data);
        } 
        else {
        
        osc1.stop(0.01);
        osc2.stop(0.01);
        }
       

    }


  function draw() {

    textSize(16)
    text('Tap to Toggle ', width/2, 43);


    if (playing) {
        button = createButton('On');
        button.position(width/2 + 95, 15);
        button.style('background-color', "green");
    } else {
        val = "red";
        button = createButton('Off');
        button.position(width/2 + 95, 15);
        button.style('background-color', "red");
    }
}

function drawPos(data, data, freq2) {
    noFill();
    ellipse(data.x, data.y, freq2);
  }