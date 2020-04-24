document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // 1st div in the grid
    let appleIndex = 0 //Also 1st div in grid
    let currentSnake = [2,1,0]
    // 2 corrosponds to the head, 0 for the tail and 1's for the body

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

//snake moving - outcome
    function moveOutcomes() {
        //Snake hitting border or self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1 ) || //snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1 ) || //snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width )|| //snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake') // Snake goes into itself
        ) {
            return clearInterval(interval) /// clears interval if any of above happen
        }
        const tail = currentSnake.pop() //removes last item of array & shows it
        squares[tail].classList.remove('snake') // removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the snake

        //When snake gets apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval( interval )
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
        
    }

// Random Apple function
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }



//Asssign control function to key Codes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //Removes the class of snake from the squares

        if(e.keyCode === 39) {
            direction = 1 //right arrow ,snake goes rigth one
        } else if (e.keyCode === 38) {
            direction = -width //up Arrow, snake will go up
        } else if (e.keyCode === 37) {
            direction = -1 //left Arrow, snake will go left one
        } else if (e.keyCode === 40) {
            direction = +width // Down Arrow, snake will go down one
        }
    }


    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})