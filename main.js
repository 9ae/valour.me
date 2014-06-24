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
	this.title = options.title ||  "";
	this.url = options.url || "";
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.dom = options.dom || null;
}

/* functions */
function setSizes(){
	settings.screen_width = window.innerWidth;
	settings.screen_height = window.innerHeight;
	settings.jar_width = settings.screen_width*0.28;
	settings.jar_padding = settings.screen_width*0.4;
}

/* intialize */
(function(){
	var jqxhr = $.getJSON( "jars.json", function() {
 	 console.log( "success" );
	})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
	jqxhr.complete(function() {
		console.log( "second complete" );
	});
	setSizes();
})();

window.onresize = setSizes();
