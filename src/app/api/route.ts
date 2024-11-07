import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db, Document } from "mongodb";

// Fetch all the Notes
export async function GET() {
  console.log("hello");
  
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

