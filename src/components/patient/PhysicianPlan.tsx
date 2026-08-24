import { useState } from "react";
import { Plus, X, Pencil, Check } from "lucide-react";
import type { PlanItem } from "../../types";

export default function PhysicianPlan({ initial }: { initial: PlanItem[] }) {
  const [items, setItems] = useState<PlanItem[]>(initial);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function addItem() {
    if (!newText.trim()) return;
    setItems((prev) => [...prev, { id: `p${Date.now()}`, text: newText.trim(), done: true }]);
    setNewText("");
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function startEdit(item: PlanItem) {
    setEditingId(item.id);
    setEditText(item.text);
  }

  function saveEdit(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, text: editText } : i)));
    setEditingId(null);
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13.5px] font-semibold text-ink flex items-center gap-1.5">
          <span>👨‍⚕️</span> Physician Plan
        </h3>
      </div>
      <p className="text-[11.5px] text-muted mb-3">Physician-authored plan</p>

      <div className="space-y-1.5 mb-3">
        {items.map((item) => (
          <div key={item.id} className="group flex items-center gap-2 px-3 py-2 border border-border rounded-md">
            <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            {editingId === item.id ? (
              <input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                onBlur={() => saveEdit(item.id)}
                className="flex-1 text-[13px] text-ink bg-bg border border-brand-600 rounded px-2 py-0.5 focus:outline-none"
              />
            ) : (
              <p className="flex-1 text-[13px] text-ink">{item.text}</p>
            )}
            <button
              onClick={() => startEdit(item)}
              className="opacity-0 group-hover:opacity-100 text-muted hover:text-ink transition-opacity"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="opacity-0 group-hover:opacity-100 text-muted hover:text-critical transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add plan item..."
          className="flex-1 text-[13px] px-3 py-2 border border-border rounded-md bg-bg focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition-colors"
        />
        <button
          onClick={addItem}
          className="w-9 h-9 rounded-md bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
