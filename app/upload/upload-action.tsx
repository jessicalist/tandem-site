"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  const allowedTypes = ["application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only PDF,TXT, DOC, DOCX files are allowed.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  //await fs.writeFile(`./public/uploads/${file.name}`, buffer);

  // Save file metadata to the database
  //TODO: this gives me a filename, will need to change so i get the file content and save that to the database instead
  await pool.execute(
    "INSERT INTO uploads (file_name, file_type, uploaded_at) VALUES (?, ?, ?)",
    [file.name]
  );

  revalidatePath("/");
}
