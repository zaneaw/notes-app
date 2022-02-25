import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Toggle from "./components/Toggle";
import Split from "react-split";
import useDarkMode from "./Hooks/use-dark-mode";
import { nanoid } from "nanoid";

export default function App() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    );
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    );

    const [darkMode, setDarkMode] = useDarkMode();

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    // Put the most recently modified note at the top of the list
    function updateNote(text) {
        setNotes((oldNotes) => {
            let newArr = [];
            for (let i = 0; i < oldNotes.length; i++) {
                const note = oldNotes[i];
                if (note.id === currentNoteId) {
                    newArr.unshift({ ...note, body: text });
                } else {
                    newArr.push(note);
                }
            }
            return newArr;
        });
    }

    function deleteNote(event, noteId) {
        event.stopPropagation();
        let newArr = notes.filter((note) => note.id !== noteId);
        return setNotes(newArr);
    }

    function findCurrentNote() {
        return (
            notes.find((note) => {
                return note.id === currentNoteId;
            }) || notes[0]
        );
    }

    return (
        <main>
            {notes.length > 0 ? (
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className="split"
                >
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                        deleteNote={deleteNote}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                    {currentNoteId && notes.length > 0 && (
                        <Editor
                            currentNote={findCurrentNote()}
                            updateNote={updateNote}
                            darkMode={darkMode}
                        />
                    )}
                </Split>
            ) : (
                <div className={darkMode ? "dark-mode no-notes" : "no-notes"}>
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                    <div className="no-notes-toggle">
                        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
                    </div>
                </div>
            )}
        </main>
    );
}
