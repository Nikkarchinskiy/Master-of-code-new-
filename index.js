const pandemicStartMap = "01000000X000X011X0X";

const arrPandemic = pandemicStartMap.split('');
const li = className => `<li class=${className}></li>`;
const ul = document.querySelector('#pandemic');

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
})

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


const render = (pandemicMap) => {
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

}




render(changePandemicMap()); // вызвать функцию с изменением карты
// render(pandemicStartMap) вызвать функцию без изменения карты