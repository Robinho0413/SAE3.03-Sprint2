import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

M.init = async function () {
    let data = await fetch('./data/mmi1.ics');
    data = await data.text();
    data = ical.parseICS(data);
    Events.mmi1 = new EventManager('mmi1', 'MMI 1', 'Agenda des MMI 1');
    Events.mmi1.addEvents(data);
    let data2 = await fetch('./data/mmi2.ics');
    data2 = await data2.text();
    data2 = ical.parseICS(data2);
    Events.mmi2 = new EventManager('mmi2', 'MMI 2', 'Agenda des MMI 2');
    Events.mmi2.addEvents(data2);

    let data3 = await fetch('./data/mmi3.ics');
    data3 = await data3.text();
    data3 = ical.parseICS(data3);
    Events.mmi3 = new EventManager('mmi3', 'MMI 3', 'Agenda des MMI 3');
    Events.mmi3.addEvents(data3);
}

M.getEvents = function (annee) {
    if (annee in Events) {
        return Events[annee].toObject();
    }
    return null;
}

M.getConcatEvents = function () {
    let allEv = []
    for (let ev in Events) {
        if (Events[ev] !== null && typeof Events[ev] !== 'undefined') {
            allEv = allEv.concat(Events[ev].toObject());
        }
    }
    return allEv;
}




// Itération 2 : Récupère tout les events ou le cours(course) est à l'intérieur.
M.getEventsWithCourse = function (course) {
    let allEv = M.getConcatEvents();

    return allEv.filter(ev => ev.type == course);

};

M.getEventsWithGroup = function (group) {
    let allEv = M.getConcatEvents();

    return allEv.filter(ev => ev.groups.includes(group));

};



Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}




// Fonction Initial qui formate le tableau d'objet.
M.FormatResults = function (result) {
    let res2023 = result.slice(36);
    let res2024 = result.slice(1, 8);
    return [...res2023, ...res2024];
}


// Fonction Itération 1
M.getCountsByWeek = function () {
    let res = new Array(53);
    for (let i = 0; i < res.length; i++) {
        res[i] = 0;
    }

    let allCalendars = M.getConcatEvents();

    for (let cm of allCalendars) {
        let nw = cm.start.getWeek();
        let duration = (cm.end - cm.start) / (1000 * 60 * 60);
        res[nw] += duration;
    }



    const resultArray = M.FormatResults(res);

    //console.log(resultArray);

    return resultArray;
};



// Fonction Itération 2 
M.getCountsByWeekWithCourse = function (course, value) {
    let res = new Array(53);
    for (let i = 0; i < res.length; i++) {
        res[i] = 0;
    }

    let allCalendars = M.getEventsWithCourse(course);

    let eventByGroup = [];


    if (value !== '0') {

        // allCalendars.filter(ev => ev.groups.includes(value))
        for (let cal of allCalendars) {
            if (cal.groups.includes(value)) {
                eventByGroup.push(cal);
            }
        }
        for (let cm of eventByGroup) {
            let nw = cm.start.getWeek();
            let duration = (cm.end - cm.start) / (1000 * 60 * 60);
            res[nw] += duration;
        }
    }

    else {
        for (let cm of allCalendars) {
            let nw = cm.start.getWeek();
            let duration = (cm.end - cm.start) / (1000 * 60 * 60);
            res[nw] += duration;
        }
    }


    const resultArray = M.FormatResults(res);


    //console.log(resultArray);

    return resultArray;
};


// Fonction Itération 3 
M.getCountsByWeekSemester = function (course, value, semester) {
    let allCalendars = M.getEventsWithCourse(course);
    let CalS1R = [];
    let Total = 0; 
    

    if (semester == 'S1') {
        for (let ev of allCalendars) {
            if (ev.title.includes('R1') || ev.title.includes('R3') || ev.title.includes('R5')) {
                CalS1R.push(ev);
            }
        }
    }

    else if (semester == 'S2'){
        for (let ev of allCalendars) {
            if (ev.title.includes('R2') || ev.title.includes('R4') || ev.title.includes('R6')) {
                CalS1R.push(ev);
            }
        }
    }

    else if (semester == 'S1S'){
        for (let ev of allCalendars) {
            if (ev.title.includes('SAÉ 1') || ev.title.includes('SAÉ 3') || ev.title.includes('SAÉ 5') || ev.title.includes('SAE 1') || ev.title.includes('SAE 3') || ev.title.includes('SAE 5')) {
                CalS1R.push(ev);
            }
        }
    }

    else if (semester == 'S2S'){
        for (let ev of allCalendars) {
            if (ev.title.includes('SAÉ 2') || ev.title.includes('SAÉ 4') || ev.title.includes('SAÉ 6') || ev.title.includes('SAE 2') || ev.title.includes('SAE 4') || ev.title.includes('SAE 6')) {
                CalS1R.push(ev);
            }
        }
    }


    if (value == '0') {
        for (let cm of CalS1R) {
            let duration = (cm.end - cm.start) / (1000 * 60 * 60);
            Total += duration;
        }
    } else {
        let eventByGroup = [];
        for (let cal of CalS1R) {
            if (cal.groups.includes(value)) {
                eventByGroup.push(cal);
            }
        }
        for (let cm of eventByGroup) {
            let duration = (cm.end - cm.start) / (1000 * 60 * 60);
            Total += duration;
          
        }
    }

   
    return Total;
};

// Fonction Itération 4
M.getClosingHoursByDay = function(group, day) {
    // Filtrage par groupe
    let allEvByGroup = M.getEventsWithGroup(group);

    // Filtrage par jour
    allEvByGroup = allEvByGroup.filter(ev => ev.end.toString().includes(day));

    
    // Objet pour regrouper les cours par date
    let coursParDate = {};

    for(let evByGroup of allEvByGroup){
        let dateKey = evByGroup.end.toISOString().split('T')[0];


        if (!coursParDate[dateKey]) {
            coursParDate[dateKey] = [];
        }

        coursParDate[dateKey].push(evByGroup);
    }

    // création d'un tableau regroupant les cours se finissant le plus tard pour chaque jour
    let allLastCourse = [];

    for(let date in coursParDate){

        let lastCourse = coursParDate[date][coursParDate[date].length - 1]
        allLastCourse.push(lastCourse)


    }


    // calcul moyenne
    let nbEv = 0
    let totalHeures = 0

    for(let heures of allLastCourse){
        totalHeures = totalHeures + heures.end.getHours();

        nbEv = nbEv + 1;
    }


    let average = totalHeures / nbEv;
    let roundAverage = average.toFixed(1);
    return roundAverage
}

// Fonction Itération 4
M.getClosingHoursByAllDays = function(group){
    let days = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri'
    ]

    let dayCourses = []

    for(let day of days){
        let dayCourse = M.getClosingHoursByDay(group, day)
        dayCourses.push(dayCourse)
    }

    return dayCourses

}







export { M };