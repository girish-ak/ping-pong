const bgm = new Audio("./sounds/bgm.mp3")
bgm.volume = 0.25
const tap = new Audio("./sounds/tap.wav")
const canvas = document.querySelector('canvas') //to select canvas tag in hrml
const contxt = canvas.getContext('2d') // specifing dimensions and invoke canvas api

canvas.width = innerWidth*2/3 //to acquire full width of browser
canvas.height = innerHeight*9/10// similar

const a = canvas.width / 2
const b = canvas.height / 2
let score
let counter
let ball
let rpaddle
let lpaddle
let paddle = {
    height : 100,
    width : 10
}

let soundImage = document.getElementById("soundImage");
let button1 = document.getElementById("button1");

function changeIcon() {

    if (soundImage.getAttribute('src') === "./images/mute.png") {
        soundImage.setAttribute('src', "./images/volume.png");
        bgm.play()

    }
    else {
        soundImage.setAttribute('src', "./images/mute.png");
        bgm.pause()
    }
}

button1.addEventListener("click", changeIcon);

function setVariables(){
     ball = {
        x : a,
        y : b,
        radius : 15,
        dx : 9,
        dy : 6
    }
     rpaddle = {
        x : canvas.width-10,
        y : b-50
    }
    
     lpaddle = {
        x : 0,
        y : b-50
    }
    score=0
    counter = 1
    scorebox.innerHTML = "Score : " + score;
    changeIcon()
    
}
let higscore = localStorage.getItem("higscore");
if (higscore === null) {
	higvalue = 0;
	highscore.innerHTML = "High Score : " + higscore;
	localStorage.setItem("higscore", JSON.stringify(higvalue))
}
else {
	higvalue = JSON.parse(higscore);
	highscore.innerHTML = "High Score : " + higscore;
}
setVariables()
moveball()
movelpaddle()



function moveball(){
    
    ball.x += ball.dx
    ball.y += ball.dy
    rpaddle.y = ball.y - paddle.height/2
    contxt.clearRect(0,0,canvas.width,canvas.height)
    contxt.beginPath()
    contxt.fillStyle = '#2274A5'
    contxt.fillRect(0, 0, canvas.width, canvas.height)
    contxt.fill()
    drawball()
    drawRightPeddle()
    drawLeftPeddle()
    iscollide()
    centerline()
    requestAnimationFrame(moveball)
    
}

function drawball(){
    contxt.beginPath();
    contxt.arc(ball.x,ball.y,ball.radius,0,Math.PI * 2);
    contxt.fillStyle = "#00cc66"
    contxt.fill()
    contxt.closePath();
}

function drawRightPeddle(){
    contxt.beginPath();
    contxt.rect(rpaddle.x,rpaddle.y,paddle.width,paddle.height);
    contxt.fillStyle = '#F1C40f'
    contxt.fillRect(rpaddle.x,rpaddle.y,rpaddle.y,paddle.width,paddle.height)
    contxt.fill()
    contxt.closePath();
}

function drawLeftPeddle(){
    contxt.beginPath();
    contxt.rect(lpaddle.x,lpaddle.y,paddle.width,paddle.height);
    contxt.fillStyle = '#F1C40f'
    contxt.fillRect(lpaddle.x,lpaddle.y,paddle.width,paddle.height)
    contxt.fill()
    contxt.closePath();
}

function iscollide(){
    //right paddle collision
    if (ball.x>rpaddle.x - ball.radius/2 - paddle.width){
        ball.dx = -ball.dx
        tap.play()
    }
    //player collision
    if (ball.x < ball.radius + paddle.width && ball.y>lpaddle.y-4 && ball.y<lpaddle.y+paddle.height+4){
        tap.play()
        ball.dx = -ball.dx
        
        score++
        counter++
        scorebox.innerHTML = "Score : " + score;
        if (score > higvalue) {
			higvalue = score;
			localStorage.setItem("higscore", JSON.stringify(higvalue));
			highscore.innerHTML = "High Score : " + higvalue;
		}
        if(counter>2){
            counter=1
            ball.dx+=Math.random()*(4-1)+1
            ball.dy+=Math.random()*(4-1)+1
        }
    }
    // wall collision
    if(ball.y > canvas.height - ball.radius || ball.y < ball.radius){
        ball.dy = -ball.dy
    }
    if(ball.x < ball.radius){
        alert("Game Over!\nYour Score is : "+score)
        setVariables()
    }
  
}

function centerline(){
    contxt.beginPath();
    contxt.arc(a,b,75,0,Math.PI * 2);
    contxt.strokeStyle = '#f75c03'
    contxt.stroke();
    contxt.moveTo(a,0);
    contxt.lineTo(a,canvas.height)
    contxt.strokeStyle = '#f75c03'
    contxt.stroke();
    contxt.closePath();
}

function movelpaddle(){
    document.addEventListener('mousemove',(e)=>{
        if(e.screenY>=100 && e.screenY<=canvas.height)
        lpaddle.y = e.screenY-100
    })
}

