/*
clickTouch.js v0.1
Shawn Khameneh
MIT License
*/

var clickTouch = function(){
	var isDown = false;
	
	function createEvent(mouseEvent, name) {
		var myEvent = document.createEvent('CustomEvent');
		myEvent.initEvent(name, true, true);
		myEvent.changedTouches = [mouseEvent];
		myEvent.identifier = 'mouse';

		(mouseEvent.target?mouseEvent.target:document).dispatchEvent(myEvent);
	}
	
	return {
		init: function(preventDefault) {
			function mousedown(event){
				if(preventDefault)
					event.preventDefault();
				isDown = true;
				clickTouch.createEvent(event, 'touchstart');
			}
			document.body.addEventListener('mousedown', mousedown);
			
			function mouseup(event){
				if(preventDefault)
					event.preventDefault();
				isDown = false;
				clickTouch.createEvent(event, 'touchend');
			}
			document.body.addEventListener('mouseup', mouseup);
			
			function mousemove(event){
				if(preventDefault)
					event.preventDefault();
				if(isDown)
					clickTouch.createEvent(event, 'touchmove');
			}
			document.body.addEventListener('mousemove', mousemove);
		},
		createEvent: createEvent
	}

}();