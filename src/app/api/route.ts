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
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No data provided." }, { status: 400 });
    }

    // Adding a timestamp
    const noteWithTimestamp = {
      ...data,
      // createdAt: new Date(),
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      hours: new Date().getHours(),
      mins: new Date().getMinutes(),
    };

    const result = await db.collection("notes").insertOne(noteWithTimestamp);

    const newNote = await db
      .collection("notes")
      .findOne({ _id: result.insertedId });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
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
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Parse the Request Body
    const { id, ...updatedData } = await request.json();

    // Validate the Input
    if (!id || Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        {
          error: "Invalid Request, Plesse enter a valid ID to update the data",
        },
        { status: 400 }
      );
    }

    // Perform the Update
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

    return NextResponse.json(
      { message: "Note has been updated successfully.", updatedData },
      { status: 200 }
    );
  } catch (error) {
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
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes");

    // Grabbing the id from the request
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Invalid request, no ID provided." },
        { status: 400 }
      );
    }

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
    console.log("Error while deleting notes : ", error);

    return NextResponse.json({ error: "Error occurred : " }, { status: 500 });
  }
}
