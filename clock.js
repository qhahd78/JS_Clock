const clockContainer = document.querySelector(".js-clock"),
    clockTitle= clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`; //if 문처럼 쓰인다.// 
                                     //10보다 작으면 0과 출력, 크면 그냥 출력 
}

function init() {
    getTime();
    setInterval(getTime, 1000); //매 초마다 변경//
}

init();