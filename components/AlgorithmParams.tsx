"use client";

export interface Params {
  matchWeight: number;
  mismatchPenalty: number;
  indelPenalty: number;
  matchProb: number;
  indelProb: number;
  minScore: number;
  maxPeriod: number;
}

export const PARAM_DEFAULTS: Params = {
  matchWeight: 2,
  mismatchPenalty: 7,
  indelPenalty: 7,
  matchProb: 80,
  indelProb: 10,
  minScore: 50,
  maxPeriod: 500,
};

const PARAM_FIELDS: {
  key: keyof Params;
  label: string;
  hint: string;
  min: number;
  max: number;
}[] = [
  { key: "matchWeight",      label: "Match Weight",             hint: "Score awarded for each matching base pair",   min: 1,  max: 10   },
  { key: "mismatchPenalty",  label: "Mismatch Penalty",         hint: "Penalty for mismatched bases",                min: 1,  max: 20   },
  { key: "indelPenalty",     label: "Indel Penalty",            hint: "Penalty for insertions and deletions",        min: 1,  max: 20   },
  { key: "matchProb",        label: "Match Probability (%)",    hint: "Expected frequency of matching bases",        min: 1,  max: 99   },
  { key: "indelProb",        label: "Indel Probability (%)",    hint: "Expected frequency of indels",                min: 1,  max: 99   },
  { key: "minScore",         label: "Minimum Alignment Score",  hint: "Threshold score to report a repeat",          min: 1,  max: 1000 },
  { key: "maxPeriod",        label: "Maximum Period Size",      hint: "Largest repeat unit length to detect",        min: 1,  max: 2000 },
];

interface AlgorithmParamsProps {
  params: Params;
  onChange: (params: Params) => void;
}

export default function AlgorithmParams({ params, onChange }: AlgorithmParamsProps) {
  function handleChange(key: keyof Params, value: string) {
    onChange({ ...params, [key]: Number(value) });
  }

  return (
    <div className="bg-white border border-border rounded overflow-hidden sticky top-24">
      <div className="bg-[#1a4971] px-6 py-4 flex items-center gap-3">
        <span className="text-[18px]">⚙️</span>
        <h2 className="font-heading text-[15px] font-bold text-white tracking-[-0.01em]">
          Algorithm Parameters
        </h2>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <p className="font-body text-[12px] text-gray leading-relaxed">
          Default values are recommended for most analyses. Adjust only if you have specific requirements.
        </p>

        {PARAM_FIELDS.map((field) => (
          <div key={field.key}>
            <div className="flex justify-between items-baseline mb-1">
              <label className="font-heading text-[11px] font-bold uppercase tracking-[0.07em] text-deep-blue">
                {field.label}
              </label>
              <span className="font-heading text-[13px] font-bold text-med-blue">
                {params[field.key]}
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={params[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full h-1.5 bg-sky-blue rounded-full appearance-none cursor-pointer accent-med-blue"
            />
            <p className="font-body text-[11px] text-gray mt-1 italic">{field.hint}</p>
          </div>
        ))}

        <button
          onClick={() => onChange(PARAM_DEFAULTS)}
          className="btn btn-outline w-full justify-center text-[13px] py-2 mt-1"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
