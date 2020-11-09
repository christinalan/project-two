
//create a socket namespace
let socket = io('/freq2');

socket.on('connect', () => {
    console.log("connected");



});

socket.on('scoreBoard', () => {
    console.log("scoreBoard");
})

window.addEventListener('load', () => {

    //alert box, emitting username to the server
    let clientName = window.prompt("create a username");
    let clientDate = Date();
    let clientObject = {
        "name" : clientName,
        "date" : clientDate
    };
    socket.emit('clientObject', clientObject)
});



// global variables
let cnv;
let osc, osc1, osc2; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;
let freq1, freq2;
let mouseFreq, mouseAmp;
let button, val;
let mouseFreq1;
let analyzer, waveform, freqAnalyzer, waveFreq;
let clicked;
let x, y;

function setup() {

    // oscillators
    osc = new p5.Oscillator('sine');
    osc1 = new p5.Oscillator('sine');
    osc2 = new p5.Oscillator('sine');

    cnv = createCanvas(windowWidth, windowHeight);
    
    freq1 = random(100, 500);
    freq2 = freq1 * random(0.9,1.1);
    osc1.pan(-1);
    osc1.freq(freq1);
    osc2.freq(freq2);
    console.log(freq2);
    osc2.pan(1);
    
    cnv.mousePressed(playOscillator);
    background(0);

    analyzer = new p5.FFT();
    freqAnalyzer = new p5.FFT();

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

function freqFromMouse() {
    return map(mouseX, 0, width-1, freq2 * 0.9, freq2 *1.1);
}

// function mouseClicked() {
//     playing = !playing;

//     // console.log(abs(freqFromMouse() - freq1).toFixed(2));


//     //sending the score data to the server
//     let score = abs(freqFromMouse() - freq1).toFixed(2);

//     let scoreObject = {
//         "score" : score
//     };
//     socket.emit('score', scoreObject);
    
// }

// function mouseMoved() {

//     waveform = analyzer.waveform();
    
//     osc2.freq(freqFromMouse());

//     if (playing) {

//         osc1.amp(0.5)
//         osc2.amp(0.5)
//         } 
//         else {
        
//         osc1.stop(0.01);
//         osc2.stop(0.01);
//     };
// }


  function draw() {
    noStroke();
    fill(50);
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

function mouseMoved(event) {
    osc2.freq(freqFromMouse());
  
    waveform = analyzer.waveform();
  
    noStroke();
    beginShape();
    for (let i = 0; i < waveform.length; i+=10) {
      let x = map(i, 0, waveform.length - 1, 0, windowWidth);
      var y = map(waveform[i], -0.5, 0.5, 0, windowHeight);
      let col = map(waveform[i], -1, 1, 0, 255)
  
      // stroke(0, 0, i);
      noStroke();
      // noFill();
      vertex(x, y);
  
      fill(255, col, 100, col);
  
      // ellipse(x, y, 2, 2);
    }
    endShape();
  }
  
  function mouseClicked(event) {
    console.log(abs(freqFromMouse() - freq1).toFixed(2));

     //sending the score data to the server
     let score = abs(freqFromMouse() - freq1).toFixed(2);

     let scoreObject = {
         "score" : score
     };
     socket.emit('score', scoreObject);

    playing = !playing;
    clicked = !clicked;
    
    if (clicked) {
      osc1.start();
      osc2.start();
    } else {
      osc1.stop();
       osc2.stop();
    }
    waveform = analyzer.waveform();
    waveFreq = freqAnalyzer.analyze();
  
    // draw the shape of the waveform
    push();
    colorMode(HSL);
    beginShape();
    //  stroke(255);
    strokeWeight(5);
    noFill();
    for (let i = 0; i < waveFreq.length; i++) {
      let angle = map(i, 0, waveFreq.length, 0, 360);
      let amp = waveFreq[i];
      let r = map(amp, 0, 128, 0, 400);
      let x = r * cos(angle);
      let y = r * sin(angle);

      // stroke(200, 255, i);
      stroke(255);
      line(width/2, height/2, x, y);
      vertex(x, y + height / 2);
      vertex(x +width/2, y);

      // let x = map(i, 0, waveFreq.length, 0, width);
      // let y = map(waveFreq[i], -1, 1, -height / 4, height / 4);
      // vertex(x, y + height / 2);
    }
    endShape();
    pop();

  }
  
  
  function drawArt() {
    mouseFreq1 = freqFromMouse();
    console.log(mouseFreq);
    noFill();
    let strokeColor = map(mouseFreq, 100, 800, 0, 255);
    let size = map(mouseFreq, 100, 800, 0, 400);
    // console.log(strokeColor);
    stroke(strokeColor, strokeColor, strokeColor);
    ellipse(width/2, height/2, size);   
  }

function drawPos(data, data, freq2) {
    noFill();
    ellipse(data.x, data.y, freq2);
  }
