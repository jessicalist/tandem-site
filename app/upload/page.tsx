"use client";

import { useState } from "react";
import { uploadFile, submitText, type TREDResults } from "./upload-action";
import SequenceInput from "@/components/SequenceInput";
import OutputOptions, { type OutputSettings } from "@/components/OutputOptions";
import AlgorithmParams, { type Params, PARAM_DEFAULTS } from "@/components/AlgorithmParams";
import SubmitButton from "@/components/SubmitButton";
import Navbar from "@/components/Navbar";

export default function RunProgramPage() {
  const [sequence, setSequence] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [params, setParams] = useState<Params>(PARAM_DEFAULTS);
  const [outputSettings, setOutputSettings] = useState<OutputSettings>({
    htmlOutput: false,
    datOutput: false,
    masked: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<TREDResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !!sequence.trim() || !!file;

  function download(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setResults(null);
    setError(null);
    try {
      const formData = new FormData();

      Object.entries(params).forEach(([k, v]) => formData.append(k, String(v)));
      Object.entries(outputSettings).forEach(([k, v]) => formData.append(k, String(v)));

      let res;
      if (file) {
        formData.append("file", file);
        res = await uploadFile(formData);
      } else {
        formData.append("text", sequence);
        res = await submitText(formData);
      }
      setResults(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-off-white">
        <Navbar />
      {/* Page header */}
      <div className="bg-gradient-to-br from-deep-blue via-[#154360] to-[#1a4971] text-white py-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(46,134,193,0.15) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div className="max-w-[1120px] mx-auto px-10 relative z-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-sky-blue mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal mr-2 mb-0.5" />
            Tandem Repeat Finder
          </p>
          <h1 className="font-heading text-[36px] font-extrabold tracking-tight leading-tight mb-3">
            Run <em className="not-italic text-sky-blue">Analysis</em>
          </h1>
          <p className="font-body text-[15px] text-white/75 max-w-xl leading-relaxed">
            Submit a DNA sequence to identify and characterize tandem repeats. Paste a sequence directly or upload a FASTA / plain-text file.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1120px] mx-auto px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <SequenceInput
              sequence={sequence}
              onSequenceChange={setSequence}
              onFileChange={setFile}
            />
            <OutputOptions
              settings={outputSettings}
              onChange={setOutputSettings}
            />
            <SubmitButton
              submitting={submitting}
              disabled={!canSubmit}
              onClick={handleSubmit}
            />
          </div>

          {/* Right column */}
          <AlgorithmParams
            params={params}
            onChange={setParams}
          />
        </div>

        {/* Loading */}
        {submitting && (
          <div className="mt-8 border border-sky-blue bg-ice-blue rounded p-5 flex items-center gap-4">
            <span className="inline-block w-5 h-5 border-2 border-med-blue/30 border-t-med-blue rounded-full animate-spin shrink-0" />
            <div>
              <p className="font-heading text-[14px] font-bold text-deep-blue">Running analysis…</p>
              <p className="font-body text-[12px] text-gray mt-0.5">This may take a few seconds depending on sequence length.</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 border border-red-300 bg-red-50 rounded p-5 text-red-700 font-body text-[13px]">
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-8 flex flex-col gap-6">
            {results.noRepeats ? (
              <div className="border border-gray-200 bg-gray-50 rounded p-5 font-body text-[14px] text-gray-600">
                No tandem repeats were found in the submitted sequence.
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-heading text-[18px] font-bold text-deep-blue">Results Table</h2>
                    <button
                      onClick={() => download(results.table, "results.dat")}
                      className="font-body text-[12px] font-semibold text-med-blue hover:underline"
                    >
                      Download .dat
                    </button>
                  </div>
                  <pre className="bg-white border border-gray-200 rounded p-4 font-mono text-[12px] text-gray-800 overflow-x-auto whitespace-pre">
                    {results.table}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-heading text-[18px] font-bold text-deep-blue">Alignment</h2>
                    <button
                      onClick={() => download(results.alignment, "alignment.txt")}
                      className="font-body text-[12px] font-semibold text-med-blue hover:underline"
                    >
                      Download .txt
                    </button>
                  </div>
                  <pre className="bg-white border border-gray-200 rounded p-4 font-mono text-[12px] text-gray-800 overflow-x-auto whitespace-pre">
                    {results.alignment}
                  </pre>
                </div>
              </>
            )}
          </div>
        )}

        {/* Info strip */}
        <div className="mt-10 border border-sky-blue bg-ice-blue rounded p-5 flex gap-4 items-start">
          <span className="text-[22px] shrink-0">ℹ️</span>
          <div>
            <p className="font-heading text-[13px] font-bold text-deep-blue mb-1">
              About Tandem Repeat Finder
            </p>
            <p className="font-body text-[13px] text-gray leading-relaxed">
              TRF locates and displays tandem repeats in DNA sequences. The algorithm uses a probabilistic
              model to detect repeats without requiring a prototype repeat sequence. Results include period
              size, copy number, percent matches, percent indels, score, and entropy for each detected repeat.{" "}
              <a
                href="https://tandem.bu.edu/trf/trf.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-med-blue font-semibold hover:underline"
              >
                Learn more →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
