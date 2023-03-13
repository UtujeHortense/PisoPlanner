
const players = ["Sara", "Hortense", "Celía", "Laia", "Alba", "Berta"]
var pairs = [[players[0], players[1]], [players[2], players[3]], [players[4], players[5]]]

console.log(players)
console.log(pairs)

var currentDate = thisweek();

if (currentDate == nextDate) {
    updateTables()
}
var nextDate = nextweek();
var nextnextDate = nextnextweek(nextDate)

window.onload = function() {
    //when the document is finished loading, replace everything with dates
document.getElementById("thisweek").innerHTML=currentDate.toDateString();
document.getElementById("nextweek").innerHTML=nextDate.toDateString();
document.getElementById("nextnextweek").innerHTML=nextnextDate.toDateString();
} 

function nextweek(){
    var today = new Date();
    weekDay = today.getDay().toString();
    if (weekDay == 1) {
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    }
    return nextweek;
}

function nextnextweek(nextweek){
    var nextnextweek = new Date(nextweek.getFullYear(), nextweek.getMonth(), nextweek.getDate()+7);
    return nextnextweek;
}

function thisweek() {
    var today = new Date();
    weekDay = today.getDay().toString();
    count = weekDay - 1;
    var thisweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - count);
    return thisweek;
}

function timeManager() {
    //check time now
    
    // Display the calculated result      
    console.log("Week number of " + currentDate.toDateString())
    console.log("Next week of " + nextDate.toDateString())
    //set week now interval - check next week
    //set date in table1
    //set date in table2
}

function setTables() {
    //rotate 3 times due to the number of tasks

    document.getElementById("grpA1").innerHTML= pairs[1];
    document.getElementById("grpA2").innerHTML= pairs[2];
    document.getElementById("grpA3").innerHTML= pairs[0];

    document.getElementById("grpB1").innerHTML= pairs[0];
    document.getElementById("grpB2").innerHTML= pairs[1];
    document.getElementById("grpB3").innerHTML= pairs[2];

    document.getElementById("grpC1").innerHTML= pairs[2];
    document.getElementById("grpC2").innerHTML= pairs[0];
    document.getElementById("grpC3").innerHTML= pairs[1];

    // save in local storage

    indexesA = [1,2,0];
    indexesB = [0,1,2];
    indexesC = [2,0,1];
}

function updateTables() {
    indexesA = [1,2,0];
    indexesB = [0,1,2];
    indexesC = [2,0,1];

    iA = calculateIndex(indexesA)
    iB = calculateIndex(indexesB)
    iC = calculateIndex(indexesC)

    console.log("a1:", iA)
    console.log("b1:", iB)
    console.log("c1:", iC)

    // update this week
    // update next week

    //update next next week
}

function calculateIndex(indexes) {
    for (x = 0 ; x < 3; x++) {
        if (indexes[x] == 0) {
            indexes[x] = 2;
        } else {
            indexes[x] = indexes[x] -1;
        }
    }
    return indexes;
}
