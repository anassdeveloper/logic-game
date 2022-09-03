const boxGame = document.querySelector('.box-game');
const choseItem = document.getElementById('chose-list');
const divFinish = document.querySelector('.finish');
const correct =  document.getElementById('correct');
const allItem = document.querySelectorAll('.item');
const msg = document.querySelector('#msg');
const yourNumber = document.querySelector('.your_number');

let counter = 0;
const dataChose = [];
const chosees = [];


boxGame.addEventListener('click',logicGame);

function logicGame(e){
    if(e.target.classList.contains('item')){
        counter++;
        if(counter <= 6){
            e.target.classList.add('item-active');
            dataChose.push(Number(e.target.innerHTML));
        }else{
            divFinish.style.display = "block";
            const btn = document.createElement('button');
            btn.textContent = "Submit";
            btn.setAttribute('class', 'submitBtn');
            e.target.closest('.box-game').insertAdjacentElement('afterend', btn);
            msg.textContent = "Game Start";
            correct.textContent = "0";
            document.querySelector('.ads').style.display = "block";
            btn.addEventListener('click', startGame)
        }
    }
}

function startGame(){
    this.style.display = "none";

    dataChose.forEach(el => {
        yourNumber.innerHTML += `<span>${el}</span>`;
    })

    let score = 0;
    const myGameCounter = setInterval(randomBumber,1000);
    
    function randomBumber(){
        let copieCounter = counter;
        
        const numNumber = Math.floor(Math.random() * (21 - 1 + 1)) + 1;
        
        msg.textContent = "Your Chance :";
        counter--;
        if(counter !== 0) {
            if(!chosees.includes(numNumber)){
                chosees.push(numNumber)
                choseItem.innerHTML += `<li class="chose-${numNumber} item">${numNumber}</li>`;
                
                if(dataChose.includes(numNumber)){
                    score++;
                    correct.textContent = score;
                    document.querySelector(`.chose-${numNumber}`)
                    .style.backgroundColor = "#21ED4A";
                    document.querySelector(`.chose-${numNumber}`)
                    .style.color = "#fff";
                }
            }else{
                counter = copieCounter;
            }
           
       }else{
        clearInterval(myGameCounter);
        divFinish.innerHTML = `<button class="newGame">New Game</button>`;
        document.querySelector('.newGame')
        .addEventListener('click', newGame);
       }
}



}


function newGame(){
    counter = 0;
    msg.textContent = "Choose 6 numbers";
    divFinish.style.display = "none";
    allItem.forEach(el => el.classList.remove('item-active'));
    choseItem.innerHTML = "";
    divFinish.innerHTML = "";
    correct.textContent = "";
    dataChose.length = 0;
    chosees.length = 0;
    yourNumber.innerHTML = '';
    document.querySelector('.ads')
    .style.opacity = 1;
    document.querySelector('.ads')
    .style.display = "none";
}

function ads(e){
    this.style.opacity = 0;
   divFinish.style.display = 'none';
   boxGame.nextElementSibling.style.display = 'none';
   counter = 5;
   if(e.target.classList.contains('item')){
     dataChose.push(Number(e.target.innerHTML))
     console.log(e.target.innerHTML);
   }
}

document.querySelector('.ads')
.addEventListener('click', ads)