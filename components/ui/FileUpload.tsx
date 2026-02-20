"use client";
import { useRef } from "react";
import { uploadFile } from "@/app/upload/upload-action";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center min-w-fit bg-gray-100">
      <form
        action={uploadFile}
        className="flex flex-col border border-gray-300 rounded p-2 gap-6"
      >
        <label>
          <span className="block mb-2 ">Upload a file</span>
          <input type="file" name="file" ref={fileInput} accept=".txt,.pdf,.doc,.docx"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
