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


  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);

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