let countdown; 
// setInterval을 위한 let 변수 선언 -> clearInterval 가능 
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(function(){
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? 0 : ""}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    //new Date() : 날짜 시간 오브젝트, Date(): 위 오브젝트를 문자열로 바꿈
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hours>12 ? hours-12 : hours}:${minutes<10 ? 0 : ""}${minutes}`;
}

function startTimer(){
    const seconds = this.dataset.time;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    //e.preventDefault 를 통한 submit후 refresh 방지
    //data 전송 가능
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

