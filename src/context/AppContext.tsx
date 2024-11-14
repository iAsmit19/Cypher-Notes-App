"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

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

interface AppContextType {
  isPanelOpen: boolean;
  togglePanel: () => void;
  notes: Note[];
  fetchNotes: () => Promise<void>;
  handleAddNote: (noteData: {
    title: string;
    content: string;
  }) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AddNoteProvider({ children }: { children: ReactNode }) {
  // State to control the panel
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // State to fetch notes
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to toggle the Add Note Panel
  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  // Fetching Notes from the API
  const fetchNotes = async () => {
    try {
      // Fetching the Notes from the API
      const response = await fetch("/api");

      // Handling errors
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      // Parsing the JSON response
      const data = await response.json();

      // Sorting the Notes from latest to oldest
      const sortNotes = data.sort((a: Note, b: Note) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);

        return bDate.getTime() - aDate.getTime();
      });

      // Setting the notes and adding them to the UI using the useState Hook
      setNotes(sortNotes);
    } catch (error: unknown) {
      // Handling error
      console.error("There was some error while fetching notes : ", error);
    }
  };

  // Adding a New Note
  const handleAddNote = async (noteData: {
    title: string;
    content: string;
  }) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the note.");
      }

      const newNote = await response.json();

      setNotes((prevNotes) => [newNote, ...prevNotes]);

      setIsPanelOpen(false);
    } catch (error: unknown) {
      console.error("Error while adding the note.", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <AppContext.Provider
      value={{ isPanelOpen, togglePanel, notes, fetchNotes, handleAddNote }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAddNote() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAddNote must be used within an AddNoteProvider");
  }
  return context;
}
