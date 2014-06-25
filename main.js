/* helper functions */

function random(min,max){
    return Math.floor((Math.random() * max) + min);
}


/* global variables */
var settings = {
	screen_width : window.innerWidth,
	screen_height : window.innerHeight,
	jar_width: 0,
	jar_height: 0,
	jar_padding: 0 
};
var jars = [];
var stars = [];

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
         if(obj.selected){
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

/* intialize */
(function(){
    setSizes();
    	
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
            if(jardata.title==='me'){
                jar.select();
            }
    }

})();

window.onresize = setSizes;
