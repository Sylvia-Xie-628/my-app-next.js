import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//fetch a specific interpretation
async function fetchInterpretation(id: string) {
  try {
    const interpretation = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66b559dc001b38924efa",
      id
    );
    return interpretation;
  } catch (error) {
    console.log("Error detching interpretation:", error);
    throw new Error("Failed to fetch interpretation");
  }
}

//Delete a specific interpretation
async function deleteInterpretation(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66b559dc001b38924efa",
      id
    );
    return response;
  } catch (error) {
    console.log("Error to delete interpretation:", error);
    throw new Error("Failed to delete interpretation");
  }
}

//update a specific interpretation
async function updateInterpretation(
  id: string,
  data: {
    term: string;
    interpretation: string;
  }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66b559dc001b38924efa",
      id,
      data
    );
    return response;
  } catch (error) {
    console.log("Error to update interpretation:", error);
    throw new Error("Failed to update interpretation");
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteInterpretation(id);
    return NextResponse.json({ message: "Interpretation deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete interpretation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const interpretation = await req.json();
    await updateInterpretation(id, interpretation);
    return NextResponse.json({ message: "Interpretation updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update interpretation" },
      { status: 500 }
    );
  }
}
