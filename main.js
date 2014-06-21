document.getElementById('sora').width = window.innerWidth;
document.getElementById('sora').height = window.innerHeight;

function random(min,max){
    return Math.floor((Math.random() * max) + min);
}

var stage = new createjs.Stage('sora');

function tick(evt){
    stage.update();
}

var Xing = {
    minRadius : Math.round(Math.min(window.innerWidth,window.innerHeight)*0.08),
    maxRadius: Math.round(Math.min(window.innerWidth,window.innerHeight)*0.14),
    make: function(x,y){
        var star = new createjs.Shape();
        var rad = random(Xing.minRadius,Xing.maxRadius);
        console.log(x+","+y+" "+rad);
        star.graphics.beginFill("white").drawPolyStar(x,y,rad,5,0.43,0);
        return star;
    }
};

var Box = {
    width: (function(){ return window.innerWidth*0.24; })(),
    padding: (function(){ return window.innerWidth*0.07; })(),
    createAll: function(){
        var boxes = [];
        var h = 100;
        var y = window.innerHeight - h/2;
        for(var i=0; i<3; i++){
            var x = Box.padding+(i*(Box.padding+Box.width));
            var rect = new createjs.Shape;
            rect.graphics.beginFill('black').drawRect(x,y,Box.width,h);
        
            boxes.push(rect);
            stage.addChild(rect);
            
            rect.addEventListener('click',function(evt){ 
                createjs.Tween.get(rect).to({y:0}, 1000, createjs.Ease.linear).call(tick);
              //  createjs.Tween.get(rect).to({y:window.innerHeight-h}, 1000);
            });
        }
        return boxes;
    }
};

/*
for(var i=0; i<10; i++){
    stage.addChild(Xing.make(random(0,window.innerWidth),random(0, window.innerHeight)));
}*/

var boxes = Box.createAll();
createjs.Ticker.addEventListener("tick", tick);

stage.update();

