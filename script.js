const boxGame = document.querySelector('.box-game');
const choseItem = document.getElementById('chose-list');
let counter = 0;

const dataChose = [];


boxGame.addEventListener('click',logicGame);

function logicGame(e){
    if(e.target.classList.contains('item')){
        counter++;
        if(counter <= 6){
            e.target.classList.add('item-active');
            dataChose.push(Number(e.target.innerHTML));
        }else{
            document.querySelector('.finish')
            .style.display = "block";
            //e.target.closest('.box-game').style.opacity = 0.5;
            const btn = document.createElement('button');
            btn.textContent = "Submit";
            btn.setAttribute('class', 'submitBtn');
            e.target.closest('.box-game').insertAdjacentElement('afterend', btn);
            document.querySelector('#msg')
            .textContent = "Game Start";
            document.getElementById('correct')
            .textContent = "0"
            btn.addEventListener('click', startGame)
        }
    }
}

function startGame(){
    this.style.display = "none";
    const myGameCounter = setInterval(randomBumber,1000);
    let correct = 0;
    function randomBumber(){
        const numNumber = Math.floor(Math.random() * (21 - 1 + 1)) + 1;
        document.querySelector('#msg')
        .textContent = "Your Chance :"
        counter--;
        if(counter !== 0) {
            choseItem.innerHTML += `<li class="chose-${numNumber} item">${numNumber}</li>`;
            if(dataChose.includes(numNumber)){
                correct++;
                document.getElementById('correct')
                .textContent = correct;
                document.querySelector(`.chose-${numNumber}`)
                .style.backgroundColor = "#21ED4A";
                document.querySelector(`.chose-${numNumber}`)
                .style.color = "#fff";
            }
        }else{
            clearInterval(myGameCounter);
            document.querySelector('.finish')
            .innerHTML = `<button class="newGame">New Game</button>`;
            document.querySelector('.newGame')
            .addEventListener('click', newGame);
        }
        
    }
}





function newGame(){
    counter = 0;
    document.querySelector('#msg')
    .textContent = "Choose 6 numbers";
    document.querySelector('.finish')
    .style.display = "none";
    //boxGame.removeEventListener('click', logicGame);
    document.querySelectorAll('.item')
    .forEach(el => el.classList.remove('item-active'));
    choseItem.innerHTML = "";
    document.querySelector('.finish')
    .innerHTML = "";
    document.getElementById('correct')
            .textContent = ""
}