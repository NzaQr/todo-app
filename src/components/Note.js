import React, { useEffect, useState } from "react";

const Note = () => {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [notes, setNotes] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleText === "" && descriptionText === "") {
      setMessage(true);
    } else {
      setMessage(false);
      addNote(titleText, descriptionText);
      console.log(notes);
      setTitleText("");
      setDescriptionText("");
      setDescriptionText("");
    }
  };

  const addNote = (title, description, day) => {
    const newNote = [{ title, description, day }, ...notes];
    setNotes(newNote);
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  useEffect(() => {
    const json = localStorage.getItem("notes");
    const loadedNotes = JSON.parse(json);
    if (loadedNotes) {
      setNotes(loadedNotes);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem("notes", json);
  }, [notes]);

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="button"
        value={showNote ? "Hide Notes" : "Show Notes"}
        onClick={() => (showNote ? setShowNote(false) : setShowNote(true))}
      />
      {showNote && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              placeholder="Description"
            />
            <input type="submit" value="Add" />
            <label>{message ? "Write something!" : ""}</label>
          </form>
          {notes.map((note, index) => (
            <div key={note.id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Note;
