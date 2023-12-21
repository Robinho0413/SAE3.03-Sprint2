import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

C.init = function () {
  V.init();

  // Visualisation par défaut de l'itération 2
  let data1 = M.getCountsByWeekWithCourse('CM', "0")
  let data2 = M.getCountsByWeekWithCourse('TD', "0")
  let data3 = M.getCountsByWeekWithCourse('TP', "0")
  V.CreateStackedBar(data1, data2, data3)

  let hoursVolume = M.getCountsByWeek()
  V.ChartVolume(hoursVolume);


  // V.endOfCourseTime();


  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);

  //iteration 4
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


C.init();