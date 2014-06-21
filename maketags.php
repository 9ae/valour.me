<html>
<head>
<script type="text/javascript" src="ui/js/jquery-1.8.3.js"></script>
<script  type="text/javascript">
var temp=null;

function uniquetize(data){
var uniqueTags = [];
var mist = $('mist');
$(data).find('tag').each(function(i){
uniqueTags.push($(this).attr('name'));
});
uniqueTags = $.unique(uniqueTags);
return uniqueTags;
}

function getGalleryTags(){
$.get('gallery.xml',function(data){
temp = uniquetize(data); },"xml");
}

function getProjectTags(){
$.get('projects.xml',function(data){
temp = uniquetize(data);
 },"xml");
}

</script>
</head>
<body>

<input type="button" value="Gallery Tags" onclick="getGalleryTags()" />
<input type="button" value="Project Tags" onclick="getProjectTags()" />
<br/>

<textarea id="output"></textarea>
<div id="mist">

</div>


</body>
</html>
