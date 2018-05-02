/*jslint devel*/
var tileIMGs = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K'];
var board = document.getElementById('board');
var tilesFlipped = [];
var tilesMatch = [];
var i;
var scoreBoard = ['1', '2', '3', '4', '5'];



Array.prototype.doubleShuffle = function () {
    var d;
    for(d=0; d<this.length; d = d+2) {
        this.splice(d+1, 0, this[d]);
    }
    console.log(this);
    var i = this.length;
    var j;
    var temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        console.log(j);
        temp = this[j];
        this [j] = this[i];
        this [i] = temp;
    }
    console.log(this);
    return this;
}

function drawBoard(event) {
    alert("hej")
    event.preventDefault();
    document.getElementById('welcome').style.display = 'none';
    board.style.display = 'flex';

    var gameTiles = document.getElementById('playGame').level.value;
    console.log(gameTiles);
    var gameTileIMGs = tileIMGs.slice(0, gameTiles/2);
    gameTileIMGs = gameTileIMGs.doubleShuffle();

    for (i = 0; i < gameTileIMGs.length; i += 1 ) {
        var content = '';
        content += '<section>';
        content += '<div class="front"></div>'
        content += '<div class="back"></div>'
        content += '<div class="back">' + gameTileIMGs[i] + '</div>'
        content += '</section>';

        board.insertAdjacentHTML('beforeend', content);
    }
}

function newGame() {
    board.innerHTML = '';
    board.style.display = 'none';
    document.getElementById('welcome').style.display = 'flex';
    document.getElementById('message').classList.remove('show');
}

function endOfGame() {
    if (board.querySelectorAll('section').length === board.getElementsByClassName('reward').length) {
        document.getElementById('message').classList.add('show');
    }

}

function flipBack() {
    var tiles = board.querySelectorAll('section');
    tiles[tilesFlipped[0]].classList.remove('flipped');
    tiles[tilesFlipped[0]].classList.remove('flipped');
    tilesFlipped = [];
    tilesMatch = [];
    setTimeout(endOfGame, 500);
    board.style.pointerEvents = 'auto';
}

function twotiles(tiles) {
    if (tilesFlipped.length >= 2) {
        board.style.pointerEvents = 'none';
        if (tilesMatch[0] === tilesMatch[1] ) {
            tiles[tilesFlipped[0]].classList.add('reward');
            tiles[tilesFlipped[1]].classList.add('reward');
            tilesFlipped = [];
            tilesMatch = [];
            scoreBoard();
            setTimeout(endOfGame, 500);
            board.style.pointerEvents = 'auto';
        } else {
            setTimeout(flipBack, 1500);
        }
    }

}

function fliptile(event) {
    alert("hej")
    var tiles = Array.from(board.querySelectorAll('section'));
    if (event.target !== event.currentTarget && event.touches.length === 1) {
        console.log(event.target.parentNode.classList.contains('flipped'))
        if (!event.target.parentNode.classList.contains('flipped')) {
        event.target.parentNode.classList.add('flipped');
        tilesFlipped.push(tiles.indexOf(event.target.parentNode));
        tilesMatch.push(event.target.nextElementSibling.innerHTML);
        console.log(tilesMatch);
        console.log(tilesFlipped);
        twotiles(tiles);
    }
}

function scoreBoard () {
    if (typeOf(Storage) !== "undefined") {
        localStorage.scoreBoard = Number(localStorage.scoreBoard) + 1;
        var content = 'Du har fået' + localStorage.scoreBoard + 'stik.';
        document.getElementById('result').innerHTML = content;
    }
}

    document.getElementById('playGame').addEventListener('submit', drawBoard);
    board.addEventListener('touchstart', fliptile);
    document.getElementById('message').querySelector('button').addEventListener('click', newGame)}
