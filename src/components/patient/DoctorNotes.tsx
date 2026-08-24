import { useState } from "react";
import type { DoctorNote } from "../../types";
import { cn } from "../../lib/risk";

const categories: DoctorNote["category"][] = [
  "Recommendations",
  "Follow-up Instructions",
  "Lifestyle Guidance",
  "Patient Comments",
];

export default function DoctorNotes({ notes: initialNotes }: { notes: DoctorNote[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [tab, setTab] = useState<DoctorNote["category"]>("Recommendations");
  const [draft, setDraft] = useState("");

  const filtered = notes.filter((n) => n.category === tab);

  function addNote() {
    if (!draft.trim()) return;
    setNotes((prev) => [
      { id: `n${Date.now()}`, category: tab, text: draft.trim(), author: "Dr. Patel", time: "Just now" },
      ...prev,
    ]);
    setDraft("");
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-3">Doctor Notes</h3>
      <div className="flex items-center gap-1 mb-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={cn(
              "px-2.5 py-1.5 text-[12px] font-medium rounded-md transition-colors",
              tab === c ? "bg-brand-50 text-brand-700" : "text-muted hover:bg-slate-50"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-[12.5px] text-muted py-2">No notes in this category yet.</p>
        )}
        {filtered.map((n) => (
          <div key={n.id} className="border border-border rounded-md px-3 py-2.5">
            <p className="text-[13px] text-ink">{n.text}</p>
            <p className="text-[11px] text-muted mt-1">{n.author} • {n.time}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder={`Add a note to ${tab.toLowerCase()}...`}
          className="flex-1 text-[13px] px-3 py-2 border border-border rounded-md bg-bg focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition-colors"
        />
        <button
          onClick={addNote}
          className="px-3 py-2 text-[12.5px] font-medium bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors shrink-0"
        >
          Add
        </button>
      </div>
    </div>
  );
}
