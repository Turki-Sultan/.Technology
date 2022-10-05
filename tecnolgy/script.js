
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var fontSize = 20;
var chars =
	"abcdeghjclmnobqrstvuwxyz011abbdddjsakjdukayhduyjdgsajdhjgdhgdhjsgd3010100202030-390498308479375892764893902803980923749863274821703832987391274";

function setup() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cols = canvas.width / fontSize;
	drops = [];
	for (x = 0; x < cols; x++) {
		drops[x] = (Math.random() * canvas.height) / fontSize;
	}

	// Formatting and Title
	ctx.fillStyle = "#fff";
	ctx.font = "90px monospace";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Turki Sultan", canvas.width / 2, canvas.height / 2);

	// Mirror the output
	ctx.translate(canvas.width, 0);
	ctx.scale(-1, 1);
}

function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#0F7";
	ctx.font = fontSize + "px monospace";
	for (var i = 0; i < drops.length; i++) {
		var text = chars[Math.floor(Math.random() * chars.length)];
		ctx.fillText(text, i * fontSize, drops[i] * fontSize);
		if (
			drops[i] * fontSize > canvas.height - 200 * Math.random() &&
			Math.random() > 0.975
		) {
			drops[i] = 0;
		}
		drops[i]++;
	}
}

setup();
setInterval(draw, 33);

window.onresize = function () {
	setup();
};