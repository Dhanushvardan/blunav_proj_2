import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import data from "../fids.json";
import moment from "moment";

export default function ReactBig() {
  const localizer = momentLocalizer(moment);
  const myEvents = React.useMemo(() => {
    // const list = [];
    // let r = 0;

    // data.forEach((item) => {
    //   r = r + 1;
    //   var s1 = item.ResourceAllocations.BAY.Start;
    //   var f1 = s1.substring(0, 16);
    //   var s2 = item.ResourceAllocations.BAY.Stop;
    //   var f2 = s2.substring(0, 16);
    //   console.log(f1);
    //   list.push({
    //     start: f1,
    //     end: f2,
    //     resource: r,
    //   });
    // });

    // console.log(list);

    // return list;

    const list = [
      {
        start: "2023-06-03T10:00",
        end: "2023-06-05T10:30",
        resource: 1,
        title: "Event A",
      },
      {
        start: "2023-06-03T10:30",
        end: "2023-06-05T11:30",
        resource: 1,
        title: "Event B",
      },
    ];
    return list;
  }, []);

  return (
    <div className="reactBig">
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        step={15}
        style={{ height: 500 }}
      />
    </div>
  );
}
