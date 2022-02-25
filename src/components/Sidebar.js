import React from "react";
import Toggle from "./Toggle";

export default function Sidebar(props) {

    const re = /^.*/

    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                } ${props.darkMode ? "dark-mode" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">
                    {note.body === "" ||
                    note.body === "# Type your markdown note's title here"
                        ? "New Note"
                        : note.body.match(re)}
                </h4>
                <button
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>
                    +
                </button>
            </div>
            {noteElements}
            <div className="sidebar--footer">
                <Toggle darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
            </div>
        </section>
    );
}
