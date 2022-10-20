
function imgSlider (anything) {
	document.querySelector(".pepsi").src = anything;
}

function changeBgColor(color){
	const sec = document.querySelector(".sec");
	sec.style.background = color;

}

function menuToggle(){
	const toggleMenu = document.querySelector(".toggleMenu")
	const navigation = document.querySelector(".navigation")
	toggleMenu.classList.toggle('active')
	navigation.classList.toggle('active')
}







const wordsArray = ["Friends", "Ladies", "Gentlemen", "Beautiful"];
let dynamicElement = document.querySelector(".text--dynamic");
let currentWord = "",
  currentLetter = "",
  currentWordCount = 0,
  currentLetterCount = 0;
let lengthArray = wordsArray.length;

function typeWords() {
  if (currentWordCount == lengthArray) {
    currentWordCount = 0;
  }

  currentWord = wordsArray[currentWordCount];
  currentLetter = currentWord.slice(0, currentLetterCount);
  currentLetterCount = currentLetterCount + 1;
  dynamicElement.textContent = currentLetter;

  if (currentLetterCount == currentWord.length + 1) {
    currentWordCount++;
    currentLetterCount = 0;
  }
  setTimeout(typeWords, 300);
}

window.addEventListener("load", typeWords);







function header_adj() {
	if ($(window).width() <= 992) {
		var header_height = $(".header").outerHeight();
		$(".nav-wrap .nav-list").css({ "padding-top": header_height + "px" });
	} else {
		$(".nav-wrap .nav-list").css({ "padding-top": "0" });
	}
}
function submenu_toggle() {
	if ($(window).width() <= 992) {
		$(".nav-list li.with-submenu")
			.off()
			.click(function () {
				$(this).toggleClass("is-open");
				$(".submenu").slideToggle("slow");
			});
	}
}
$(document).ready(function () {
	header_adj();
	submenu_toggle();
	if ($(window).width() <= 992) {
		$(".hamburger").click(function () {
			$(this).toggleClass("is-active");
			$("body,html,*").toggleClass("sidebar-open");
			$(".nav-wrap").toggleClass("is-open");
		});

		$(".overlay").click(function () {
			$(".hamburger").removeClass("is-active");
			$("body,html,*").removeClass("sidebar-open");
			$(".nav-wrap").removeClass("is-open");
		});
	} else {
		$(".hamburger").removeClass("is-active");
		$("body,html,*").removeClass("sidebar-open");
		$(".nav-wrap").removeClass("is-open");
	}
});
$(window).on("resize", function () {
	header_adj();
	submenu_toggle();
	if ($(window).width() <= 992) {
		$(".hamburger").click(function () {
			$(this).toggleClass("is-active");
			$("body,html,*").toggleClass("sidebar-open");
			$(".nav-wrap").toggleClass("is-open");
		});

		$(".overlay").click(function () {
			$(".hamburger").removeClass("is-active");
			$("body,html,*").removeClass("sidebar-open");
			$(".nav-wrap").removeClass("is-open");
		});
	} else {
		$(".hamburger").removeClass("is-active");
		$("body,html,*").removeClass("sidebar-open");
		$(".nav-wrap").removeClass("is-open");
	}
});

