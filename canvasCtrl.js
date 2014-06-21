/* Canvas Toolkit */

var ariCanvas;
var ctx;
var anifunc;

function ariInit(canvasid){
ariCanvas = document.getElementById(canvasid);
ariCanvas.width = document.getElementById("canvasLay").clientWidth;
ariCanvas.height = document.getElementById("canvasLay").clientHeight;
ctx = ariCanvas.getContext('2d'); }

function start(){
ctx.fillStyle="#FFFFFF";
ctx.fillRect(0,0,ariCanvas.width,ariCanvas.height);
ctx.lineCap = "round";
ctx.lineWidth = 5;
anifunc = setInterval(draw,100);
}

var num = 1000; 
var count=0;
var lastPoint =[];
var color = [70,80,90];

function draw(){
if(count==0) lastPoint = [Math.random()*ariCanvas.width,Math.random()*ariCanvas.height];

/* var xory = Math.round(Math.random());
var newX = lastPoint[0]+(Math.random()*100-50)*xory;
var newY = lastPoint[1]+(Math.random()*100-50)*((xory+1)%2);
if(newX<ariCanvas.width && newX>0 && newY<ariCanvas.height && newY>0){
ctx.restore();
ctx.strokeStyle = "rgb("+color[0]+","+color[1]+","+color[2]+")";
ctx.beginPath();
ctx.moveTo(lastPoint[0],lastPoint[1]);
ctx.lineTo(newX,newY); 
ctx.stroke(); 
ctx.closePath();
ctx.save();
colorWheel(); */

var newX = (Math.random()*30-15);
var newY = (Math.random()*30-15);
if(lastPoint[0]+newX<ariCanvas.width && lastPoint[0]+newX>0 && lastPoint[1]+newY<ariCanvas.height && lastPoint[1]+newY>0){
ctx.fillStyle = "rgba("+color[0]+","+color[1]+","+color[2]+","+Math.random()*0.5+")";
ctx.fillRect(lastPoint[0],lastPoint[1],newX,newY);
colorWheel();
lastPoint = [lastPoint[0]+newX,lastPoint[1]+newY];
count++;
}
}

function colorWheel(swi){
var colpox = Math.round(Math.random()*2);
color[colpox]+=10;
for(var i=0; i<3; i++)
	{ if(color[i]>255) color[i]=0; }
}

function stop(){
clearInterval(anifunc);
ctx.clearRect(0,0,ariCanvas.width,ariCanvas.height);
}


