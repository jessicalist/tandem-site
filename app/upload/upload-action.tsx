"use server";
import { revalidatePath } from "next/cache";
import mysql from "mysql2/promise";
import { connectionConfig } from "@/lib/db";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

const BACKEND_DIR = path.join(process.cwd(), "backend");

export type TREDResults = { table: string; alignment: string; noRepeats?: boolean };

function validateSequence(sequence: string) {
  const cleaned = sequence.replace(/\s/g, "");
  if (!cleaned) throw new Error("Sequence is empty. Please enter a DNA sequence.");
  if (!/^[ATCGatcg]+$/.test(cleaned))
    throw new Error("Invalid characters in sequence. Only A, T, C, and G are allowed.");
  if (cleaned.length < 20)
    throw new Error("Sequence is too short. Minimum length is 20 characters.");
  return cleaned;
}

function runTRED(cleaned: string): TREDResults {
  const tmpDir = os.tmpdir();
  const id = Date.now();
  const seqFile = path.join(tmpDir, `seq_${id}.txt`);
  const interFile = path.join(tmpDir, `inter_${id}.txt`);
  const alignFile = path.join(tmpDir, `align_${id}.txt`);
  const tableFile = path.join(tmpDir, `table_${id}.txt`);

  try {
    fs.writeFileSync(seqFile, cleaned);

    try {
      execSync(`"${path.join(BACKEND_DIR, "tred.exe")}" "${seqFile}" "${interFile}"`);
    } catch {
      throw new Error("Analysis failed while running TRED. Please try again.");
    }

    try {
      execSync(`"${path.join(BACKEND_DIR, "filter.exe")}" "${seqFile}" "${interFile}" "${alignFile}" "${tableFile}"`);
    } catch {
      throw new Error("Analysis failed during post-processing. Please try again.");
    }

    const table = fs.existsSync(tableFile) ? fs.readFileSync(tableFile, "utf-8").trim() : "";
    const alignment = fs.existsSync(alignFile) ? fs.readFileSync(alignFile, "utf-8").trim() : "";
    const noRepeats = !table || table.split("\n").length <= 1;

    return { table, alignment, noRepeats };
  } finally {
    for (const f of [seqFile, interFile, alignFile, tableFile]) {
      try { fs.unlinkSync(f); } catch {}
    }
  }
}

export async function uploadFile(formData: FormData): Promise<TREDResults> {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) throw new Error("No file selected.");
  if (!["text/plain"].includes(file.type))
    throw new Error("Invalid file type. Only .txt files are allowed.");
  if (file.size > 5 * 1024 * 1024)
    throw new Error("File is too large. Maximum size is 5MB.");

  const arrayBuffer = await file.arrayBuffer();
  const text = new TextDecoder().decode(new Uint8Array(arrayBuffer));
  const cleaned = validateSequence(text);

  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.execute("INSERT INTO dna_sequence (dna) VALUES (?)", [text]);
    await connection.end();
  } catch {
    throw new Error("Database error. Could not save sequence.");
  }

  const results = runTRED(cleaned);
  revalidatePath("/");
  return results;
}

export async function submitText(formData: FormData): Promise<TREDResults> {
  const text = formData.get("text") as string;
  const cleaned = validateSequence(text);

  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.execute("INSERT INTO dna_sequence (dna) VALUES (?)", [text]);
    await connection.end();
  } catch {
    throw new Error("Database error. Could not save sequence.");
  }

  const results = runTRED(cleaned);
  revalidatePath("/");
  return results;
}
