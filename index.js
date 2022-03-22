const timeLeftOut = document.querySelector('#time-left');
const result = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause');
const boxes = document.querySelectorAll('.game-board div');
const leftLogs = document.querySelectorAll('.logs-left');
const rightLogs = document.querySelectorAll('.logs-right');
let currentIndex = 76;
const width = 9;

function moveFrog(e){
    boxes[currentIndex].classList.remove('frog');

    switch (e.key) {
        case 'ArrowUp':
            if(currentIndex-width >= 0){
                currentIndex-=width;
            }
            break;
        case 'ArrowDown':
            if(currentIndex + width < width*width){
                currentIndex+=width;
            }
            break;
        case 'ArrowLeft':
            if(currentIndex%width!=0){
                currentIndex-=1;
            }
            break;
        case 'ArrowRight':
            if(currentIndex%width < width-1){
                currentIndex+=1;
            }
            break;
        default:
            break;
    }

    boxes[currentIndex].classList.add('frog');
}

function moveLeft(log){
    let ele = parseInt(log.classList[1][1]);

    ele = (ele+1)%5;

    log.classList.remove(log.classList[1]);
    log.classList.add('l'+ele.toString());
}

function moveRight(log){
    let ele = parseInt(log.classList[1][1]);

    ele -=1;

    if(ele==0){
        ele=5;
    }

    log.classList.remove(log.classList[1]);
    log.classList.add('l'+ele.toString());
}

function autoMoveLogs(){
    leftLogs.forEach(log => moveLeft(log));
    rightLogs.forEach(log => moveLeft(log));
}

document.addEventListener('keyup',moveFrog);

setInterval(autoMoveLogs,500);