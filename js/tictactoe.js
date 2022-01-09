//This variable keeps track of whose turn it is.
let activePlayer ="X";
//This array stores an array of moves, we use this to determine win conditions.
let selectedSquares =[];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
//this condition ensures a square hasn't been selected already.
//the.some () method is used to check each element of selectedsquare array
//to see if it contains the square number clicked on.
if(!selectedSquares.some(element => element.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);
    if (activePlayer === "X") {
        //if active player is equal to 'X", the x.png is placed in the html.
        select.style.backgroundImage = 'url("images/x.jpeg")';
        //Active player may only be x or o so, if not x it must be o
    } else{
        //if acticeplayer is equal to o the o.png is placed in html.
        select.style.backgroundImage = 'url("images/o.jpeg")';
    }
    //squarenumber and activeplayer are concatented together and added to array.
    selectedSquares.push(squareNumber + activePlayer);
    //This calls a function to check for any win conditions.
    checkWinConditions();
    //This condition is for changing to active player.
    if (activePlayer ==="X") {
        //if active player is 'x' change it to 'o'.
        activePlayer="o";
        //if active player is anything other than x 
    } else {
        //change the activeplayer to 'x'
        activePlayer = "X";
    }


    //This function plays the placement sound.
    audio("./media/place.mp3");
    //This condition checks to see if it is computers turn.
    if(activePlayer ==="o") {
        //this function disables clicking for computer choice.
        disableClick();
        //this function waits 1 second before the computer places images and enables click.
        setTimeout(function (){computersTurn(); }, 1000)
    } 
    return true;
}
//Returning true is needed for our computersturn() function to work

//this function results in a random square being selected.
function computersTurn() {
    //This boolean is needed for our while loop.
    let success = false;
    //this variable stores a random number 0-8
    let pickASquare;
    //this condition allows our while loop to keep trying if a square is selected already
    while(!success){
        //A random number between 0 and 8 is selected
        pickASquare = String(Math.floor(Math.random() *9));
        //if the random number evaluated returns true, the square hasnt been selected yet
        if (placeXOrO(pickASquare)) {
            //this line calls the function.
            placeXOrO(pickASquare);
            //this changes our boolen and ends the loop.
            success = true;
            };
        }
    }
}


//this function parses the selecetedsquares array to search for win conditions
//drawlinline function is called to draw line is condition is met
function checkWinConditions() {
    //x o,1, 2 condition.
    if  (arrayIncludes("0X","1X", "2x")) { drawWinLine (50, 100, 558, 100) }
    // x 3 4 5 con
    else if (arrayIncludes("3X", "4X", "5X")) {drawWinLine(drawWinLine(50, 304, 558, 304)) }
    // x 6 7 8 con
    else if (arrayIncludes("6X", "7X", "8X")) {drawWinLine(50, 508, 558, 508) }
    //x 0 3 6 con
    else if (arrayIncludes("0X", "3X", "6X")) {drawWinLine(100, 50, 100, 558) }
    // x 1 4 7 con
    else if (arrayIncludes("1X", "4X", "7X")) {drawWinLine(304, 50, 304, 558) }
    //x 2 5 8 con
    else if (arrayIncludes("2X", "5X", "8X")) {drawWinLine(508, 50, 508, 558) }
    // x 6 4 2 con
    else if (arrayIncludes("6X", "4X", "2X")) {drawWinLine(100, 508, 510, 90) }
    //x 0 4 8 con
    else if (arrayIncludes("0X", "4X", "8X")) {drawWinLine(100, 100, 520, 520) }
    //o 0 1 2 con
    else if (arrayIncludes("0O", "1O", "2O")) {drawWinLine(50, 100, 558, 100) }
    // o 3 4 5
    else if (arrayIncludes("3O", "4O", "5O")) {drawWinLine(50, 304, 558, 304) }
    // o 6 7 8 con
    else if (arrayIncludes("6O", "7O", "8O")) {drawWinLine(50, 508, 558, 508) }
    //o 0 3 4 5
    else if (arrayIncludes("3O", "4O", "5O")) {drawWinLine(50, 304, 558, 304) }
    // o 6 7 8
    else if (arrayIncludes("6O", "7O", "8O")) {drawWinLine(50, 508, 558, 508) }
    // o 0 3 6
    else if (arrayIncludes("0O", "3O", "6O")) {drawWinLine(100, 50, 100, 558) }
    // o 1 4 7
    else if (arrayIncludes("1O", "4O", "7O")) {drawWinLine(304, 50, 304, 558) }
    // o 2 5 8
    else if (arrayIncludes("2O", "5O", "8O")) {drawWinLine(508, 50, 508, 558) }
    // o 6 4 2
    else if (arrayIncludes("60", "4O", "2O")) {drawWinLine(100, 508, 510, 90) }
    //o 0 4 8
    else if (arrayIncludes("0O", "4O", "8O")) {drawWinLine(100, 100, 520, 520) }
    //this condition checks for tie if none of the above condition register and 9
    //squares are selected to code executes
    else if (selectedSquares.length >= 9) {
        //this functions plays the tie sound
        Audio("");
        //this function sets a .3 timer before the restgame is called
        setTimeout(function() {resetGame(); }, 1000);
    }

    //this function checks if an array includes 3 strings it is used to check win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        //if the 3 var we pass are all included in the array true is returned and our else if con executes the drawinline function
        if (a === true && b === true && c === true) {return true}
    }

}

//audio

//this function makes our body element temp unclickable
function disableClick() {
    //this makes our body unclickable
    body.style.pointerEvents = "none";
    //this makes our body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents="auto";}, 1000);
}

//this function takes a string parameter of the path you set earlier for placment sound
function audio(audioURL) {
    //We create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays our audio sound
    audio.play();
}

//draw line
//this fuction utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html canvas element
    const canvas = document.getElementById("win-lines")
    //this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext("2d");
    //this line indicates where the start of a lines x axis is
    let x1 = coordX1,
    //this line indicates where the sstart of a line y axis is
    y1 = coordY1,
    x2 = coordX2,
    y2 = coordY2,
    x = x1,
    y = y1;


//this function interacts with the canvas
function animateLineDrawing() {
    //this variable creates a loop
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    //this method clears content from last loop interation
    c.clearRect(0, 0, 608, 608)
    //this method starts a new path
    c.beginPath();
    //this method moves us to a starting point for our line,
    c.moveTo(x1, y1)
    //this method indicates the end point in our line
    c.lineTo (x, y)
    //this method sets the width of our line
    c.lineWidth = 10;
    //this method the color of our line
    c.strokeStyle = "rgba(70, 255, 33, .8)";
    //this method draws everything we laid out above
    c.stroke();
    //this condition checks if we've reached the endpoint
    if (x1 <= x2 && y1 <= y2) {
        //this condition adds to tje prev end point
        if (x < x2) { x += 10; } 
        //this adds ten to y endpoint
        if (y < y2) { y += 10; }
        //this cond cancels our animation loop if weve reached the endpoints
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    //this condition is similiar to above
    if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
}

//this function clears our canvas after our win line is drawn
function clear() {
    //this line starts our animation loop.
    const animationLoop = requestAnimationFrame(clear);
    //this line clears our canvas
    c.clearRect(0, 0, 608, 608);
    //this line stops our animation loop
    cancelAnimationFrame(animationLoop);
}

//this line disallows clicking while the win sound is playing
disableClick();
//this line plays the win sound
audio("./media/winGame.mp3") ;
//this line calls our main animation loop
animateLineDrawing();
//this line waits 1 second then, clears canvas resets and allows clicking
setTimeout(function () { clear(); resetGame(); }, 1000);
}

//loop
//this functionresets the game in the event of a tie or win
function resetGame() {
    //this for loop iterates through html square element
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        //this removes our elements bg image
        square.style.backgroundImage=""
    }
    //this resets our array so it is empty and we can start over
    selectedSquares=[];
    }
