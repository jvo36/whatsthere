
// FADE OUT AND FADE IN
function fadeOut(el){
	var element = document.getElementById(el);
	element.style.transition = "opacity 0.5s linear 0s";
	element.style.opacity = 0;
}
function fadeIn(el){
	var element = document.getElementById(el);
	element.style.transition = "opacity 0.5s linear 0s";
	element.style.opacity = 1;
}

// EXPAND AND RETRACT
function expand(element) {
  var target = document.getElementById(element);
  var h = target.offsetHeight;
  var sh = target.scrollHeight;
  var loopTimer = setTimeout('expand(\''+element+'\')', 8);
  if(h < sh){
    h += 5;
  } else {
    clearTimeout(loopTimer);
  }
    target.style.height = h+"px";
  }

function retract(element){
  var target = document.getElementById(element);
  var h = target.offsetHeight;
  var loopTimer = setTimeout('retract(\''+element+'\')',8);
  if(h > 0){
    target.style.height = "0px";
    clearTimeout(loopTimer);
  }
    target.style.height = h+"px";
  } ﻿


// AUTO SCROLL
  var scrollY = 0;
  var distance = 40;
  var speed = 24;
  function autoScrollTo(el) {
  	var currentY = window.pageYOffset;
  	var targetY = document.getElementById(el).offsetTop;
  	var bodyHeight = document.body.offsetHeight;
  	var yPos = currentY + window.innerHeight;
  	var animator = setTimeout('autoScrollTo(\''+el+'\')',24);
  	if(yPos > bodyHeight){
  		clearTimeout(animator);
  	} else {
  		if(currentY < targetY-distance){
  		    scrollY = currentY+distance;
  		    window.scroll(0, scrollY);
  	    } else {
  		    clearTimeout(animator);
  	    }
  	}
  }
  function resetScroller(el){
  	var currentY = window.pageYOffset;
      var targetY = document.getElementById(el).offsetTop;
  	var animator = setTimeout('resetScroller(\''+el+'\')',speed);
  	if(currentY > targetY){
  		scrollY = currentY-distance;
  		window.scroll(0, scrollY);
  	} else {
  		clearTimeout(animator);
  	}
  }


// AJAX

  function ajaxObj(method, url) {
  	var x = new XMLHttpRequest();
  	x.open(method, url, true);
  	x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	return x;
  }
  function ajaxReturn(x){
  	if(x.readyState == 4 && x.status == 200){
  	    return true;
  	}
  }



// js functions
// grabs the element by the id in the
function Id(x){
  return document.getElementById(x);
}
//*** sign up fns
// sets restrictions for input fields, ensures proper input
function restrict(elem){
  var tf = Id(elem);
  var regEx = new RegExp;
  if(elem == "email"){
    regEx = /[' "]/gi;
  } else if(elem == "username"){
    regEx = /[^a-z0-9]/gi;
  }
  tf.value = tf.value.replace(regEx, "");
}
function emptyElement(x){
  Id(x).innerHTML = "";
}
// checks entered username with the database
function checkusername(){
  var uname = Id("username").value;
  if(uname != ""){
    Id("unamestatus").innerHTML = 'checking username...';
    var ajax = ajaxObj("POST", "signup.php");
    ajax.onreadystatechange = function(){
      if(ajaxReturn(ajax) == true){
        Id("unamestatus").innerHTML = ajax.responseText;
      }
    }
    ajax.send("checkusername="+uname);
  }
}
function displayTermsofUse(){
 Id("TermsofUse").style.display = "block";
 Id("TermsofUse").style.color = "white";
 emptyElement("status");
}

$("#sidebar").toggleClass("collapsed");



// Resize listener
/*$(w).resize(function(){ //Update dimensions on resize
  sw = document.documentElement.clientWidth;
  sh = document.documentElement.clientHeight;
  checkMobile();
});

//Check if Mobile
function checkMobile() {
  mobile = (sw > breakpoint) ? false : true;

  if (!mobile) { //If Not Mobile
    $('[role="tabpanel"],#nav,#search').show(); //Show full navigation and search
  } else { //Hide
    if(!$('#nav-anchors a').hasClass('active')) {
      $('#nav,#search').hide(); //Hide full navigation and search
    }
  }
}
/*
// signup fn unfinished
// rest of js fns are either unfinished or haven't been put here
