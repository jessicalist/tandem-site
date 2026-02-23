import mysql from "mysql2/promise";
import { connectionConfig } from "@/lib/db";
import { resolve, join } from "path";
import fs from "fs";

// THIS FUNCTION DOES NOT CURRENTLY WORK
//  we were trying to write to C:\Users\Jessica\OneDrive\Documents\dev\tandem_site\public\results
const storeFile = (filename: string, data: any) => {
    const storedLocation = resolve(__dirname + `../../../public/results/${filename}`);

    console.log('Storing file at:', storedLocation);

    fs.writeFile(storedLocation, data, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            return;
        }
        console.log('The file was saved successfully!');
    });

    return storedLocation;
}

let fileCount = 0;


// this is the API route at `/api/run-sequence` that will handle the file upload and processing
// and respond with the URL to the results file that can be downloaded by the user
export async function POST(request: Request) {

    const formData = await request.formData();

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

    // placeholder for running the script to generate the results
    const results = text; // text is just a placeholder for the actual results of running the script

    // once we get the results, we want to write them to a file that can be downloaded
    const storedResultsLocation = storeFile(`results-${fileCount}.txt`, results);
    fileCount++;

    console.log('Received file upload request');

    return new Response(storedResultsLocation, {
        headers: {
            'Content-Type': 'text/plain',
        }
    });
}
