document.addEventListener("DOMContentLoaded", function (event) {

	document.getElementById("burgerbutton").addEventListener("click", openMobileNav);
	document.getElementById("closebutton").addEventListener("click", closeMobileNav);


	function openMobileNav() {
		console.log("Mobile nav opened");
		document.getElementById("mobilenav").style.transform = "translate(0, 100%)";
	}

	function closeMobileNav() {
		console.log("Mobile nav closed");
		document.getElementById("mobilenav").style.transform = "translate(0, 0)";
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