"use client";

export interface OutputSettings {
  htmlOutput: boolean;
  datOutput: boolean;
  masked: boolean;
}

interface OutputOptionsProps {
  settings: OutputSettings;
  onChange: (settings: OutputSettings) => void;
}

const OPTIONS = [
  {
    key: "htmlOutput" as const,
    label: "Generate HTML results page",
    desc: "Visual summary with repeat highlights and statistics",
  },
  {
    key: "datOutput" as const,
    label: "Generate .dat file",
    desc: "Tab-delimited data file for downstream analysis",
  },
  {
    key: "masked" as const,
    label: "Masked sequence output",
    desc: "Returns input sequence with repeats replaced by N's",
  },
];

export default function OutputOptions({ settings, onChange }: OutputOptionsProps) {
  function toggle(key: keyof OutputSettings) {
    onChange({ ...settings, [key]: !settings[key] });
  }

  return (
    <div className="bg-white border border-border rounded overflow-hidden">
      <div className="bg-[#0e6655] px-6 py-4 flex items-center gap-3">
        <span className="text-[18px]">📄</span>
        <h2 className="font-heading text-[15px] font-bold text-white tracking-[-0.01em]">
          Output Options
        </h2>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <p className="font-body text-[13px] text-gray">
          Select additional output formats alongside the default results table.
        </p>
        {OPTIONS.map(({ key, label, desc }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={() => toggle(key)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm transition-colors duration-150 flex items-center justify-center ${
                  settings[key]
                    ? "bg-teal border-teal"
                    : "border-border group-hover:border-med-blue"
                }`}
              >
                {settings[key] && (
                  <span className="text-white text-[10px] font-bold">✓</span>
                )}
              </div>
            </div>
            <div>
              <p className="font-body text-[14px] font-semibold text-charcoal">{label}</p>
              <p className="font-body text-[12px] text-gray">{desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
