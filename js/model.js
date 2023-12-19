import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

M.init = async function() {
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
        let weekNumber = new Date(event.start).getWeek();
        weekNumbers.push(weekNumber);
    }

    return weekNumbers;
};



M.getCountsByWeek = function () {
    let allCalendars = M.getConcatEvents();
  
    const durationByWeek = allCalendars.reduce((acc, event) => {
      const weekNumber = new Date(event.start).getWeek();
      const startDateTime = new Date(event.start).getTime();
      const endDateTime = new Date(event.end).getTime();
      const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
  
      acc[weekNumber] = (acc[weekNumber] || 0) + durationInHours;
      return acc;
    }, {});
  
    const sortedDurationArray = Object.entries(durationByWeek)
      .map(([weekNumber, duration]) => ({ weekNumber: parseInt(weekNumber), duration }))
      .sort((a, b) => a.weekNumber - b.weekNumber)
      .map(entry => entry.duration);
  
    // Utilisez slice(6) pour commencer à la 7e valeur du tableau
    const resultArray = sortedDurationArray.slice(6).concat(sortedDurationArray.slice(0, 6));
  
    console.log(resultArray);
  
    return resultArray;
  };
  
  


export { M };
