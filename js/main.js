(function ( document, window ) {
    'use strict';
	var allSlides = document.querySelectorAll("#slidegroup .slide");
	var slideCount = allSlides.length;
	var currentSlide = 0;
	
	var protocol = window.location.protocol;
	var pathname = window.location.pathname;
	var hash = window.location.hash;
	
	var rotateX = 0;
	var rotateY = 0;
	var rotateZ = 0;
	var diff = 90; 
	if (hash.length > 0 && hash.indexOf("#") == 0) {
		window.location.href = protocol + pathname + hash;
		currentSlide = parseInt(hash.substring(1)) || 0;
	}
	allSlides[currentSlide].classList.add("active"); 
	var $ = function(x) { return document.getElementById(x); }
	var keyHandler = function(e) {
	    var keyCode = e.keyCode;
	    switch(keyCode) {
		    case 37: /* left arrow */
		        previousSlide();
		        break;
		    case 39: /* rigth arrow */
		        nextSlide();
		        break;
			case 49: // 1
			    rotateY -= diff;
			    break;
			case 50:  // 2
			    rotateY += diff;
				break;
			case 51: // 3
				rotateX += diff;
				break;
			case 52:  // 4
				rotateX -= diff;
				break;
			case 53: // 5
				rotateZ += diff;
				break;
			case 54:  // 6
				rotateZ -= diff;
			}
			var rX = "rotateX(" + rotateX + "deg) "; 
			var rY = "rotateY(" + rotateY + "deg) ";
			var rZ = "rotateZ(" + rotateZ + "deg) ";
			document.getElementById("cubeInner").style.webkitTransform = rX + rY + rZ;
	};
	
	var previousSlide = function() {
		currentSlide--;
		if (currentSlide < 0) 
		    return;
		
	    allSlides[currentSlide+1].classList.remove("active");
		allSlides[currentSlide].classList.add("active");
		window.location.href = protocol + pathname + "#" + currentSlide;
	};
	
	var nextSlide = function() {
		currentSlide++;
		if (currentSlide >= slideCount) 
		    return;
	    allSlides[currentSlide-1].classList.remove("active");
	    allSlides[currentSlide].classList.add("active");
		window.location.href = protocol + pathname + "#" + currentSlide;
	};
	
	var renderRainbow = function() {
	    var numFig = document.getElementById("rainbowSlider1").value; 
	    var initialWidth = $('rainbowOuter').offsetWidth;
	    var rainbowDiff = parseInt(initialWidth / parseInt(numFig));
	    var rainbowAngleInitial = document.getElementById("rainbowSlider2").value;

	    var rainbowAngle = rainbowAngleInitial;
	    var rainbowParentDiv = document.getElementById("rainbowOuter");
	    rainbowParentDiv.innerHTML = "";

	    var center = 200;

	    for (var rainbowWidth = initialWidth; rainbowWidth > 0; rainbowWidth -= rainbowDiff) {
		    var rainbowNode = document.createElement("div");
		    rainbowNode.classList.add("rainbow");
		    rainbowNode.style.position = "absolute";

	        rainbowNode.style.top = (center - rainbowWidth/2) + "px";
		    rainbowNode.style.left = (center - rainbowWidth/2) + "px";
		    rainbowNode.style.height = rainbowWidth + "px";
		    rainbowNode.style.width = rainbowWidth + "px";
	        rainbowNode.style.webkitTransform = "rotate(" + rainbowAngle + "deg)";
	        rainbowAngle = (parseInt(rainbowAngle) + parseInt(rainbowAngleInitial)) % 360;
	        document.getElementById("rainbowOuter").appendChild(rainbowNode);
		    rainbowNode.style.display = "block";
	        rainbowWidth -= rainbowDiff;
	  }
	};

	renderRainbow();

    var resetEx1 = function() {
	    var ex = $('ex1demo');
	    ex.style.webkitTransform = "";
	    var ex1sliders = document.querySelectorAll("#ex1sliders input");
	    for (var i = 0; i < ex1sliders.length; ++i) {
		    var max = parseInt(ex1sliders[i].max);
			var min = parseInt(ex1sliders[i].min);
			var val = parseInt((max+min)/2); 
			ex1sliders[i].value = val;
		    var id = ex1sliders[i].id + "id";
		    if (ex1sliders[i].id.indexOf("ex1s") == 0) val/=10;
		    $(id).innerHTML = val;
	    }
    }

	var runEx1 = function(obj) {
		var id = obj.id;
		id += "id";
		var value = obj.value;
		if (id.indexOf("ex1s") == 0) {
			value /= 10; 
		}
		$(id).innerHTML = value;
		
		var ex = $('ex1demo');
		var tx = "translateX(" + $('ex1tx').value + "px) ";
		var ty = "translateY(" + $('ex1ty').value + "px) ";
		var rx = "rotateX(" + $('ex1rx').value + "deg) ";
		var ry = "rotateY(" + $('ex1ry').value + "deg) ";
		var rz = "rotateZ(" + $('ex1rz').value + "deg) ";
		var sx = "scaleX(" + $('ex1sx').value/10 + ") ";
		var sy = "scaleY(" + $('ex1sy').value/10 + ") ";
		var kx = "skewX(" + $('ex1kx').value + "deg) ";
		var ky = "skewY(" + $('ex1ky').value + "deg) ";
		var str = tx + ty + rx + ry + rz + sx + sy + kx + ky;
		ex.style.webkitTransform = str;
	};

    var runEx2a = function(obj) {
	    $('ex2pid').innerHTML = obj.value;
	    $('ex2Outer').style.webkitPerspective = obj.value;
    };

    var runEx2b = function(obj) {
	    var id = obj.id + "id";
	    $(id).innerHTML = obj.value;
	    var xv = $("ex2pox").value + "px ";
		var yv = $("ex2poy").value + "px ";
	    $('ex2Outer').style.webkitPerspectiveOrigin = xv + " " + yv;
    };

    var runEx3a = function(obj) {
	   $('ex3ryid').innerHTML = obj.value;
	   $('ex3demo').style.webkitTransform = "rotateZ(" + obj.value + "deg)";
    };
   
    var runEx3b = function(obj) {
	    $('ex3demo').classList.remove('ex3demoanim');
		var id = obj.id + "id";
		$(id).innerHTML = obj.value;
		var x = $("ex3tox").value + "px ";
		var y = $("ex3toy").value + "px ";
		$("ex3demo").style.webkitTransformOrigin = x + y;
		$("ex3origin").style.left = (400 + parseInt($("ex3tox").value)) + "px";
		$("ex3origin").style.top = (430 + parseInt($("ex3toy").value)) + "px";
	};
	
	var runEx6 =  function() {
		var X = 20;
		var Y = 20;
		var diff = 80;
		var x = X;
		var y = Y;
		var max = 6;
		var board = [[], [], [], [], [], []];
		function newGame() {
			
			$("ex6board").innerHTML = "";
		    x = X, y = Y;
		    for (var u = 0; u < max; ++u) {
		      for (var v = 0; v < max; ++v) {
		        var div = document.createElement("div");
		        div.style.position = "absolute";
		        div.style.left = x + "px";
		        div.style.top = y + "px";
		        div.id = u + "_" + v;
		        $("ex6board").appendChild(div);
		        div.addEventListener("click", handleClick, false);
		        div.classList.add("ex6coin");
		        var n = Math.random();
		        var classname = (n > 0.5) ? "ex6red" : "ex6blue";
		        div.classList.add(classname);
		        board[u][v] = classname;
		        y += diff;
		      }
		      x += diff;
		      y = Y;
		    }
		}

		function resetBoard() {
		  for (var u = 0; u < max; ++u) {
		    for (var v = 0; v < max; ++v) {
			  $(u + "_" + v).classList.remove("ex6red");
		      $(u + "_" + v).classList.remove("ex6blue");
		      $(u + "_" + v).classList.add(board[u][v]);
		    }
		  }
		}
		
		function handleClick(e) {
		  e.preventDefault();
		  var div = e.target;
		  var id = div.id;
		  var arr = id.split("_");
		  var u = parseInt(arr[0], 10);
		  var v = parseInt(arr[1], 10);
		  toggle(div);
		  if (u > 0) 
		    toggle($((u-1) + "_" + v));
		  if (u < max-1) 
		    toggle($((u+1) + "_" + v));
		  if (v > 0) 
		    toggle($(u + "_" + (v-1)));
		  if (v < max-1) 
		    toggle($(u + "_" + (v+1)));

		}

		function toggle(div) {
		  div.classList.toggle("ex6red");
		  div.classList.toggle("ex6blue");
		}
		/* Solution 
	 	   If the light at A6 is on, press A1 and C1. 
	 	   If the light at B6 is on, press D1.  
	 	   If the light at C6 is on, press A1 and E1. 
	 	   If the light at D6 is on, press B1 and F1. 
	 	   If the light at E6 is on, press C1. 
	 	   If the light at F6 is on, press D1 and F1.
		*/
		return {"newGame" : newGame , "resetBoard" : resetBoard};
		
	}
	
	var runEx7 = function() {
		var x = $('ex7xid2').innerHTML = $('ex7xid').innerHTML = $('ex7x').value;
		var y = $('ex7yid2').innerHTML = $('ex7yid').innerHTML = $('ex7y').value;
		var z = $('ex7zid2').innerHTML = $('ex7zid').innerHTML = $('ex7z').value;
		var w = $('ex7did').innerHTML = $('ex7d').value;
		var st = "rotate3d(" + x + "," + y + "," + z + "," + w + "deg)";
		$('ex7demo').style.webkitTransform = st;
	}
	
	var main = window.main = function() {
	    document.addEventListener("keydown", keyHandler);
	    runEx6().newGame();
	    var runEx6Ins = runEx6();
	    return { 
		    "runEx1" : runEx1,
		    "resetEx1": resetEx1,
			"runEx2a" : runEx2a,
			"runEx3a" : runEx3a,
			"runEx2b" : runEx2b,
			"runEx3b" : runEx3b,
			"runEx6" : runEx6Ins, // instance
			"runEx7" : runEx7,
		    "renderRainbow" : renderRainbow
		};
	};
})(document, window);
