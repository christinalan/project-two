let socket = io('/mod');

socket.on('connect', () => {
    console.log("connected");
});

let freqButton = document.getElementById('send-freq')
let playButton = document.getElementById('play-button');
let scoreButton = document.getElementById('get-all-scores');
let sonicParty = document.getElementById('all-play');

let cnv;
let osc; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;
let osc1, osc2, freq1, freq2;
let newplay;
let freqAnalyzer;
let x, y;

window.addEventListener('load', () => {
    
    freqButton.addEventListener("click", () => {
        freq = random(100, 500);
        osc.freq(freq);
        console.log(freq);

        let freqData = {
            "freq" : freq
        };
        socket.emit('freqData', freqData)
    })
    
    playButton.addEventListener("click", () => {
        playing = !playing;

        if (playing) {
        osc.start();
        playButton.style.background = "lawngreen";
        playButton.innerHTML = "Play";
        }
        else {
            osc.stop();
            playButton.style.background = "crimson";
            playButton.innerHTML = "Pause";
        }
    })

        //listen for data from the server
        scoreButton.addEventListener("click", () => {
            socket.on('modBoard', (data) => {
                let scoreBoardBox = document.getElementById('score');
    
                for (let i = 0; i< data.length; i++) {
                    let receivedMsg = data[i].name + ": " + data[i].score;
                    let msgEl = document.createElement('p');
                    msgEl.innerHTML = receivedMsg;
        
                    //add this element to the page
                    scoreBoardBox.appendChild(msgEl);
                }
            })
        })

    sonicParty.addEventListener("click", () => {

            newplay = !newplay;

        if (newplay) {
            osc1.freq(freq1);
            osc2.freq(freq2);
            osc1.pan(-1);
            osc2.pan(1);
            osc1.start();
            console.log(osc1);
            osc2.start(1);
            sonicParty.style.background = "coral";
            sonicParty.innerHTML = "Sonic Party";
            }
            else {
                osc1.stop();
                osc2.stop();
                sonicParty.style.background = "white";
                sonicParty.innerHTML = "Party Off";
            }
       
    })
    
});

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    // cnv.mousePressed(playOscillator);
    background('pink');

    osc = new p5.Oscillator('triangle');
    osc1 = new p5.Oscillator();
    osc2 = new p5.Oscillator();
    freqAnalyzer = new p5.FFT();

    socket.on('modFreq', (data) => {
        // console.log(data)
        for (let i = 0; i< data.length; i++) {
            freq1 = data[i].osc1.f;
            freq2 = data[i].osc2.f;
        }
    })

}


// function draw() {
//     socket.on('artData', (data) => {
//         for (let i = 0; i < data.length; i++) {
//             x = data[i].x;
//             y = data[i].y;
//         }
//     })
//     waveFreq = freqAnalyzer.analyze();
//     beginShape();
//     strokeWeight(5);
//     noFill();
//       for (let i = 0; i < waveFreq.length; i++) {
//         // let angle = map(i, 0, waveFreq.length, 0, 360);
//         let amp = waveFreq[i];
//         // let r = map(amp, 0, 128, 0, 400);
//         // let x = r * cos(angle);
//         // let y = r * sin(angle);
//         let col = map(i, 0, waveFreq.length, 0, 255);
  
//         if (amp != 0) {
//         // stroke(200, 255, i);
//         stroke(constrain(col, 100, 255), 255, 125, 150);
//         line(width/2, height/2, x, y);
//         vertex(x, y + height / 2);
//         vertex(x +width/2, y);
//         ellipse(x, y, amp);
//         }
//       }
//       endShape();
// }
