class Drop {
	static color = '#76a5d2';
	static minSize = 15;
	static maxSize = 170;
	static minAngle = 44.95;
	static maxAngle = 45.05;
	static speed = 1.0;
	static totalCount = 512;
	
	constructor(xpos = 0, ypos = 0, color = Drop.color) {
		// set drop position
		this.pos = [xpos, ypos];
		
		// set drop size based on weighted distribution
		let sizeRange = Drop.maxSize - Drop.minSize;
		let sizeRandMin = Drop.minSize;
		let sizeRandMax = Drop.maxSize;
		
		let rand = Math.random();
		if (rand < 0.7) { // small 70%
			sizeRandMin = Drop.minSize;
			sizeRandMax = Drop.minSize + sizeRange/3;
		} else if (rand < 0.90) { // medium 20%
			sizeRandMin = Drop.minSize + sizeRange/3;
			sizeRandMax = Drop.maxSize - sizeRange/3;
		} else { // large 10%
			sizeRandMin = Drop.maxSize - sizeRange/3;
			sizeRandMax = Drop.maxSize;
		}
			
		this.size = Math.random() * (sizeRandMax - sizeRandMin) + sizeRandMin;
		
		// set variation in drop angle
		this.angle = Math.random() * (Drop.maxAngle - Drop.minAngle) + Drop.minAngle;
		
		// set drop color
		this.color = color;
	}
	
	// Get color
	static getColor() {
		return Drop.color;
	}
	
	// Set color
	static setColor(newColor) {
		Drp.color = newColor;
	}
	
	// Update this drop
	update() {
		this.pos[0] += 5 * this.size / 75 * Drop.speed;
		this.pos[1] += 20 * this.size / 75 * Drop.speed;
		this.size -= 0.01;
	}
	
	// Draw this drop on the given context
	draw(ctx) {
		let startPos = this.pos;
		let endPos = [
			this.pos[0] + this.size/2 * Math.cos(this.angle),
			this.pos[1] + this.size
		];
		
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.size / 77;
		ctx.beginPath();
		ctx.moveTo(startPos[0], startPos[1]);
		ctx.lineTo(endPos[0], endPos[1]);
		ctx.stroke();
	}
}

function newDrop(x, y) {
	let winWidth = $(window).width();
	let winHeight = $(window).height();
	
	let minX = -winWidth;
	let maxX = winWidth;
	let minY = -winHeight;
	let maxY = 0;
	
	let randX = Math.random() * (maxX - minX) + minX;
	let randY = Math.random() * (maxY - minY) + minY;
	
	let xPos = x == undefined ? randX - Drop.maxSize : x;
	let yPos = y == undefined ? randY - Drop.maxSize : y;
	
	return new Drop(xPos, yPos)
}

$(document).ready(() => {
	/* Setup UI */
	$body = $('body');
	$bgcolor = $('#bgcolor');
	$fgcolor = $('#fgcolor');
	$numdrops = $('#numdrops');
	$dropspeed = $('#dropspeed');
	
	// set default bg color
	let bgColor = $bgcolor.val();
	$body.css('background-color', bgColor);
	
	// handle update bg color
	$bgcolor.on('input', (e) => {
		$('body').css('background-color', e.currentTarget.value);
	})
	
	//set default fg color
	let fgColor = $fgcolor.val();
	Drop.color = fgColor;
	
	// handle update fg color
	$fgcolor.on('input', (e) => {
		Drop.color = e.currentTarget.value;
	})
	
	// set default drop count
	Drop.totalCount = $numdrops.val();
	
	// handle update drop count
	$numdrops.on('input', (e) => {
		let cap = 30000;
		let newCount = e.currentTarget.value;
		if (newCount >= cap) {
			newCount = cap;
			$numdrops.val(cap);
		}
		Drop.totalCount = newCount;
	})
	
	// set default drop speed
	Drop.speed = $dropspeed.val();
	
	// handle update drop speed
	$dropspeed.on('input', (e) => {
		Drop.speed = e.currentTarget.value;
	})
	
	/* get canvas context */
	const canvas = document.getElementById('canvas');
	
	if (!canvas.getContext) {
		// canvas not supported
		console.log("Canvas not supported.");
		return;
	}
	
	const ctx = canvas.getContext('2d');
	
	/* generate initial drops */
	let drops = [];
	
	setInterval(() => {
		//if (window.CP.shouldStopExecution(1)) return;
		winWidth = $(window).width();
		winHeight = $(window).height();
		
		ctx.canvas.width  = winWidth;
		ctx.canvas.height = winHeight;
		
		// populate new drops if drops array is smaller than the drops total count
		for (let i = 0; i < Drop.totalCount - drops.length; i++) {
			drops.push(newDrop());
		}
		
		// draw and update each drop
		for (let i = 0; i < drops.length; i++) {
			drop = drops[i];
			
			drop.draw(ctx);
			drop.update();
		}
		
		// remove all off-screen drops
		for (let i = drops.length-1; i > 0; i--) {
			if (drops[i].pos[0] > winWidth || drops[i].pos[1] > winHeight) {
				drops.splice(i, 1);
			}
		}
	}, 20)
})