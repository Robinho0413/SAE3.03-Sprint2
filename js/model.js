import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

Date.prototype.getWeek = function() {
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

M.getHoursbyWeek = function () {
    let allCalendars = M.getConcatEvents();
    let weekNumbers = [];

    for (let event of allCalendars) {
        let weekNumber = M.getWeekNumber(event.start);
        weekNumbers.push(weekNumber);
    }

    return weekNumbers;
}


M.getWeekNumber = function (dateEv) {
    const date = new Date(dateEv);
    const weekNumber = date.getWeek();
    return weekNumber;
}


M.getCountsByWeek = function () {
    let allCalendars = M.getConcatEvents();


    const countsByWeek = allCalendars.reduce((acc, event) => {
        const weekNumber = M.getWeekNumber(event.start);
        acc[weekNumber] = (acc[weekNumber] || 0) + 1;
        return acc;
    }, {});


    const countsArray = Object.values(countsByWeek);

    return countsArray;
}




M.init = async function() {
    let data = await fetch('./data/mmi1.ics');
    data = await data.text();
    data = ical.parseICS(data);
    Events.mmi1 = new EventManager('mmi1', 'MMI 1', 'Agenda des MMI 1');
    Events.mmi1.addEvents(data);
}

M.getEvents = function(annee) {
    if ( annee in Events ) {
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







/*M.getHours = function () {
    let allHours = []
    for (let )
}*/



export { M };


/*
    On notera que si tout ce qui est dans ce fichier concerne le modèle, seul ce qui est dans M est exporté (et donc accessible depuis l'extérieur).
    C'est une façon de faire qui permet de garder privé les données "réelles" qui sont dans Events mais dont la visibilité est limitée à ce module/fichier.
    Donc il faut voir M comme la partie publique de la vue et le reste comme la partie privée.
    C'est sensiblement différent de ce qu'on faisait jusqu'à présent où tout était dans l'objet M.
    L'utilisation des modules javascript nous permet ici de choisir ce que l'on veut rendre public ou privé.
    C'est une autre façon d'implémenter le concept d'encapsulation sans avoir à utiliser les classes.
    A noter qu'on aurait pu faire une classe "Model" mais dans la mesure où l'on n'aurait qu'une seule instance de Model, ce n'est pas vraiment utile.
    
*/