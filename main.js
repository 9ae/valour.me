                                /* helper functions */

function random(min,max){
    return Math.floor((Math.random() * max) + min);
}


jQuery.fn.calcbox = function(){
    var box = {};
   var offset = $(this).offset();
   box.x = offset.left;
   box.y = offset.top;
   box.w = $(this).width();
   box.h = $(this).height();
   box.c = {'x': box.x+(box.w/2) , 'y': box.y+(box.h/2)};
   return box;
};

/* global variables */
var settings = {
	screen_width : window.innerWidth,
	screen_height : window.innerHeight,
	jar_width: 0,
	jar_height: 0,
	jar_padding: 0 ,
	max_width: 3840,
	max_height:2160
};
var jars = [];
var stars = [];
/* 0 = jar selectable
 1 = star detail */
var click_mode = 0; 

/* objects */
function Jar(options){
	this.id = options.id ||  "";
	this.selected = false;
}

Jar.prototype.select = function(){
    this.selected = true;
    $('#'+this.id).animate({'top':'0'},500, 'linear', function(){
        //TODO: take out stars
    });
};

Jar.prototype.deselect = function(){
    this.selected = false;
    $('#'+this.id).css('top',(settings.jar_width*0.4)+'px');
    
    //TODO: put away stars
};

function Star(options){
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.id = options.id || "";
    this.selected = false;
}

Star.prototype.select = function(){
    this.selected = true;
    $('#star_detail').show();
    var star = $('#'+this.id).detach();
    $('#star_detail').prepend(star);
    $('#'+this.id).animo({animation: "spinner", iterate: "infinite"});
    $('#stars_layer img').animo('blur', {duration: 1, amount: 20});
      $('#jars_layer img').animo('blur', {duration: 1, amount: 20});

    var place = $('#'+this.id).calcbox();
    $('#'+this.id).animate({'top':place.h/2, 'left':place.w/2}, 1000, function(){
        $('#'+this.id).animo("cleanse");
    });
    click_mode = 1;
    $('#star_detail button.close').click(this.deselect);
};

Star.prototype.deselect = function(){
    this.selected = false;
	$('#'+this.id).animo("cleanse");
	var star = $('#'+this.id).detach();
	$('#stars_layer').append(star);
	$('#star_detail').hide();
	$('#stars_layer img').animo("cleanse");
	$('#'+this.id).css('left',this.x+'px');
	$('#'+this.id).css('top',this.y+'px');
	$('#jars_layer img').animo("cleanse");
$('#star_detail button.close').unbind('click');
click_mode = 0;	

};

/* functions */
function setSizes(){
	settings.screen_width = window.innerWidth;
	settings.screen_height = window.innerHeight;
	settings.jar_width = settings.screen_width*0.16;
	settings.jar_padding = settings.screen_width*0.13;
	
	console.log(settings.jar_width+' '+settings.jar_padding);
	for(var i=0; i<jars.length; i++){
        var img = $('#'+jars[i].id);
        img.css('width',settings.jar_width+'px');
        img.css('margin-left',settings.jar_padding+'px');
        if(!jars[i].selected){
            img.css('top',(settings.jar_width*0.4)+'px');   
        }
	}
}

function addJar(obj, jq){
     $('#jars_layer').append(jq);
     jars.push(obj);
     
     jq.click(function(evt){
         if(obj.selected || click_mode==1){
             return;
         }
         
         var prevJar = getSelectedJar();
         if(prevJar!==null){
             prevJar.deselect();
         }
         
         obj.select();
     });
}

function findJar(id){
    var result = null;
    for(var i=0; i<jars.length; i++){
        if(jars[i].id===id){
            result = jars[i];
            break;
        }
    }
    return result;
}

function getSelectedJar(){
        var result = null;
    for(var i=0; i<jars.length; i++){
        if(jars[i].selected){
            result = jars[i];
            break;
        }
    }
    return result;
}

function makeJars(){
    var img_prefix = 'images/';
    if(settings.jar_width>500){
        img_prefix = 'images/half';
    }
    
    var jarsLen = data.jars.length;
    for(var i=0; i<jarsLen; i++){
        var jardata = data.jars[i];
        
        var imgURL = img_prefix+jardata.url;
         var img = $('<img src="'+imgURL+'"/>');
         img.addClass('jar');
             var id = 'jar_'+jardata.title;
             img.attr('id',id);
             img.css('width',settings.jar_width+'px');
             img.css('height','auto');
             img.css('margin-left',settings.jar_padding+'px');
             img.css('top',(settings.jar_width*0.4)+'px');
             var jar = new Jar({id:id});
             addJar(jar,img);
            if(jardata.title==='software'){
                jar.select();
            }
    }
}

function addStar(obj, jq){
     $('#stars_layer').append(jq);
     stars.push(obj);
     
     jq.click(function(evt){
         console.log(obj.id+' click');
         if(obj.selected || click_mode==1){
             return;
         }
         var prevStar = getSelectedStar();
         if(prevStar!=null){
             prevStar.deselect();
         }
         obj.select();
     });
}

function getSelectedStar(){
    var result = null;
    for(var i=0; i<jars.length; i++){
        if(stars[i].selected){
            result = stars[i];
            break;
        }
    }
    return result;
}

function makeStars(){
    var half = false;
    var img_prefix;
    if(settings.screen_width<(settings.max_width/2)){
        half = true;
        img_prefix = 'images/halfstar-';
    } else {
        img_prefix = 'images/star-';
    }
    
    var xFactor = (settings.screen_width/(settings.max_width/2));
    var yFactor = (settings.screen_height/(settings.max_height/2));
    
    for(var i in data.stars){
        console.log(i);
        var starsLen = data.stars[i].length;
        for(var j=0; j<starsLen; j++){
            var stardata = data.stars[i][j];
            var url = img_prefix+stardata.title+'.png';
                var img = $('<img src="'+url+'" />');
                img.addClass('star');
                var id = "star_"+stardata.title;
                img.attr('id',id);
                
                img.css('z-index',(100+j));
                var left = stardata.x;
                var top = stardata.y;
                if(half){
                    left *= 0.5*xFactor;
                    top *= 0.5*yFactor;
                }
                img.css('left',left+'px');
                img.css('top',top+'px');
               // img.css('transform','scale('+xFactor+','+yFactor+')');
                var star = new Star({'id':id, 'x':left, 'y':top});
                addStar(star,img);
                img.load(function(){
                    console.log(this);
                    var w = $(this).width()*xFactor;
                    var h = $(this).height()*yFactor;
                    $(this).css('width', w +'px');
                    $(this).css('height', h +'px');
                });
        } //end of stars
    } // end of grouping
    
}

/* intialize */
(function(){
    setSizes();
    
    //stars imit
    makeJars();
    
    // stars init
    makeStars();

})();

window.onresize = setSizes;

                            