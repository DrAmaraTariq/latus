import { createContext, useContext, useState, type ReactNode } from "react";

interface EvidenceContextValue {
  openEvidence: (key: string) => void;
  activeKey: string | null;
  close: () => void;
}

const EvidenceContext = createContext<EvidenceContextValue | null>(null);

export function EvidenceProvider({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  return (
    <EvidenceContext.Provider
      value={{
        activeKey,
        openEvidence: (key) => setActiveKey(key),
        close: () => setActiveKey(null),
      }}
    >
      {children}
    </EvidenceContext.Provider>
  );
}

export function useEvidence() {
  const ctx = useContext(EvidenceContext);
  if (!ctx) throw new Error("useEvidence must be used within EvidenceProvider");
  return ctx;
}
