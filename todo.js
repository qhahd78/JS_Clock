const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function filterFn(toDo){
    return toDo.id === 1   //필터를 거쳐 새로운 array르 만든다.
}

let toDos = []; //array 생성. 해야할 일 적은 것들이 여기에 들어감 

function deleteToDo(event){
    const btn = event.target;//어떤 버튼이 클릭됐는지. 
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //string => int
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //어떤 object든 string으로 바꿔준다.
}

function paintToDo(text) {
    const li = document.createElement("li"); //li 만들음
    const delBtn = document.createElement("button"); // 버튼 만들음
    const span = document.createElement("span"); //span 만들음 
    const newId = toDos.length + 1;
    delBtn.innerHTML= "❌";
    delBtn.addEventListener("click", deleteToDo); //클릭하면 deleteToDo 실행
    span.innerText = text
    li.appendChild(delBtn); // 버튼을 li 안에 넣음
    li.appendChild(span); //span 을 li 안에 넣음  
    li.id = newId //li에 id를 준다. 
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //push 를 사용하여 toDoObj를 toDos 에 넣음 . 
    saveToDos() //함수 호출
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos); //자바스크립트 object로 바꿔줌 
      parsedToDos.forEach(function something(toDo){
          paintToDo(toDo.text); //화면에 출력 
      });
    //담겨있는 것을 parsedToDosㅇ 있는 것들 각각에 차례로 실행해줌  
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

//paint = 화면에 보여주기 