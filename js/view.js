// import Calendar from '@toast-ui/calendar';

// import '@toast-ui/calendar/dist/toastui-calendar.min.css';

// import { defineConfig } from 'vite';



let V = {};



V.init = function () {



}



V.generateWeekNumbers = function () {
    const weekNumbers = [];
    // Génère les nombres de semaine de 36 à 52

    for (let i = 36; i <= 52; i++) {

        weekNumbers.push(i);
    }

    // Génère les nombres de semaine de 1 à 7

    for (let i = 1; i <= 7; i++) {

        weekNumbers.push(i);
    }

    return weekNumbers;

}





export { V };