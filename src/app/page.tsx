"use client";

import { useAddNote } from "@/context/AppContext";
import Image from "next/image";

export default function CypherNote() {
  // Function to convert the numerical month into a alphabetic month
  function getMonthName(monthNumber: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[parseInt(monthNumber)];
  }

  // Type of the Note
  interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    day: string;
    month: string;
    year: string;
    hours: string;
    mins: string;
  }

  // Getting current date
  const todayDateGetter = new Date();

  // Function to delete a note
  const { notes, deleteNote, updateNote } = useAddNote();

  const handleDelete = async (id: string) => {
    await deleteNote(id);
  };

  // Function to handlie edits
  const handleBlur = async (id: string, field: string, value: string) => {
    try {
      if (!value.trim()) {
        alert(`${field} cannot be empty`);
        return;
      }

      await updateNote(id, { [field]: value });
    } catch (error) {
      console.error("Error updating note on blur:", error);
    }
  };

  return (
    <div className="cy_main_cont">
      {notes.map((note: Note) => (
        <div className="cy_note" key={note._id}>
          <div className="cy_note_write">
            <div
              className="cy_note_title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(event) =>
                handleBlur(note._id, "title", event.target.textContent || "")
              }
            >
              <h3>{note.title}</h3>
            </div>
            <div className="cy_note_div"></div>
            <div
              className="cy_note_content"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleBlur(note._id, "content", e.target.textContent || "")
              }
            >
              <p>{note.content}</p>
            </div>
          </div>
          <div className="cy_note_time">
            <div className="cy_note_del" onClick={() => handleDelete(note._id)}>
              <p>Delete</p>
            </div>
            <div className="cy_time">
              <p>
                {note.day.toString() === todayDateGetter.getDate().toString() &&
                note.month.toString() ===
                  todayDateGetter.getMonth().toString() &&
                note.year.toString() ===
                  todayDateGetter.getFullYear().toString()
                  ? "Today"
                  : `${getMonthName(note.month)}, ${note.day}`}
                &nbsp;|&nbsp;
                {parseInt(note.hours) < 10 ? `0${note.hours}` : note.hours}:
                {parseInt(note.mins) < 10 ? `0${note.mins}` : note.mins}
              </p>
              <Image
                src="/arrow.svg"
                alt=""
                height={14}
                width={14}
                draggable="false"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
