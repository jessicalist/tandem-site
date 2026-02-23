"use server";
import { revalidatePath } from "next/cache";
import mysql from "mysql2/promise";
import { connectionConfig } from "@/lib/db";

// what is the data model for this application?
//  possible data to store
//  - the original text
//  - created_at
//  - updated_at

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  const allowedTypes = ["text/plain"];

  console.log('Uploaded file:', file);
  console.log('File type:', file.type);

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only TXT files are allowed.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const text = new TextDecoder().decode(buffer);

  // now call the script to run the simulation

  // and now store the output into a file that can be downloaded

  console.log('Deccoded text:', text);

  const connection = await mysql.createConnection(connectionConfig);

  await connection.execute('INSERT INTO dna_sequence (dna) VALUES (?)', [text]);
  await connection.end();

  // run the script to generate the results

  const results = ''; // text is just a placeholder for the actual results of running the script

  revalidatePath("/");
}

export async function submitText(formData: FormData) {
  const text = formData.get("text") as string;

  const connection = await mysql.createConnection(connectionConfig);

  await connection.execute('INSERT INTO dna_sequence (content) VALUES (?)', [text]);
  await connection.end();

  revalidatePath("/");
}