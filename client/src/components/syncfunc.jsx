import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import data from "../fids.json";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";

export default function Syncfunc() {
  const myEvents = React.useMemo(() => {
    const list = [];
    let r = 0;

    data.forEach((item) => {
      r = r + 1;
      var s1 = item.ResourceAllocations.BAY.Start;
      var f1 = s1.substring(0, 16);
      var s2 = item.ResourceAllocations.BAY.Stop;
      var f2 = s2.substring(0, 16);
      var st = item.standType;
      console.log(f1);
      list.push({
        start: f1,
        end: f2,
        resource: r,
        catergory: st,
      });
    });

    console.log(list);

    return list;

    //   const list = [
    //     {
    //       start: "2023-06-03T10:00",
    //       end: "2023-06-05T10:30",
    //       resource: 1,
    //       title: "Event A",
    //     },
    //     {
    //       start: "2023-06-03T10:30",
    //       end: "2023-06-05T11:30",
    //       resource: 1,
    //       title: "Event B",
    //     },
    //   ];
    // return list;
  }, []);
  return (
    <div className="syncfunc">
      <ScheduleComponent
        eventSettings={{
          dataSource: { myEvents },
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}
