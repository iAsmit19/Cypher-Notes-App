import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db, Document, ObjectId } from "mongodb";

// Fetch all the Notes
export async function GET() {
  try {
    // Connect to MongoDB
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Fetch all notes from the "notes" collection
    const notes: Document[] = await db.collection("notes").find({}).toArray();

    // Log the notes for debugging
    console.log("Fetched notes: ", notes);

    return NextResponse.json(notes);
  } catch (error) {
    // Catching errors
    console.log("Error fetching the notes: ", error);

    return NextResponse.json(
      {
        error: "Failed to fetch the notes. Try again later.",
      },
      { status: 500 }
    );
  }
}

// Add a New Note
export async function POST(request: Request) {
  try {
    //  Connect to MongoDB
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Catching the Request that contains the new note
    const data = await request.json();

    // Checking if the Request contains the data or not aka Validation
    const { title, content } = data;
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and Content are required..." },
        { status: 400 }
      );
    }

    const now = new Date();

    // Adding the time functionality
    const noteWithTimestamp = {
      ...data,
      createdAt: now,
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      hours: now.getHours(),
      mins: now.getMinutes(),
    };

    // Inserting the New Note received from the request along with the timestamp
    const result = await db.collection("notes").insertOne(noteWithTimestamp);

    // Checking if the New Note was successfully added
    const newNote = await db
      .collection("notes")
      .findOne({ _id: result.insertedId });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    // Catching errors
    console.log("Faced an error", error);

    return NextResponse.json(
      {
        error: "Failed to create the Note, try again later..",
      },
      {
        status: 500,
      }
    );
  }
}

// Edit a Note
export async function PUT(request: Request) {
  try {
    // Connect to MongoDB
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Parsing into the Request
    const { id, ...updatedData } = await request.json();

    // Validating the Input
    if (!id || Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        {
          error: "Invalid Request, Plesse enter a valid ID to update the data",
        },
        { status: 400 }
      );
    }

    // Inserting the Updated Note into the database
    const result = await db
      .collection("notes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    // Checking if the note was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "No Note found with the given ID." },
        { status: 404 }
      );
    }

    // Returning the success response
    return NextResponse.json(
      { message: "Note has been updated successfully.", updatedData },
      { status: 200 }
    );
  } catch (error) {
    // Catching errors
    console.log("Error occurred while updating", error);

    return NextResponse.json(
      { error: "Failed to Update the Note, please try again later" },
      { status: 500 }
    );
  }
}

// Delete a Note
export async function DELETE(request: Request) {
  try {
    // Connecting to MongoDB
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Grabbing the id from the request
    const { id } = await request.json();

    // Validating the request
    if (!id) {
      return NextResponse.json(
        { error: "Invalid request, no ID provided." },
        { status: 400 }
      );
    }

    // Deleting the note from the database using the provided id
    const result = await db
      .collection("notes")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "No note found with the given ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    // Catching errors
    console.log("Error while deleting notes : ", error);

    return NextResponse.json({ error: "Error occurred : " }, { status: 500 });
  }
}
