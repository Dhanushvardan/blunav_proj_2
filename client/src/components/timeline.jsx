import React, { useRef, useEffect, Children } from "react";
import "./timeline.scss";
import { Eventcalendar, toast, Popup } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.scss";
import data from "../fids.json";
import axios from "axios";
import Switch from "react-switch";

export default function Timeline() {
  const [myInvalids, setInvalids] = React.useState([]);
  const [tHalf, setTHalf] = React.useState([]);
  const [t2Half, sett2Half] = React.useState([]);
  const [t_data, setT_data] = React.useState([]);
  const [ch, setCh] = React.useState(-1);
  const [c, setC] = React.useState(1);
  const [pIsOpen, setPIsOpen] = React.useState(false);
  const timerRef = React.useRef(null);
  const [fNum, setFNum] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const [myColors, setColors] = React.useState([]);
  const [anchor, setAnchor] = React.useState(null);
  const [fTime, setFTime] = React.useState(0);
  const [tTime, setTTime] = React.useState(0);
  const [closeOnOverlay, setCloseOnOverlay] = React.useState(false);
  const [fSize, setFSize] = React.useState(0);
  const [reg, setReg] = React.useState(null);
  const [freg, setfReg] = React.useState(null);
  const [airline, setAirline] = React.useState(null);
  const [fNature, setFNature] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [des, setDes] = React.useState(null);
  const [sta, setSta] = React.useState(null);
  const [ata, setAta] = React.useState(null);
  const [acType, setAcType] = React.useState(null);

  const [onChoc, setOnChoc] = React.useState(null);
  const [caro, setCaro] = React.useState(null);
  const [arRem, setArRem] = React.useState(null);
  const [std, setStd] = React.useState(null);
  const [atd, setAtd] = React.useState(null);
  const [gate, setGate] = React.useState(null);
  const [offChoc, setOffChoc] = React.useState(null);
  const [depRem, setDepRem] = React.useState(null);
  const [fdes, setfDes] = React.useState(null);
  const [fsta, setfSta] = React.useState(null);
  const [fata, setfAta] = React.useState(null);
  const [facType, setfAcType] = React.useState(null);
  const [fonChoc, setfOnChoc] = React.useState(null);
  const [fcaro, setfCaro] = React.useState(null);
  const [farRem, setfArRem] = React.useState(null);
  const [fstd, setfStd] = React.useState(null);
  const [fatd, setfAtd] = React.useState(null);
  const [fgate, setfGate] = React.useState(null);
  const [foffChoc, setfOffChoc] = React.useState(null);
  const [fdepRem, setfDepRem] = React.useState(null);
  const [hl, sethl] = React.useState(0);

  const view = React.useMemo(() => {
    return {
      timeline: {
        type: "week",
      },
    };
  }, []);
  // useEffect(() => {
  //   // Your code...

  //   // Cleanup function
  //   return () => {
  //     // Perform cleanup tasks here, such as removing event listeners or clearing timers
  //     clearTimeout(timerRef.current);
  //   };
  // }, []);

  const [eventData, setEventData] = React.useState([]);

  const midFunc = () => {
    let r = 0;
    let list = [];

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
        category: st,
        acType: item.AirCraft,
        title: item.FlightID.FlightNumber,
        description: "hello",
        reg: item.FlightID.AIPUniqueID,
        arRem: item.remarks,
        depRem: item.remarks,
        onChoc: item.FlightEvents.MostConfidentOnChocksTime,
        offChoc: item.FlightEvents.MostConfidentOffChocksTime,
        gate: item.ResourceAllocations.Code,
        caro: item.caro,
        sta: item.FlightID.ADate + " " + item.FlightID.ATime,
        ata: item.FlightID.ADate + " " + item.FlightID.ATime,
        std: item.FlightID.DDate + " " + item.FlightID.DTime,
        atd: item.FlightID.DDate + " " + item.FlightID.DTime,
        FlightNature: item.FlightID.FlightNature,
        Origin: item.Route.Origin.Name,
        Destination: item.Route.Destination.Name,
      });
    });

    setEventData(list);
  };

  const myEvents = React.useMemo(() => {
    setC(c + 1);
    console.log("c value", c);
    if (c == 1) {
      midFunc();
    }
    return eventData;
  }, [eventData]);

  const res1Invalids = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["1"],
    },
  ];

  const res1colInvalids = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["1"],
      background: "#1ad4041a",
    },
  ];

  const largeInvalids = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["1", "2", "3"],
    },
  ];
  const smallInvalids = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["4", "5", "6"],
    },
  ];

  const largeColors = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["1", "2", "3"],
      background: "#1ad4041a",
    },
  ];
  const smallColors = [
    {
      recurring: {
        repeat: "daily",
      },
      resource: ["4", "5", "6"],
      background: "#1ad4041a",
    },
  ];

  const myResources = React.useMemo(() => {
    const l = [];
    const ll = [];
    const sl = [];
    let i = 0;

    data.forEach((item) => {
      i = i + 1;
      if (
        item.ResourceAllocations.BAY.Code == "RP1" ||
        item.ResourceAllocations.BAY.Code == "D21" ||
        item.ResourceAllocations.BAY.Code == "D22"
      ) {
        ll.push({
          id: i,
          name: item.ResourceAllocations.BAY.Code,
          color: "#76e083",
        });
      } else {
        sl.push({
          id: i,
          name: item.ResourceAllocations.BAY.Code,
          color: "#FDB74E",
        });
      }
    });

    const r = [
      {
        id: 0,
        name: "unallocated",
        color: "red",
      },
      {
        id: "large",
        name: "Large stands",
        children: ll,
      },
      {
        id: "small",
        name: "Small Stands",
        children: sl,
      },
    ];

    // return l;

    // const l = [{ id: 1, name: "testing", color: "#76e083" }];

    return r;
  }, []);

  const pushData = async () => {
    try {
      await axios.post("https://mobi-demo.onrender.com/EventData", {
        eventData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  setTimeout(() => {
    pushData();
    console.log("pushing Data");
  }, 2500);

  useEffect(() => {
    pushData();
    console.log("pushing data to backend");
  }, []);

  useEffect(() => {
    pushData();
    console.log("pushing data to backend");
  }, [eventData]);

  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarInstance = calendarRef.current.instance;

    if (calendarInstance) {
      calendarInstance.option({
        eventMove: false,
      });
    }
  }, []);

  const onEventCreated = React.useCallback(() => {
    toast({
      message: "Event created",
    });
  }, []);

  const y = eventData;
  const onEventDragEnd = React.useCallback((args) => {
    const event = args.event;

    console.log(event.start);
    console.log(event.stop);

    setInvalids([]);
    setColors([]);

    eventData.forEach((item) => {
      if (item.reg == event.reg) {
        if (item.resource == event.resource) {
          item.resource = event.resource;
        } else {
          item.resource = event.resource;
        }
      }

      setCh(event.resource);
    });
  }, []);

  const onEventUpdated = React.useCallback((args) => {
    toast({
      message: "Event moved",
    });
  }, []);

  const onEventCreateFailed = React.useCallback((args) => {
    toast({
      message: "Can't create event",
    });
  }, []);

  const onEventUpdateFailed = React.useCallback((args) => {
    toast({
      message: "Can't move event",
    });
  }, []);

  const handleEventAdd = (event, inst) => {
    const gapInMinutes = 15;
    const { start, end } = event.event;

    // Calculate the new end time with a gap of 15 minutes
    const newEnd = new Date(start.getTime() + gapInMinutes * 60000);

    // Update the event's end time
    event.event.end = newEnd;

    inst.updateEvent(event.event);
  };

  const handleEventEdit = (event, inst) => {
    const gapInMinutes = 15;
    const { start, end } = event.event;

    // Calculate the duration of the event in minutes
    const duration = Math.floor((end - start) / 60000);

    // Check if the duration is less than 15 minutes
    if (duration < gapInMinutes) {
      // Calculate the new end time with a gap of 15 minutes
      const newEnd = new Date(start.getTime() + gapInMinutes * 60000);

      // Update the event's end time
      event.event.end = newEnd;

      inst.updateEvent(event.event);
    }
  };

  const onEventDragStart = React.useCallback((args) => {
    let event = args.event;

    var d = event.resource;
    event.start = event.start ? new Date(event.start) : event.start;
    event.end = event.end ? new Date(event.end) : event.end;

    console.log(event.start);
    const v = event.start.toLocaleDateString();
    const t = event.start.toLocaleTimeString();
    const f = v.split("/");
    const t1 = t.split(":");
    if (t1[0].length == 1) {
      t1[0] = "0" + t1[0];
    }
    const t2 = t1[0] + ":" + t1[1];
    const f1 = f[2] + "-" + f[0] + "-" + f[1];
    console.log(f1);
    console.log(t2);
    // t_data.forEach((item) => {
    //   console.log("itemdata", item);
    //   console.log("item_Reg", item.reg);
    //   console.log("event_Reg", event.reg);
    //   if (item.reg == event.reg) {
    //     console.log(item.resource);
    //     s = item.resource;
    //   }
    // });

    // if (event) {
    //   event = event.original || event;

    if (event.resource == d && event.category === "large") {
      const resInvalids = [
        {
          recurring: {
            repeat: "daily",
          },
          resource: ["4", "5", "6", d],
        },
      ];
      setInvalids(resInvalids);
      setColors(res1colInvalids);
    } else if (event.resource == d && event.category === "small") {
      const res2Invalids = [
        {
          recurring: {
            repeat: "daily",
          },
          resource: ["1", "2", "3", d],
        },
      ];
      setInvalids(res2Invalids);
      setColors(largeColors);
      // eventData.forEach((item) => {
      //   if (item.reg == event.reg) {
      //     item.resource = event.resource;
      //   }
      // });
    }
    // } else {
    //   setInvalids(smallInvalids);
    //   setColors(smallColors);
    //   // eventData.forEach((item) => {
    //   //   if (item.reg == event.reg) {
    //   //     item.resource = event.resource;
    //   //   }
    //   // });
  }, []);

  const extendDefaultEvent = React.useCallback((event) => {
    const res = event.resource;

    if (res) {
      if (res === "1" || res === "2" || res === "3") {
        return {
          category: "large",
        };
      } else {
        return {
          category: "small",
        };
      }
    }
  }, []);

  const CreateNewEvent = () => {
    console.log(fTime + "T" + tHalf);
    console.log(tTime + "T" + t2Half);
    console.log(fSize);
    let g = {
      start: fTime + "T" + tHalf,
      end: tTime + "T" + t2Half,
      resource: 0,
      category: fSize,
      sta: sta,
      ata: ata,
      acType: acType,
      onChoc: onChoc,
      caro: caro,
      arRem: arRem,
      std: std,
      atd: atd,
      gate: gate,
      offChoc: offChoc,
      depRem: depRem,
      reg: reg,
      actype: acType,
    };

    setEventData([...eventData, g]);

    console.log("pushed Data");
    toast({
      message: "Event Added in UnAllocated",
    });
  };

  const openTooltip = React.useCallback((args, closeOption) => {
    const event = args.event;
    setFNum(event.FlightNumber);
    setAnchor(args.domEvent.currentTarget || args.domEvent.target);
    setOpen(true);
    setCloseOnOverlay(closeOption);
    setfReg(event.reg);
    setfSta(event.sta);
    setfAta(event.ata);
    setfAcType(event.acType);
    setfOnChoc(event.onChoc);
    setfCaro(event.caro);
    setfArRem(event.arRem);
    setfStd(event.std);
    setfAtd(event.atd);
    setfGate(event.gate);
    setfOffChoc(event.offChoc);
    setfDepRem(event.depRem);
  }, []);

  var [date, setDate] = React.useState(new Date());

  var d = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  const [checked, setChecked] = React.useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const onEventHoverIn = React.useCallback(
    (args) => {
      openTooltip(args, false);
    },
    [openTooltip]
  );

  const onEventHoverOut = React.useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const onMouseEnter = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const onMouseLeave = React.useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  return (
    <div className="timeLine">
      <div className="topbar">
        <div className="logobar">
          <img
            src="https://res.cloudinary.com/dlm671rjr/image/upload/v1683865140/blacklogo_hgrypf.jpg"
            className="lg"
          ></img>
        </div>
        <div className="titleBar">AMCOMS / Bay allocation</div>

        <div className="iconbar">
          <div className="iconSpace">
            <img
              src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687168349/icon1_jnotsy.png"
              className="icons"
            ></img>
          </div>
          <div className="iconSpace">
            <img
              src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687168527/Vector_oqtnuh.png"
              className="icons"
            ></img>
          </div>
          <div className="iconSpace">
            <img
              src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687168598/icon2_jlzdb7.png"
              className="icons"
            ></img>
          </div>
          <div className="iconSpace">
            <img
              src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687168694/icon3_than44.png"
              className="icons"
              onClick={(e) => {
                setPIsOpen(true);
              }}
            ></img>
          </div>
          <div className="iconSpace">
            <img
              src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687169307/Vector_1_zulshn.png"
              className="icons"
            ></img>
          </div>
        </div>
        <div className="searchBar">
          <input className="searIn" type="text" placeholder="  Search"></input>
          <img
            src="https://res.cloudinary.com/dlm671rjr/image/upload/v1687241166/search_wihpcs.png"
            className="icons"
          ></img>
        </div>
        <div className="timeBar">
          {checked ? (
            <div className="dateSpace">{date.toUTCString()}</div>
          ) : (
            <div className="dateSpace">{d}</div>
          )}
          <Switch
            onChange={handleChange}
            checked={checked}
            className="rs"
            height={19}
            width={37}
            handleDiameter={8}
          />
        </div>
      </div>
      <Eventcalendar
        theme="ios"
        themeVariant="dark"
        view={view}
        data={myEvents}
        resources={myResources}
        dragToMove={true}
        dragToResize={true}
        clickToCreate={true}
        onEventDragEnd={onEventDragEnd}
        dragToCreate={true}
        eventDelete={true}
        eventMove={false}
        id="event-calendar"
        ref={calendarRef}
        onEventAdd={handleEventAdd}
        onEventEdit={handleEventEdit}
        onEventDragStart={onEventDragStart}
        eventOverlap={false}
        onEventCreated={onEventCreated}
        onEventUpdated={onEventUpdated}
        onEventCreateFailed={onEventCreateFailed}
        onEventUpdateFailed={onEventUpdateFailed}
        invalid={myInvalids}
        showEventTooltip={false}
        onEventClick={onEventHoverIn}
        onEventHoverOut={onEventHoverOut}
        colors={myColors}
        dragTimeStep={15}
      />
      <Popup
        display="anchored"
        isOpen={isOpen}
        closeOnOverlayClick={closeOnOverlay}
        touchUi={false}
        width={400}
        showOverlay={false}
        contentPadding={false}
        height={260}
        anchor={anchor}
        className="popBox"
      >
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="popSubBox"
          style={{
            height: "260",
            width: "400",
          }}
        >
          <h5>Registration:{freg}</h5>
          <h5>Aircraft type:{facType}</h5>
          <h5>STA:{fsta}</h5>
          <h5>ATA:{fata}</h5>
          <h5>On-Chocks{fonChoc}</h5>
          <h5>Carousel:{fcaro}</h5>
          <h5>Arrival Remarks:{farRem}</h5>
          <h5>STD:{fstd}</h5>
          <h5>ATD:{fatd}</h5>
          <h5>Gate:{fgate}</h5>
          <h5>Off-Chock:{foffChoc}</h5>
          <h5>Departure Remarks:{fdepRem}</h5>
        </div>
      </Popup>

      {pIsOpen && (
        <div className="inputPop">
          <div className="comInputs">
            <div className="popHeader">Movement</div>

            <div className="comIn">
              <div className="p1">
                <label className="q1">AirCraft ID</label>
                <label className="q1">Aircraft Type</label>

                <label className="q1">Stand Start Time</label>
                <label className="q1">Stand Stop Time</label>
                <label className="q1">Flight Size</label>
              </div>
              <div className="p2">
                <input
                  placeholder="  Aircraft Unique ID"
                  className="q2"
                  onChange={(e) => {
                    setReg(e.target.value);
                  }}
                ></input>
                <select
                  className="q2"
                  onChange={(e) => {
                    setAcType(e.target.value);
                  }}
                >
                  <option value="select">select</option>
                  <option value="A320">A320</option>
                  <option value="B737">B737</option>
                </select>

                <div className="p22">
                  <input
                    className="q21"
                    type="date"
                    onChange={(e) => {
                      setFTime(e.target.value);
                    }}
                  ></input>
                  <input
                    className="q22"
                    placeholder=" HH:MM"
                    onChange={(e) => {
                      setTHalf(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="p22">
                  <input
                    className="q21"
                    type="date"
                    onChange={(e) => {
                      setTTime(e.target.value);
                    }}
                  ></input>
                  <input
                    className="q22"
                    placeholder=" HH:MM"
                    onChange={(e) => {
                      sett2Half(e.target.value);
                    }}
                  ></input>
                </div>

                <input
                  className="q2"
                  placeholder="  flight size (small or large)"
                  onChange={(e) => {
                    setFSize(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className="inPops">
            <div className="arrivalBox">
              <div className="arTitle">Arrival</div>
              <div className="arInputs">
                <div className="arIns">
                  <div className="pair1">
                    <label className="l">STA</label>
                    <label className="l">ATA</label>
                    <label className="l">ON-CHOCKS</label>
                    <label className="l">COROUSEL</label>
                    <label className="l">REMARKS</label>
                  </div>
                  <div className="pair2">
                    <input
                      className="I"
                      onChange={(e) => {
                        setSta(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setAta(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setOnChoc(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setCaro(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setArRem(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="arrivalBox">
              <div className="arTitle">Departure</div>
              <div className="arInputs">
                <div className="arIns">
                  <div className="pair1">
                    <label className="l">STD</label>
                    <label className="l">ATD</label>
                    <label className="l">OFF-CHOCKS</label>
                    <label className="l">GATE</label>
                    <label className="l">REMARKS</label>
                  </div>
                  <div className="pair2">
                    <input
                      className="I"
                      onChange={(e) => {
                        setStd(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setAtd(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setOffChoc(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setGate(e.target.value);
                      }}
                    ></input>
                    <input
                      className="I"
                      onChange={(e) => {
                        setDepRem(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottomBar">
            <button
              className="closeBt"
              onClick={() => {
                setPIsOpen(false);
              }}
            >
              Close
            </button>
            <button onClick={CreateNewEvent} className="createBt">
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
