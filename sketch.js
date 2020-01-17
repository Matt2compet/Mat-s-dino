let game;
let slider;
let checkInfo;
let showInfo = false;
let sliderFps;
let jump = 0;

function setup() {
 
  checkInfo = createCheckbox('Info', false);
  checkInfo.changed(infoChecked);
  
  slider = createSlider(0, 255, 100);
  sliderFps = createSlider(30, 120, 60);
  
  sliderFps.position(10, 400);
  slider.position(10, 380);
  slider.style('width', '80px');
  sliderFps.style('width', '80px');
  
  game = new GameManager(sliderFps.value());  
}
 
function infoChecked() {
  if (this.checked()) {
    showInfo = true;
  } else {
    showInfo = false;
  }
}
function draw() {
  
  game.draw(slider.value(), showInfo, sliderFps.value());
}

function keyPressed() {
  game.keyPressed(keyCode);
}

