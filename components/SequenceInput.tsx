"use client";

import { useRef, useState } from "react";

interface SequenceInputProps {
  sequence: string;
  onSequenceChange: (val: string) => void;
  onFileChange: (file: File) => void;
}

export default function SequenceInput({
  sequence,
  onSequenceChange,
  onFileChange,
}: SequenceInputProps) {
  const [inputMode, setInputMode] = useState<"paste" | "file">("paste");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      onFileChange(f);
    }
  }

  return (
    <div className="bg-white border border-border rounded overflow-hidden">
      <div className="bg-deep-blue px-6 py-4 flex items-center gap-3">
        <span className="text-[18px]">🧬</span>
        <h2 className="font-heading text-[15px] font-bold text-white tracking-[-0.01em]">
          Sequence Input
        </h2>
      </div>

      <div className="p-6">
        {/* Tab toggle */}
        <div className="flex border border-border rounded overflow-hidden mb-5 w-fit">
          <button
            onClick={() => setInputMode("paste")}
            className={`px-5 py-2 font-body text-[13px] font-semibold transition-colors duration-150 ${
              inputMode === "paste"
                ? "bg-deep-blue text-white"
                : "bg-white text-gray hover:bg-off-white"
            }`}
          >
            Paste Sequence
          </button>
          <button
            onClick={() => setInputMode("file")}
            className={`px-5 py-2 font-body text-[13px] font-semibold transition-colors duration-150 border-l border-border ${
              inputMode === "file"
                ? "bg-deep-blue text-white"
                : "bg-white text-gray hover:bg-off-white"
            }`}
          >
            Upload File
          </button>
        </div>

        {inputMode === "paste" ? (
          <div>
            <label className="font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-deep-blue block mb-2">
              DNA / RNA Sequence
            </label>
            <textarea
              value={sequence}
              onChange={(e) => onSequenceChange(e.target.value)}
              rows={10}
              placeholder={`>sequence_name\nATCGATCGATCGATCGATCGATCG`}
              className="w-full font-mono text-[13px] text-charcoal bg-ice-blue border border-border rounded p-3 resize-y leading-relaxed placeholder:text-gray/50 focus:outline-none focus:border-med-blue focus:bg-white transition-colors duration-150"
            />
            <p className="font-body text-[12px] text-gray mt-2 italic">
              Accepts raw sequence or FASTA format. Multiple sequences supported.
            </p>
          </div>
        ) : (
          <div>
            <label className="font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-deep-blue block mb-2">
              Upload File
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-sky-blue rounded bg-ice-blue hover:bg-white hover:border-med-blue transition-all duration-200 cursor-pointer p-8 flex flex-col items-center gap-3 text-center"
            >
              <span className="text-[32px]">📂</span>
              <div>
                <p className="font-heading text-[13px] font-semibold text-deep-blue">
                  {fileName ?? "Click to select a file"}
                </p>
                <p className="font-body text-[12px] text-gray mt-1">
                  Accepts .txt or .fasta files
                </p>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.fasta,.fa"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
