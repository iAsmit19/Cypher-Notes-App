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

    return months[parseInt(monthNumber) - 1];
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

  const { notes } = useAddNote();

  // Getting current date
  const todayDateGetter = new Date();

  return (
    <div className="cy_main_cont">
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
            <div className="cy_note_del">Delete</div>
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
        </div>
      ))}

      {/* <div className="cy_note">
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
      </div> */}
    </div>
  );
}
