const btnStart = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const spanTime = document.querySelector('#time')
const board = document.querySelector('#board')
const arrcolors = ['rgba(216, 120, 126, 1)', 'rgba(120, 170, 216, 1)', 'rgba(120, 210, 216, 1)', 'rgba(157, 216, 120, 1)', 'rgba(248, 5, 5, 1)', 'rgba(221, 167, 64, 1)']

let gameTime = 0
let score = 0
let int

btnStart.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
  if(e.target.classList.contains('time-btn')){
    gameTime = e.target.getAttribute('data-time')
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if(e.target.classList.contains('circle')){
    score++
    e.target.remove()
    randomCircle()
  }
})


function startGame(){
  score = 0
  spanTime.parentNode.classList.remove('hide')
  board.innerHTML = ''
  int = setInterval(() => {
    gameTimes()
  }, 1000);
  randomCircle()
}


function randomCircle(){
  const color = randomNumbers(0, 5)
  const size = randomNumbers(15, 60)
  const circle = document.createElement('div')
  circle.classList.add('circle')
  const x = board.getBoundingClientRect().width
  const y = board.getBoundingClientRect().height 
  const cordinatX = randomNumbers(0, x - size)
  const cordinatY = randomNumbers(0, y - size)
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${cordinatX}px`
  circle.style.left = `${cordinatY}px`
  circle.style.backgroundColor = arrcolors[color]
  board.append(circle)
}

function gameTimes(){
  if(gameTime === 0){
    gameOver()
  } else if (gameTime <= 10){
    --gameTime
    spanTime.innerHTML = `00:0${gameTime}`
  } else {
    --gameTime
    spanTime.innerHTML = `00:${gameTime}`
  }
}

function randomNumbers(min, max){
  let index = Math.floor(Math.random() * (max - min) + min)
  return index
}

function gameOver(){
  clearInterval(int)
  spanTime.parentNode.classList.add('hide')
  board.innerHTML = `<div>
                        <h1>Score: <span class="primary">${score}</span>
                        </h1>
                        <button class="btn" id="gameRepeat">repeat</button>
                      </div>
                      `
  const gameRepeat = document.querySelector('#gameRepeat')
  gameRepeat.addEventListener('click', () => {
    screens[1].classList.remove('up')
  })
}