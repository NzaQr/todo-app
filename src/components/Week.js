import React from "react";
import Day from "./Day";

const Week = () => {
  const week = [
    {
      id: 0,
      day: "Monday",
      title: "",
      description: "",
    },
    {
      id: 1,
      day: "Tuesday",
      title: "",
      description: "",
    },
    {
      id: 2,
      day: "Wednesday",
      title: "",
      description: "",
    },
    {
      id: 3,
      day: "Thursday",
      title: "",
      description: "",
    },
    {
      id: 4,
      day: "Friday",
      title: "",
      description: "",
    },
    {
      id: 5,
      day: "Weekend",
      title: "",
      description: "",
    },
  ];

  return (
    <div>
      {week.map((day) => (
        <Day
          key={day.id}
          day={day.day}
          id={day.id}
          title={day.title}
          description={day.description}
        />
      ))}
    </div>
  );
};

export default Week;
