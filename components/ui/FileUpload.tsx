"use client";
import { useRef, useState } from "react";
import { uploadFile } from "@/app/upload/upload-action";


const submitSequenceDaata = async (formData: FormData) => {
  const response = await fetch("/api/run-sequence", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {   
    throw new Error(`Failed to submit sequence data: ${response.status} ${response.statusText}`);
  }

  const result = await response.text();
  console.log('Sequence data submitted:', result);

  return result;
}

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<string | null>(null);


  // handle the form submission
  const handleSumitForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    console.log('Form data:', formData);
    // send the data to our specified API route to handle the file upload and processing
    const results = await submitSequenceDaata(formData);

    setResults(results);
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-fit bg-gray-100">
      {
        !results 
        ? <div>No results yet</div>
        : <div>{results}</div>  
      }
      <form
        // action={uploadFile}
        onSubmit={handleSumitForm}
        className="flex flex-col border border-gray-300 rounded p-2 gap-6"
      >
        <label>
          {/* 
            input for errors
            inputf or length
            input for min period
            input for max period
          */}
          {/* 
            toggle for file or text
          */}
          <span className="block mb-2 ">Upload a file</span>
          <input type="file" name="file" ref={fileInput} accept=".txt"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
