const pandemicStartMap = "XX0X10010X000X010X0";

const arrPandemic = pandemicStartMap.split('');
const li = className => `<li class=${className}></li>`;
const ulStart = document.querySelector('#pandemic-start');
const ulEnd = document.querySelector('#pandemic-end');
const total = document.querySelector('#total');
const infected = document.querySelector('#infected');
const percentage = document.querySelector('#percentage');

let infectedPeople = 0;
let percentageInfected = 0;
let totalPeople = 0;

const zone = {
    "0": "uninfected",
    "1": "infected",
    "X": "ocean"
};

const indexZone = arrPandemic.reduce((accamulate, charter, index) => {
    const type = zone[charter];
    return {
        ...accamulate,
        [type]: [...accamulate[type], index]
    }
}, {
    uninfected: [],
    infected: [],
    ocean: [],
});

console.log(indexZone);

const oceanSide = [];

for (let i = 0; i < indexZone.ocean.length; i++) {
    const indexOcean = indexZone.ocean[i];
    const oceanEnd = indexZone.ocean[i + 1];

    if (i === 0) {
        const infectedInOcean = indexZone.infected.find(a => a >= 0 && a <= indexZone.ocean[0]);
        oceanSide.push({start: 0, end: indexZone.ocean[0],  infected: infectedInOcean ? true : false })
    }

    if (oceanEnd) {
       const infectedInOcean = indexZone.infected.find(a => a >= indexOcean && a <= oceanEnd);
       oceanSide.push({start: indexOcean, end: oceanEnd, infected: infectedInOcean ? true : false })
    }
}



const infectedOceanSide = oceanSide.filter(a => a.infected);


const render = (pandemicMap, ul) => {
    let html = "";
    for (let i = 0; i < pandemicMap.length; i++) {
        const charter = pandemicMap[i];
        html += li(zone[charter]);
    }
    ul.innerHTML = html;
};



const changePandemicMap = () => {
    let newMap = [...arrPandemic];
    for (let i = 0; i < infectedOceanSide.length; i++) {
        const {start, end} = infectedOceanSide[i];
        for (let j = 0; j < newMap.length; j++) {
            if (j > start && j < end) {
                newMap[j] = '1';
            } else {
                if (j === 0 && start === 0) {
                    newMap[j] = '1';
                }
            }
        }
    }
    return newMap.join('');

};


let newMap = changePandemicMap().split('');
console.log(newMap);

const addText = (map) => {
    newMap.forEach((item) => {
        if (item == '1') {
            infectedPeople = infectedPeople + 1;
            totalPeople = totalPeople + 1;
        } else if (item == '0') {
            totalPeople = totalPeople + 1;
        }
    });
    total.insertAdjacentHTML('beforeend', totalPeople);
    infected.insertAdjacentHTML('beforeend', infectedPeople);
}

addText(newMap);

const findPercentage = (total, infected) => {
    percentageInfected = infected / total * 100;
    percentage.insertAdjacentHTML('beforeend', percentageInfected)
}

findPercentage(totalPeople, infectedPeople)


render(changePandemicMap(), ulEnd); // вызвать функцию с изменением карты
render(pandemicStartMap, ulStart); //вызвать функцию без изменения карты