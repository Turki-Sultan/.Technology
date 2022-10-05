
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
