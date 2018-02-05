var data;
$(document).ready(function(){
	nextPost();

	$("#next_btn").click(function() {
		nextPost();
	});

	$("#go_btn").click(function() {
		window.open(data.url);
		nextPost();
	});
});

var nextPost = function() {
	$.getJSON("https://www.reddit.com/r/FiftyFifty/random.json", function(d, status) {
		data = d[0].data.children[0].data;
		// console.log(data.id);
		// console.log(data.domain);
		// console.log(data.link_flair_text);
		// console.log(data.title);
		// console.log(data.ups);
		// console.log(data.upvote_ratio);
		console.log(data.url);
		// console.log(data.visited);
	}).done( function() {
		$("#the_link").show();
		$("#the_result").hide();

		$("#the_link").click(function(){
    		//$("#the_link").hide();
    		window.open(data.url);
    		//$("#the_result").show();
		});
		var splitedTitle = splitTitle(data.title.replace("[50/50] ",""));

		$("#first").html(splitedTitle[0]);
		$("#second").html(splitedTitle[1]);
	});
}

var splitTitle = function(title) {
	var splitHolder = title.split("|");
	return splitHolder;
}


var linkHandling = function(link) {
	console.log(getRedirectsToUri(link));
	var embed = "<iframe src=\"" + link + "\"></iframe";
	$("#the_result").html(embed);
	// if (link.contains("youtube")) {
	// 	var ending = link.substring(link.indexOf("?v=") + 3);
	// 	//console.log(ending);
	// 	//var embed = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/p0jDmbS3QPg\" frameborder=\"0\"; encrypted-media\"></iframe>";
	// }
}
function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

//USAGE:

var el = document.getElementById('next_btn');
swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
    console.log(swipedir);
    if (swipedir == "none") {
    	nextPost();
    }
});