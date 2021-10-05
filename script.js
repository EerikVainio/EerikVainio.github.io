document.addEventListener("DOMContentLoaded", function (event) {

	var scrolled = false;

	document.getElementById("burgerbutton").addEventListener("click", openMobileNav);
	document.getElementById("closebutton").addEventListener("click", closeMobileNav);

	window.addEventListener("scroll", function(event) {
		if (this.scrollY > 80) {
			document.getElementById("navbar").style.height = "60px";
			for (var i=0;i<document.getElementsByClassName("nav").length;i+=1){
  				document.getElementsByClassName("nav")[i].style.transform = "translate(0, -14px)";
  			}
  			scrolled = true;
		} else if (this.scrollY < 40) {
			document.getElementById("navbar").style.height = "90px";
			for (var i=0;i<document.getElementsByClassName("nav").length;i+=1){
  				document.getElementsByClassName("nav")[i].style.transform = "translate(0, 0)";
  			}
  			if (scrolled == true) {
				window.scrollTo(0, 0);
				scrolled = false;
  			}
		}

		//CARD POP INS

		if (document.getElementById("card1").getBoundingClientRect().top < window.innerHeight-120) {
			document.getElementById("card1").style.animationName = "cardpopin";
		}
		if (document.getElementById("card2").getBoundingClientRect().top < window.innerHeight-120) {
			document.getElementById("card2").style.animationName = "cardpopin";
		}
		if (document.getElementById("card3").getBoundingClientRect().top < window.innerHeight-120) {
			document.getElementById("card3").style.animationName = "cardpopin";
		}
		if (document.getElementById("card4").getBoundingClientRect().top < window.innerHeight-120) {
			document.getElementById("card4").style.animationName = "cardpopin";
		}
	});


	function openMobileNav() {
		console.log("Mobile nav opened");
		//document.getElementById("mobilenav").style.transform = "translate(0, 100%)";
		document.getElementById("mobilenav").style.top = "0";
	}

	function closeMobileNav() {
		console.log("Mobile nav closed");
		document.getElementById("mobilenav").style.top = "-100%";
	}

	/*document.getElementById("arrowbutton1").addEventListener("mouseenter", arrowButton1Hover);
	document.getElementById("arrowbutton1").addEventListener("mouseleave", arrowButton1NoHover);

	document.getElementById("arrowbutton2").addEventListener("mouseenter", arrowButton2Hover);
	document.getElementById("arrowbutton2").addEventListener("mouseleave", arrowButton2NoHover);

	function arrowButton1Hover() {
		console.log("Arrow Button Hovered");
		document.getElementById("arrow1").classList.remove("ml-3");
		document.getElementById("arrow1").classList.add("ml-4");
	}

	function arrowButton1NoHover() {
		console.log("Arrow Button Not Hovered");
		document.getElementById("arrow1").classList.remove("ml-4");
		document.getElementById("arrow1").classList.add("ml-3");
	}

	function arrowButton2Hover() {
		console.log("Arrow Button Hovered");
		document.getElementById("arrow2").classList.remove("ml-3");
		document.getElementById("arrow2").classList.add("ml-4");
	}

	function arrowButton2NoHover() {
		console.log("Arrow Button Not Hovered");
		document.getElementById("arrow2").classList.remove("ml-4");
		document.getElementById("arrow2").classList.add("ml-3");
	}*/
});