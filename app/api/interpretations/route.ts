import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const databases = new Databases(client);

//create a new interpretation
async function createInterpretation(data: {
  term: string;
  interpretation: string;
}) {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66b559dc001b38924efa",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.log("Error creating interpretation", error);
    throw new Error("Failed to create interpretation");
  }
}

//fetch interpretations from database
async function fetchInterpretations() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66b559dc001b38924efa",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.log("Error fetching  interpretation", error);
    throw new Error("Failed to fetch interpretation");
  }
}

//create new interpretation
export async function POST(req: Request) {
  try {
    const { term, interpretation } = await req.json();
    const data = { term, interpretation };
    const response = await createInterpretation(data);
    return NextResponse.json({ message: "Interpretation created" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create interpretation" },
      { status: 500 }
    );
  }
}

//fetch interpretations from database
export async function GET() {
  try {
    const interpretations = await fetchInterpretations();
    return NextResponse.json(interpretations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretations" },
      { status: 500 }
    );
  }
}
