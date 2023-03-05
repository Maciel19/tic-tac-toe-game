const selectBox = document.querySelector(".selectBox"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let isBotPLaying = false



window.onload = ()=> {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }


    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");

    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","player active players X ");
    }
 
 
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSing = "X";
let runBot = true;

function clickedBox(element){
    if (!isBotPLaying){

        if(players.classList.contains("X")){
            playerSing = "O";
            element.innerHTML = `<i class="${playerOIcon}"></
            i>`;
            players.classList.add("active");
            element.setAttribute("id", playerSing);
        } else{
            playerSing = "X"
            element.innerHTML = `<i class="${playerXIcon}"></
            i>`;
            players.classList.add("active");
            element.setAttribute("id", playerSing);
     
        }
        selectWinner();
        isBotPLaying = true
        element.style.pointerEvents = "none";
        let randomDelayTime = ((Math.random() * 1000) + 200).
        toFixed();
        setTimeout(()=>{
            bot(runBot);
        },randomDelayTime);
    }
  

}
 
function bot(runBot){
    if(runBot){
    let array = [];
    playerSing = "O"
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0){
        if(players.classList.contains("X")){
            playerSing = "X"
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></
            i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",
            playerSing);

        } else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></
            i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",
            playerSing);
    }
    selectWinner();
    isBotPLaying = false
}
  allBox[randomBox].style.pointerEvents = "none";
}}

function getClass(indname){
    return document.querySelector(".box" + indname).id;

}
function checkClass(val1, val2, val3, sing){
    if(getClass(val1) == sing && getClass(val2)== sing && 
    getClass(val3) == sing){
        return true;

    }
}
function selectWinner(){
    if(checkClass(1,2,3,playerSing) || checkClass(4,5,6,
        playerSing) || checkClass(6,7,8,playerSing) || checkClass(1,4,7,
            playerSing) || checkClass(2, 5, 8, playerSing) || checkClass(3,6,9,playerSing) || 
            checkClass(3,5,9,playerSing) || checkClass(3,5,7,playerSing) || checkClass(1,5,9,playerSing) || checkClass(7,8,9,playerSing))
            {
                runBot = false;
                bot(runBot);
                setTimeout(()=>{
                    playBoard.classList.remove("show");
                    resultBox.classList.add("show");
                },700);
                wonText.innerHTML = `Jogador <p>${playerSing}</p> Ganhou!`
            } else{
                if(getClass(1) != "" && getClass(2) != "" && 
                getClass(3) != "" && getClass(4) != "" && 
                getClass(5) != "" && getClass(6) != "" && 
                getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
                    runBot = false;
                    bot(runBot);
                    setTimeout(()=>{
                        playBoard.classList.remove("show");
                        resultBox.classList.add("show");
                    },700);
                    wonText.innerHTML = `Jogo Empatou!`;''
                }
            }

            

}
replayBtn.onclick = () => {
    window.location.reload();
}