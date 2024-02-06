var audioFiles = {};
var audioContext = new (window.AudioContext || window.webkitAudioContext)(); 
var analyser = audioContext.createAnalyser(); 
var data = new Uint8Array(analyser.frequencyBinCount); 

document.getElementById('audioLoader').addEventListener('change', function(evt) {
    var soundboard = document.getElementById('soundboard');
    var files = evt.target.files; 

    for (var i = 0; i < files.length; i++) {
        var file = URL.createObjectURL(files[i]); 
        var btn = document.createElement('button'); 
        var fileName = files[i].name;
        btn.textContent = fileName.slice(0, fileName.lastIndexOf('.')); 

        
        var audio = new Audio(file);
        audio.volume = localStorage.getItem(fileName) / 100 || 1;
        audioFiles[files[i].name] = audio;

        
        var source = audioContext.createMediaElementSource(audio);
        var gainNode = audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(analyser);
        gainNode.connect(audioContext.destination);

        btn.addEventListener('click', (function(audio) {
            return function() {
                audio.play();

               
                 requestAnimationFrame(function drawMeter() {
                    analyser.getByteFrequencyData(data);
                
                    var volume = 0;
                    for (var i = 0; i < data.length; i++) {
                        volume += data[i];
                    }
                    volume /= data.length;
                
                    var canvas = document.getElementById('meter');
                    var context = canvas.getContext('2d');
                    context.clearRect(0, 0, canvas.width, canvas.height);
                
            
                    var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
                    gradient.addColorStop(0, 'red');
                    gradient.addColorStop(0.5, 'yellow');
                    gradient.addColorStop(1, 'green');
                    context.fillStyle = gradient;
                
                    
                    var dB = Math.round(20 * Math.log10(volume / 255));
                
                    
                    var minDB = -100; 
                    var maxDB = 0; 
                    var minPos = 0; 
                    var maxPos = canvas.width; 
                    var pos = ((dB - minDB) / (maxDB - minDB)) * (maxPos - minPos) + minPos;
                
                    context.fillRect(0, 0, pos, canvas.height);
                
                   
                    document.getElementById('dB').textContent = dB + ' dB';
                
                    requestAnimationFrame(drawMeter);
                });
                
            };
        })(audio));

        
        var volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 100;
        volumeSlider.value = localStorage.getItem(fileName) || 100;
        volumeSlider.addEventListener('input', (function(audio, fileName) {
            return function() {
                audio.volume = this.value / 100;
                localStorage.setItem(fileName, this.value);
            };
        })(audio, fileName));

        var control = document.createElement('div');
        control.className = 'control';
        control.appendChild(btn);
        control.appendChild(volumeSlider);
        soundboard.appendChild(control); 
    }
});
