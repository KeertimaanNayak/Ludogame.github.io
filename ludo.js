var currPos = 0;
var step = 47; //47 is distance between two consecutive blocks on board
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
var allcolor = ["red", "blue", "green", "yellow"];
var pawnOut = {red:0,blue:0,green:0,yellow:0}
function randomNum() {
    if (!clicked){
        num= Math.floor((Math.random() * 6) + 1);
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url( " + num + ".jpg)";
        clicked = true;
    }
    if (num != 6&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "You stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}
function Kill() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < allcolor.length; i++) {
        for (var n = 1; n <= 4; n++) {
            var firstPawn = document.getElementById(allcolor[i] + "pawn" + n);
            var secondPawn=document.getElementById(currpawn);
            if (firstPawn.style.top==secondPawn.style.top&&firstPawn.style.left==secondPawn.style.left&&currcolor!=allcolor[i]&&currPos+num<56) {
                count++;
                toKill = allcolor[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0||currPos+num>56) {
        if (DontHaveOtherFree()||currPos+num>56) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "You stuck";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}
function changePlayer() {
    if (num != 6){
    var text = document.getElementById('player');
    switch (text.innerText) {
        case "red": text.innerText = text.style.color = "blue"; break; // changes colour and player info when showing whose turn
        case "blue": text.innerText = text.style.color = "yellow"; break;
        case "yellow": text.innerText = text.style.color = "green"; break;
        case "green": text.innerText = text.style.color = "red"; break;
    }
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(dice.gif)";
}
//refers to position of pawns 
var positions = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
var onboard = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i <=4; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i]+num>=56) return false;
    }
    return true;
}
//If number of pawns that is out is 4 then winner
function CheckForWinner() {
    if (pawnOut[currcolor] == 4) {
        var dice = document.getElementById("dice");
        var player = document.getElementById("player");
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden"; //Remove dice as finally we have winner
        uselesstext1.innerText = ""; // Removed to announce winner
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}
function stepDown() {
    var doc = document.getElementById(currcolor + "pawn"+NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, '')); //Removes px from the value of doc.style.top or rsther replaces px with " "
    doc.style.top = (curr+step)+'px';
    currPos++;
}
function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}
function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}
function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
function stepDiagonalred() {
    var doc = document.getElementById(currpawn);
    var curr1 = Number(doc.style.top.replace(/[a-z]/g, ''));
    var curr2 = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.top = (curr1 - step) + 'px';
    doc.style.left = (curr2 - step) + 'px';
    currPos++;
}
function stepDiagonalgreen() {
    var doc = document.getElementById(currpawn);
    var curr1 = Number(doc.style.top.replace(/[a-z]/g, ''));
    var curr2 = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.top = (curr1 - step) + 'px';
    doc.style.left = (curr2 + step) + 'px';
    currPos++;
}
function stepDiagonalyellow() {
    var doc = document.getElementById(currpawn);
    var curr1 = Number(doc.style.top.replace(/[a-z]/g, '')); 
    var curr2 = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.top = (curr1 + step) + 'px';
    doc.style.left = (curr2 + step) + 'px';
    currPos++;
}
function stepDiagonalblue() {
    var doc = document.getElementById(currpawn);
    var curr1 = Number(doc.style.top.replace(/[a-z]/g, ''));
    var curr2 = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.top = (curr1 + step) + 'px';
    doc.style.left = (curr2 - step) + 'px';
    currPos++;
}
var stepsRed = [];
var stepsYellow = [];
var stepsBlue =[];
var stepsGreen =[];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepUp,stepsRed,4);
pushSteps(stepDiagonalred,stepsRed,1);
pushSteps(stepLeft, stepsRed,5);
pushSteps(stepUp, stepsRed,2);
pushSteps(stepRight, stepsRed,5);
pushSteps(stepDiagonalgreen,stepsRed,1);
pushSteps(stepUp, stepsRed,5);
pushSteps(stepRight, stepsRed,2);
pushSteps(stepDown, stepsRed,5);
pushSteps(stepDiagonalyellow,stepsRed,1);
pushSteps(stepRight, stepsRed,5);
pushSteps(stepDown, stepsRed,2);
pushSteps(stepLeft, stepsRed,5);
pushSteps(stepDiagonalblue,stepsRed,1);
pushSteps(stepDown, stepsRed,5);
pushSteps(stepLeft, stepsRed,1);
pushSteps(stepUp, stepsRed,6);
//Blue pawns path
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepDiagonalblue,stepsBlue,1);
pushSteps(stepDown, stepsBlue,5);
pushSteps(stepLeft, stepsBlue,2);
pushSteps(stepUp, stepsBlue,5);
pushSteps(stepDiagonalred,stepsBlue,1);
pushSteps(stepLeft, stepsBlue,5);
pushSteps(stepUp, stepsBlue,2);
pushSteps(stepRight, stepsBlue,5);
pushSteps(stepDiagonalgreen,stepsBlue,1);
pushSteps(stepUp, stepsBlue,5);
pushSteps(stepRight, stepsBlue,2);
pushSteps(stepDown, stepsBlue,5);
pushSteps(stepDiagonalyellow,stepsBlue,1);
pushSteps(stepRight, stepsBlue,5);
pushSteps(stepDown, stepsBlue,1);
pushSteps(stepLeft, stepsBlue,6);

//Yellow pawns path
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepDiagonalyellow,stepsYellow,1);
pushSteps(stepRight, stepsYellow,5);
pushSteps(stepDown, stepsYellow,2);
pushSteps(stepLeft, stepsYellow,5);
pushSteps(stepDiagonalblue,stepsYellow,1);
pushSteps(stepDown, stepsYellow,5);
pushSteps(stepLeft, stepsYellow,2);
pushSteps(stepUp, stepsYellow,5);
pushSteps(stepDiagonalred,stepsYellow,1);
pushSteps(stepLeft, stepsYellow,5);
pushSteps(stepUp, stepsYellow,2);
pushSteps(stepRight, stepsYellow,5);
pushSteps(stepDiagonalgreen,stepsYellow,1);
pushSteps(stepUp, stepsYellow,5);
pushSteps(stepLeft, stepsYellow,1);
pushSteps(stepUp, stepsYellow,6);
//Green pawns path
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepDiagonalgreen,stepsGreen,1);
pushSteps(stepUp, stepsGreen,5);
pushSteps(stepRight, stepsGreen,2);
pushSteps(stepDown, stepsGreen,5);
pushSteps(stepDiagonalyellow,stepsGreen,1);
pushSteps(stepRight, stepsGreen,5);
pushSteps(stepDown, stepsGreen,2);
pushSteps(stepLeft, stepsGreen,5);
pushSteps(stepDiagonalblue,stepsGreen,1);
pushSteps(stepDown, stepsGreen,5);
pushSteps(stepLeft, stepsGreen,2);
pushSteps(stepUp, stepsGreen,5);
pushSteps(stepDiagonalred,stepsGreen,1);
pushSteps(stepLeft, stepsGreen,5);
pushSteps(stepUp, stepsGreen,1);
pushSteps(stepRight, stepsGreen,6);
function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var pawnToMove = document.getElementById(victim);
    switch (victim) {
        case "redpawn1": pawnToMove.style.top = 545 + "px"; pawnToMove.style.left = 505 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 545 + "px"; pawnToMove.style.left = 593 + "px"; break;
        case "redpawn3": pawnToMove.style.top = 625 + "px"; pawnToMove.style.left = 505 + "px"; break;
        case "redpawn4": pawnToMove.style.top = 625 + "px"; pawnToMove.style.left = 593 + "px"; break;
        case "bluepawn1": pawnToMove.style.top = 545 + "px"; pawnToMove.style.left = 930 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 545 + "px"; pawnToMove.style.left = 1020 + "px"; break;
        case "bluepawn3": pawnToMove.style.top = 625 + "px"; pawnToMove.style.left = 930 + "px"; break;
        case "bluepawn4": pawnToMove.style.top = 625 + "px"; pawnToMove.style.left = 1020 + "px"; break;
        case "greenpawn1": pawnToMove.style.top = 115 + "px"; pawnToMove.style.left = 505 + "px"; break;
        case "greenpawn2": pawnToMove.style.top = 115 + "px"; pawnToMove.style.left = 595 + "px"; break;
        case "greenpawn3": pawnToMove.style.top = 195 + "px"; pawnToMove.style.left = 505 + "px"; break;
        case "greenpawn4": pawnToMove.style.top = 195 + "px"; pawnToMove.style.left = 593 + "px"; break;
        case "yellowpawn1": pawnToMove.style.top = 115 + "px"; pawnToMove.style.left = 930 + "px"; break;
        case "yellowpawn2": pawnToMove.style.top = 115 + "px"; pawnToMove.style.left = 1020 + "px"; break;
        case "yellowpawn3": pawnToMove.style.top = 195 + "px"; pawnToMove.style.left = 930 + "px"; break;
        case "yellowpawn4": pawnToMove.style.top = 195 + "px"; pawnToMove.style.left = 1020 + "px"; break;

    }
}
function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    if (num + currPos > 56) {
        Stuck();
    }
    else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || num === 6) {
                    if (onboard[currpawn] === 0) {
                        var doc = document.getElementById(currpawn);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                        //Starting points of pawn just after opening
                        switch (Color) {
                            case "red":
                                doc.style.left = 719 + 'px';
                                doc.style.top = 652 + "px";
                                break;

                            case "yellow":
                                doc.style.left = 813 + 'px';
                                doc.style.top = 88 + "px";
                                break;

                            case "blue":
                                doc.style.left = 1048 + 'px';
                                doc.style.top = 417 + "px";
                                break;

                            case "green":
                                doc.style.left = 484 + 'px';
                                doc.style.top = 323 + "px";
                                break;
                        }
                        onboard[currpawn] = 1;
                    }
                    else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + num; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "yellow":
                                for (i = currPos; i < position + num; i++) {
                                    stepsYellow[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;

                            case "green":
                                for (i = currPos; i < position + num; i++) {
                                    stepsGreen[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        var victim = Kill();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 56) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(dice.gif)";
                }
                else Stuck();
            }
        }
    }
}
