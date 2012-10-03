/*!
 * jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 *
 * Copyright (c) 2009 Martin Angelov
 * http://tutorialzine.com/
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : December 2009
 * Version : 1.0
 * Released: Monday 28th December, 2009 - 00:00
 */

(function($){
	
	// A global array used by the functions of the plug-in:
	var gVars = {};

	// Extending the jQuery core:
	$.fn.tzineClock = function(total,finish, step){
	
		// "this" contains the elements that were selected when calling the plugin: $('elements').tzineClock();
		// If the selector returned more than one element, use the first one:
		
		var container = this.eq(0);
	
		if(!container)
		{
			try{
				console.log("Invalid selector!");
			} catch(e){}
			
			return false;
		}
		
		// if(!opts) opts = {}; 
		
		// var defaults = {
		// 	onFinish: function() {
		// 		// console.log('Finished!');
		// 	}
		// 	/* Additional options will be added in future versions of the plugin. */
		// };
		finish = finish || function() {};
		step = step || function () {}
		total = total ||2;
		/* Merging the provided options with the default ones (will be used in future versions of the plugin): */
		// $.each(defaults,function(k,v){
		// 	opts[k] = opts[k] || defaults[k];
		// })

		// Calling the setUp function and passing the container,
		// will be available to the setUp function as "this":
		timer = setUp.call(container,total,finish,step);
		
		return timer;
	}
	
	function setUp(total,finish,step)
	{
		var tmp;
		
			// Creating a new element and setting the color as a class name:
			
			tmp = $('<div>').attr('class','countdown-clock').html(
				'<div class="display"></div>'+
				
				'<div class="front left"></div>'+
				
				'<div class="rotate left">'+
					'<div class="bg left"></div>'+
				'</div>'+
				
				'<div class="rotate right">'+
					'<div class="bg right"></div>'+
				'</div>'
			);
			
			// Appending to the container:
			$(this).empty().append(tmp);
			
			// Assigning some of the elements as variables for speed:
			tmp.rotateLeft = tmp.find('.rotate.left');
			tmp.rotateRight = tmp.find('.rotate.right');
			tmp.display = tmp.find('.display');
			
			// Adding the dial as a global variable. Will be available as gVars.colorName
			gVars = tmp;
		
		// Setting up a interval, executed every 1000 milliseconds:
		var s = 1;
		var timer = new TimerInterval(function(){
			// console.log('seconds',s);
			step(s,total);
			if (s-1==total) {
				finish();
				timer.pause();
				return;
			}
			animation(gVars, s, total);
			s++;
		},1000);
		return timer;
	}
	
	function animation(clock, current, total)
	{
		// Calculating the current angle:
		var angle = (360/total)*(current);
	
		var element;

		if(current==0)
		{
			// Hiding the right half of the background:
			clock.rotateRight.hide();
			
			// Resetting the rotation of the left part:
			rotateElement(clock.rotateLeft,0);
		}
		
		if(angle<=180)
		{
			// The left part is rotated, and the right is currently hidden:
			element = clock.rotateLeft;
		}
		else
		{
			// The first part of the rotation has completed, so we start rotating the right part:
			clock.rotateRight.show();
			clock.rotateLeft.show();
			
			rotateElement(clock.rotateLeft,180);
			
			element = clock.rotateRight;
			angle = angle-180;
		}

		rotateElement(element,angle);
		
		var countdown = total-current;
		// Setting the text inside of the display element, inserting a leading zero if needed:
		clock.display.html(countdown<10?'0'+countdown:countdown);
	}
	
	function rotateElement(element,angle)
	{
		// Rotating the element, depending on the browser:
		var rotate = 'rotate('+angle+'deg)';
		
		if(element.css('MozTransform')!=undefined)
			element.css('MozTransform',rotate);
			
		else if(element.css('WebkitTransform')!=undefined)
			element.css('WebkitTransform',rotate);
	
		// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
		else if(element.css("filter")!=undefined)
		{
			var cos = Math.cos(Math.PI * 2 / 360 * angle);
			var sin = Math.sin(Math.PI * 2 / 360 * angle);
			
			element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
	
			element.css("left",-Math.floor((element.width()-200)/2));
			element.css("top",-Math.floor((element.height()-200)/2));
		}
	
	}
	
})(jQuery)