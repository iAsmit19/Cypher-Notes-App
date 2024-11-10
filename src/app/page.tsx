"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CypherNote() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error occurred.");
        }
      }
    };

    fetchNotes();
  }, []);

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

  const todayDateGetter = new Date();

  // const todayDate =
  //   todayDateGetter.getDate() +
  //   "-" +
  //   todayDateGetter.getMonth() +
  //   "-" +
  //   todayDateGetter.getFullYear();

  return (
    <div className="cy_main_cont">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {notes.map((note: Note) => (
        <div className="cy_note" key={note._id}>
          <div className="cy_note_write">
            <div className="cy_note_title">
              <h3>{note.title}</h3>
            </div>
            <div className="cy_note_div"></div>
            <div className="cy_note_content">
              <p>{note.content}</p>
            </div>
          </div>
          <div className="cy_note_time">
            <p>
              {note.day.toString() === todayDateGetter.getDate().toString() &&
              note.month.toString() === todayDateGetter.getMonth().toString() &&
              note.year.toString() === todayDateGetter.getFullYear().toString()
                ? "Today"
                : "No"}
              &nbsp;|&nbsp;
              {note.hours}:{note.mins}
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
      ))}

      <div className="cy_note">
        <div className="cy_note_write">
          <div className="cy_note_title">
            <h3>Hello there</h3>
          </div>
          <div className="cy_note_div"></div>
          <div className="cy_note_content">
            <p>This is a whole description damnnnn</p>
          </div>
        </div>
        <div className="cy_note_time">
          <p>Today | 10:43</p>
          <Image
            src="/arrow.svg"
            alt=""
            height={14}
            width={14}
            draggable="false"
          />
        </div>
      </div>

      <div className="cy_note">
        <div className="cy_note_write">
          <div className="cy_note_title">
            <h3>Hello there</h3>
          </div>
          <div className="cy_note_div"></div>
          <div className="cy_note_content">
            <p>This is a whole description damnnnn</p>
          </div>
        </div>
        <div className="cy_note_time">
          <p>Today | 10:43</p>
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
  );
}
