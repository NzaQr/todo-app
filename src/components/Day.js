import React, { useEffect, useState } from "react";

const Day = ({ day, title, description, id }) => {
  const [titleText, setTitleText] = useState(title);
  const [descriptionText, setDescriptionText] = useState(description);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTasks = [
      {
        id: id,
        ...tasks,
        title: titleText,
        description: descriptionText,
      },
    ];

    setTasks([...newTasks, ...tasks]);
    console.log(tasks);
    setTitleText("");
    setDescriptionText("");
  };

  return (
    <div>
      <h1>{day}</h1>
      <input
        type="button"
        value={show ? "Hide" : "Show"}
        onClick={() => (show ? setShow(false) : setShow(true))}
      />
      {show && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="Title"
            />
            <input
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              placeholder="Description"
            />
            <input type="submit" value="Add" />
          </form>
          {tasks.map((task) => (
            <div key={task.id}>
              <h1>{task.title}</h1>
              <p>{task.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Day;
