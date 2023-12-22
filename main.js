import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

C.init = function () {
  V.init();
  
  let hoursVolume = M.getCountsByWeek()
  V.ChartVolume(hoursVolume);
  
  C.initIT3()
  // Visualisation par défaut de l'itération 2
  let data1 = M.getCountsByWeekWithCourse('CM', "0")
  let data2 = M.getCountsByWeekWithCourse('TD', "0")
  let data3 = M.getCountsByWeekWithCourse('TP', "0")
  V.CreateStackedBar(data1, data2, data3)



  window.scrollTo(0, 0)
  
  let it3 = document.querySelector('#select-it3');
  it3.addEventListener('change', C.handler_changeOnGroup3);

  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);


  // Iteration 4
  let dataBut1G1 = M.getClosingHoursByAllDays('BUT1-G1')
  let dataBut1G21 = M.getClosingHoursByAllDays('BUT1-G21')
  let dataBut1G22 = M.getClosingHoursByAllDays('BUT1-G22')
  let dataBut1G3 = M.getClosingHoursByAllDays('BUT1-G3')

  let dataBut2G1 = M.getClosingHoursByAllDays('BUT2-G1')
  let dataBut2G21 = M.getClosingHoursByAllDays('BUT2-G21')
  let dataBut2G22 = M.getClosingHoursByAllDays('BUT2-G22')
  let dataBut2G3 = M.getClosingHoursByAllDays('BUT2-G3')

  let dataBut3G1 = M.getClosingHoursByAllDays('BUT3-G1')
  let dataBut3G21 = M.getClosingHoursByAllDays('BUT3-G21')
  let dataBut3G22 = M.getClosingHoursByAllDays('BUT3-G22')
  let dataBut3G3 = M.getClosingHoursByAllDays('BUT3-G3')
  V.endOfCourseTime(dataBut1G1, dataBut1G21, dataBut1G22, dataBut1G3, dataBut2G1, dataBut2G21, dataBut2G22, dataBut2G3, dataBut3G1, dataBut3G21, dataBut3G22, dataBut3G3)
  

}


// Itération 2
C.handler_changeOnGroup = function (ev) {
  

  if (ev.target.value == 'all') {
    let data1 = M.getCountsByWeekWithCourse('CM', "0")
    let data2 = M.getCountsByWeekWithCourse('TD', "0")
    let data3 = M.getCountsByWeekWithCourse('TP', "0")

    V.CreateStackedBar(data1, data2, data3)
  }
  else {

    let data1 = M.getCountsByWeekWithCourse('CM', ev.target.value)
    let data2 = M.getCountsByWeekWithCourse('TD', ev.target.value)
    let data3 = M.getCountsByWeekWithCourse('TP', ev.target.value)

    V.CreateStackedBar(data1, data2, data3)

  }

}


// Itération 3
C.handler_changeOnGroup3 = function (ev) {
  let TABS1R = []
  let TABS2R = []
  let TABS1S = []
  let TABS2S = []


  if (ev.target.value == 'all' || ev == 'all') {
    TABS1R.push(M.getCountsByWeekSemester('CM', '0', 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TD', '0', 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TP', '0', 'S1'))

    TABS2R.push(M.getCountsByWeekSemester('CM', '0', 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TD', '0', 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TP', '0', 'S2'))

    TABS1S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))

    TABS2S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))
    
    V.CreateRadar(TABS1R, TABS2R, TABS1S, TABS2S)
  }
  else {
    TABS1R.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1'))

    TABS2R.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S2'))

    TABS1S.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1S'))

    TABS2S.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1S'))
    
    V.CreateRadar(TABS1R, TABS2R, TABS1S, TABS2S)
  }

}

// Initialisation Itération 3
C.initIT3 = function () {
  let TABS1R = []
  let TABS2R = []
  let TABS1S = []
  let TABS2S = []

  TABS1R.push(M.getCountsByWeekSemester('CM', '0', 'S1'))
  TABS1R.push(M.getCountsByWeekSemester('TD', '0', 'S1'))
  TABS1R.push(M.getCountsByWeekSemester('TP', '0', 'S1'))

  TABS2R.push(M.getCountsByWeekSemester('CM', '0', 'S2'))
  TABS2R.push(M.getCountsByWeekSemester('TD', '0', 'S2'))
  TABS2R.push(M.getCountsByWeekSemester('TP', '0', 'S2'))

  TABS1S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
  TABS1S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
  TABS1S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))

  TABS2S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
  TABS2S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
  TABS2S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))

  V.CreateRadar(TABS1R, TABS2R, TABS1S, TABS2S)
}


C.init();



//test