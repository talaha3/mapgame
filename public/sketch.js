keys = [];
output = [];
rectwidth = 0;
textx = 0;
texty = 0;
texth = 0 ;
textw = 0;
butpressed = -1;
presscheck = false;
word = '';
letters = 'qwertyuiopasdfghjklzxcvbnm'.split('')
let flag;



function preload(){
	flag = loadImage('images/uk.webp');
}

function setup() {
	if(windowWidth<windowHeight){
	cnv = createCanvas(0.8*windowWidth, 0.9*windowWidth);
	}
	else{
		cnv = createCanvas(0.8*windowHeight, 0.9*windowHeight)
	}
	background(137, 7, 176);
	textFont('Varela Round')
	makekeys();
	drawflag();
	

	
	

	// put setup code here
}

function draw() {
	keyboard();
	if(presscheck&&frameCount<10){
		for(k of keys){
			if (k.text == butpressed){
				key = k;
			}
		}
		fill(70)
		rectMode(CENTER);
		stroke(0);
		strokeWeight(1);
		rect(key.x, key.y, key.width, key.height, 5);
		fill(255)
		textSize(rectwidth/2)
		textStyle(BOLD)
		textAlign(CENTER, CENTER);
		noStroke();
		text(key.text, key.x, key.y)
	}
	else{
		presscheck=false;
	}

	
	
	
	// put drawing code here
}

function makekeys(){
	rectMode(CENTER);
	stroke(0);
	strokeWeight(1);
	textx = 0.4*width;
	textw = 0.8*width;
	texth = 0.1*width;
	texty = 15*height/18-(5*height/9-1.5*0.11*width)/2-texth/2;

	fill(255);
	rect(textx, texty, textw, texth, 3); //text area

	rectwidth = (width-(0.1*width)-(0.02*width))/10;
	rectheight = (height - 5*height/9-1.5*0.11*width/2-0.05*height)/4

	
	for(let i = 0; i<26; i++){ //adds keys
	if(i<10){
		keyx = i*(rectwidth+0.01*width)+(rectwidth+0.03*width)/2;
		keyy = 5*height/9+0.15*width
	}
	else if(i<19){
		j=i-10;
		keyx = j*(rectwidth+0.01*width)+(rectwidth+0.02*width);
		keyy = 5*height/9+0.15*width+rectwidth*1.1
	}
	else{
		j = i - 19;
		keyx = j*(rectwidth+0.01*width)+2.7*(rectwidth+0.02*width)/2;
		keyy = 5*height/9+0.15*width+rectwidth*2.2
	}

	let key = {
		x: keyx,
		y: keyy,
		width: rectwidth, 
		height: rectheight,
		fill: 0,
		text: letters[i]
	}

		keys.push(key);
	}


	let del = {
		x:keys[25].x+1.67*rectwidth/2+0.01*width+rectwidth/2,
		y: 5*height/9+0.15*width+rectwidth*2.2,
		width: 1.67*rectwidth, 
		height: rectheight,
		fill: 1,
		text: 'del'
	}

	let spc = {
		x: width/2,
		y: 5*height/9+0.15*width+rectwidth*3.3,
		width: 6*rectwidth, 
		height: rectheight,
		fill: -1,
		text: 'space'
	}

	let ent = {
		x: textx+textw/2+(width-textw)/2,
		y: texty,
		width: width-textw, 
		height: texth,
		fill: 2,
		text: 'enter'
	}

	keys.push(del); //delete button
	keys.push(spc); //space button
	keys.push(ent); //enter button
	
}

function keyboard(){
	rectMode(CENTER);
	stroke(0);
	strokeWeight(1);

	fill(248,235,254);
	rect(width/2, 15*height/18, width, 5*height/9-1.5*0.11*width); //keyboard background
	for(key of keys){ //draws keys
		if(key.fill==2){
			fill(56, 192, 70)		
		}
		else if(key.fill==1){
			fill(250, 89, 89);
		}
		else{
				fill(255)
		}
		stroke(0);
		strokeWeight(1);
		rect(key.x, key.y, key.width, key.height, 5);
		if(key.fill>0){
			fill(255);	
		}
		else{
			fill(70)
		}
		textSize(rectwidth/2)
		textStyle(BOLD)
		textAlign(CENTER, CENTER);
		noStroke();
		text(key.text, key.x, key.y)
	}
}

function mousePressed(){
	rectMode(CENTER);
	for(key of keys){
		
		
		if(mouseX>key.x-key.width/2&&mouseX<key.x+key.width/2&&mouseY>key.y-key.height/2&&mouseY<key.y+key.height/2){
			if(key.fill == 2){
				frameCount = 0;
				butpressed = 'enter'; //space is 27th index
				presscheck = true;
				if(output.length>0){
					sendword(txt);
					output = [];
				}
			}
			else if(key.fill==1){
				frameCount = 0;
				butpressed = 'del'; //space is 27th index
				presscheck = true;
				output.pop();
			}
			else if(key.fill==-1){
				frameCount = 0;
				butpressed = 'space'; //space is 27th index
				presscheck = true;
				if(output.length != 0 && output.slice(-1)[0]!=' '&&output.length<23){
				output.push(' ');
				}
			}
			else{
				frameCount = 0;
				butpressed = key.text; //gets ascii codes and subtracts 97
				presscheck = true;
				if(output.length<22){
				output.push(key.text);
				}
			}
		}
	}
	txt = output.join('');
	fill(255);
	stroke(0);
	strokeWeight(1);
	rect(textx, texty, textw, texth, 3); //text area
	fill(0);
	textSize(rectwidth/2)
	textStyle(BOLD)
	textAlign(LEFT, CENTER);
	noStroke();
	text(txt, textx-0.95*textw/2, texty);
}

function keyPressed(){
	rectMode(CENTER);
	if(key.length==1&&key.toUpperCase()!=key.toLowerCase()){
		frameCount = 0;
		butpressed = key.toLowerCase(); //gets ascii codes and subtracts 97
		presscheck = true;
		if(output.length<22){
			output.push(key.toLowerCase());
		}
	}
	else if(key=='Backspace'){
		frameCount = 0;
		butpressed = 'del'; //space is 27th index
		presscheck = true;
		output.pop();
	}
	else if(key==' '){
		frameCount = 0;
		butpressed = 'space'; //space is 27th index
		presscheck = true;
		if(output.length != 0 && output.slice(-1)[0]!=' '&&output.length<22){
			output.push(' ');
		}
	}
	else if(key == 'Enter'){
		frameCount = 0;
		butpressed = 'enter'; //space is 27th index
		presscheck = true;
		if(output.length>0){
			sendword(txt);
			
			output = [];
		}
	}

	txt = output.join('');
	fill(255);
	stroke(0);
	strokeWeight(1);
	rect(textx, texty, textw, texth, 3); //text area
	fill(0);
	textSize(rectwidth/2)
	textStyle(BOLD)
	textAlign(LEFT, CENTER);
	noStroke();
	text(txt, textx-0.95*textw/2, texty)


}

function drawflag(){
	flagw = flag.width/(flag.width+flag.height)
	flagh = flag.height/(flag.width+flag.height)
	imageMode(CENTER);
	stroke(255);
	strokeWeight(10);
	rect(width/2, 2*height/7, width*flagw, width*flagh,4)
	image(flag, width/2, 2*height/7, width*flagw, width*flagh);
	fill(255);
	textAlign(CENTER);
	textStyle(BOLD);
	textSize(width/10)
	noStroke();
	text('Round 1', width/2, height/10)
	textStyle(NORMAL);
}

async function sendword(word){
	options = {
		method: 'POST',
		headers: {
			'Content-Type':'text/plain'
		},
		body: word
	};

	const response = await fetch('/api', options)
	const data = await response.json();
	console.log(data);
}
