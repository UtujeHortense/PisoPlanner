
const players = ["Sara", "Hortense", "Celía", "Laia", "Alba", "Berta"]
var pairs = [[players[0], players[1]], [players[2], players[3]], [players[4], players[5]]]

var currentDate = thisweek();
var checkNext;
//check if next week has already started
getsaveddate().then(data => {console.log("after saved", data.nextweek); checkNext = data.nextweek;})
console.log("first date check", currentDate.toDateString() == checkNext)
if (currentDate.toDateString == checkNext) {
    updateTables()
}
nextDate = nextweek();
// save next week date in a database
datepayload = {nextweek: nextDate.toDateString()}
savedate(datepayload).then(data => {console.log("after saving", data);})

var nextnextDate = nextnextweek(nextDate)


window.onload = function() {
    //when the document is finished loading, replace everything with dates
document.getElementById("thisweek").innerHTML=currentDate.toDateString();
document.getElementById("nextweek").innerHTML=nextDate.toDateString();
document.getElementById("nextnextweek").innerHTML=nextnextDate.toDateString();
setTables();
} 

function thisweek() {
    var today = new Date();
    weekDay = today.getDay().toString();
    count = weekDay - 1;
    var thisweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - count);
    return thisweek;
}

function nextweek(){
    var today = new Date();
    weekDay = today.getDay()
    var daysUntilNextMonday = 1 + (7 - weekDay) % 7;
   
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+ daysUntilNextMonday);
    return nextweek;
}

function nextnextweek(nextweek){
    var nextnextweek = new Date(nextweek.getFullYear(), nextweek.getMonth(), nextweek.getDate()+7);
    return nextnextweek;
}


async function setTables() {
    //rotate 3 times due to the number of tasks
    var data = await getindexes();
    iA = data.indexA,
    iB = data.indexB,
    iC = data.indexC,
    document.getElementById("grpA1").innerHTML= pairs[iA[0]];
    document.getElementById("grpA2").innerHTML= pairs[iA[1]];
    document.getElementById("grpA3").innerHTML= pairs[iA[2]];

    document.getElementById("grpB1").innerHTML= pairs[iB[0]];
    document.getElementById("grpB2").innerHTML= pairs[iB[1]];
    document.getElementById("grpB3").innerHTML= pairs[iB[2]];

    document.getElementById("grpC1").innerHTML= pairs[iC[0]];
    document.getElementById("grpC2").innerHTML= pairs[iC[1]];
    document.getElementById("grpC3").innerHTML= pairs[iC[2]];

}

async function getindexes() {
    let obj;
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    const res = await fetch('https://easy-blue-cod-toga.cyclic.app/getindexes', options)
  
    obj = await res.json();
  
    console.log(obj)
    return obj;
  }

async function setindexes(payload) {
    let obj;
    const options = {method: 'POST', body: payload ,  headers: {Accept: 'application/json', 'Content-Type': 'application/json'}};
    const res = await fetch('https://easy-blue-cod-toga.cyclic.app/setindexes', options)
  
    obj = await res.json();
  
    console.log(obj)
    return obj;
  }
  
async function setdate(payload) {
    let obj;
    const options = {method: 'POST', body: payload ,  headers: {Accept: 'application/json', 'Content-Type': 'application/json'}};
    const res = await fetch('https://easy-blue-cod-toga.cyclic.app/setnextmonday', options)
  
    obj = await res.json();

    return obj;
  }

async function getdate(payload) {
    let obj;
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    const res = await fetch('https://easy-blue-cod-toga.cyclic.app/getnextmonday', options)
    obj = await res.json();
    return obj;
  }
  
async function getsaveddate() {
    const date = await getdate();
    return date.nextweek;
}

async function savedate(payload) {
    const date = await setdate(JSON.stringify(payload));
    return date;
}

async function updateTables() {
    //connect to database
    
    var data = await getindexes();
    indexesA = data.indexA,
    indexesB = data.indexB,
    indexesC = data.indexC,

    iA = calculateIndex(indexesA)
    iB = calculateIndex(indexesB)
    iC = calculateIndex(indexesC)

    console.log("a1:", iA)
    console.log("b1:", iB)
    console.log("c1:", iC)
    payload = {
        indexA: iA,
        indexB: iB,
        indexC: iC
    }
    await setindexes(JSON.stringify(payload))
    setTables();
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
