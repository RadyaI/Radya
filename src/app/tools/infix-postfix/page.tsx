"use client";

import { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Play,
  Calculator,
  Info,
//   Stack,
  ArrowRight,
  CheckCircle,
  Circle,
  Braces,
  Hash,
  SkipForward,
  FileStack,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ConversionStep = {
  token: string;
  tokenType: "operand" | "operator" | "lparen" | "rparen";
  action: string;
  stack: string[];
  output: string[];
  highlight: "token" | "stack" | "output" | "pop";
};

type EvalStep = {
  token: string;
  tokenType: "operand" | "operator";
  action: string;
  stack: (number | string)[];
  result?: number;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRECEDENCE: Record<string, number> = {
  "^": 4,
  "*": 3,
  "/": 3,
  "%": 3,
  "+": 2,
  "-": 2,
};

const RIGHT_ASSOC = new Set(["^"]);

const isOperator = (c: string) => c in PRECEDENCE;
const isOperand = (t: string) => /^-?\d+(\.\d+)?$/.test(t) || /^[a-zA-Z_]\w*$/.test(t);

function tokenize(expr: string): string[] | null {
  const tokens: string[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, "");
  while (i < s.length) {
    if (/\d/.test(s[i]) || (s[i] === "." && i + 1 < s.length && /\d/.test(s[i + 1]))) {
      let num = "";
      while (i < s.length && (/\d/.test(s[i]) || s[i] === ".")) num += s[i++];
      tokens.push(num);
    } else if (/[a-zA-Z_]/.test(s[i])) {
      let id = "";
      while (i < s.length && /\w/.test(s[i])) id += s[i++];
      tokens.push(id);
    } else if ("+-*/%^()".includes(s[i])) {
      tokens.push(s[i++]);
    } else {
      return null;
    }
  }
  return tokens;
}

function infixToPostfixSteps(tokens: string[]): ConversionStep[] | null {
  const steps: ConversionStep[] = [];
  const stack: string[] = [];
  const output: string[] = [];

  for (const token of tokens) {
    if (isOperand(token)) {
      output.push(token);
      steps.push({
        token,
        tokenType: "operand",
        action: `Token "${token}" adalah operand → langsung masuk ke output`,
        stack: [...stack],
        output: [...output],
        highlight: "output",
      });
    } else if (token === "(") {
      stack.push(token);
      steps.push({
        token,
        tokenType: "lparen",
        action: `Token "(" → push ke stack`,
        stack: [...stack],
        output: [...output],
        highlight: "stack",
      });
    } else if (token === ")") {
      let foundLParen = false;
      while (stack.length > 0) {
        const top = stack.pop()!;
        if (top === "(") {
          foundLParen = true;
          steps.push({
            token,
            tokenType: "rparen",
            action: `Token ")" → pop "(" dari stack, kurung dihapus`,
            stack: [...stack],
            output: [...output],
            highlight: "pop",
          });
          break;
        } else {
          output.push(top);
          steps.push({
            token,
            tokenType: "rparen",
            action: `Token ")" → pop "${top}" dari stack ke output`,
            stack: [...stack],
            output: [...output],
            highlight: "output",
          });
        }
      }
      if (!foundLParen) return null;
    } else if (isOperator(token)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        isOperator(stack[stack.length - 1]) &&
        (PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[token] ||
          (PRECEDENCE[stack[stack.length - 1]] === PRECEDENCE[token] &&
            !RIGHT_ASSOC.has(token)))
      ) {
        const popped = stack.pop()!;
        output.push(popped);
        steps.push({
          token,
          tokenType: "operator",
          action: `Operator "${token}" (prec=${PRECEDENCE[token]}) ≤ "${popped}" (prec=${PRECEDENCE[popped]}) → pop "${popped}" ke output`,
          stack: [...stack],
          output: [...output],
          highlight: "output",
        });
      }
      stack.push(token);
      steps.push({
        token,
        tokenType: "operator",
        action: `Push operator "${token}" ke stack`,
        stack: [...stack],
        output: [...output],
        highlight: "stack",
      });
    }
  }

  while (stack.length > 0) {
    const popped = stack.pop()!;
    if (popped === "(" || popped === ")") return null;
    output.push(popped);
    steps.push({
      token: popped,
      tokenType: "operator",
      action: `Stack habis → pop "${popped}" ke output`,
      stack: [...stack],
      output: [...output],
      highlight: "output",
    });
  }

  return steps;
}

function evalPostfixSteps(tokens: string[]): EvalStep[] | null {
  const steps: EvalStep[] = [];
  const stack: number[] = [];

  for (const token of tokens) {
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      const val = parseFloat(token);
      stack.push(val);
      steps.push({
        token,
        tokenType: "operand",
        action: `Angka ${val} → push ke stack`,
        stack: [...stack],
      });
    } else if (isOperator(token)) {
      if (stack.length < 2) return null;
      const b = stack.pop()!;
      const a = stack.pop()!;
      let result: number;
      switch (token) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? NaN : a / b; break;
        case "%": result = a % b; break;
        case "^": result = Math.pow(a, b); break;
        default: return null;
      }
      stack.push(result);
      steps.push({
        token,
        tokenType: "operator",
        action: `Pop ${b} dan ${a} → ${a} ${token} ${b} = ${Number.isNaN(result) ? "ERR (div by 0)" : result}`,
        stack: [...stack],
        result,
      });
    } else {
      return null;
    }
  }

  return steps;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StackVisual({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-1">{label}</span>
      <div className="flex flex-col-reverse gap-1 min-h-[120px] items-center justify-start">
        {items.length === 0 ? (
          <div className="text-slate-600 text-xs font-mono mt-8">kosong</div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className={`px-4 py-1.5 rounded font-mono text-sm font-bold border transition-all duration-300
                ${i === items.length - 1
                  ? "bg-amber-400 text-slate-900 border-amber-300 scale-110 shadow-lg shadow-amber-400/30"
                  : "bg-slate-700 text-slate-200 border-slate-600"
                }`}
            >
              {item}
            </div>
          ))
        )}
      </div>
      <div className="w-px h-3 bg-slate-600" />
      <div className="text-xs text-slate-500 font-mono">BOTTOM</div>
    </div>
  );
}

function OutputVisual({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1">Output (Postfix)</span>
      <div className="flex flex-wrap gap-2 min-h-[48px] bg-slate-900 rounded-lg p-3 border border-slate-700">
        {items.length === 0 ? (
          <span className="text-slate-600 text-xs font-mono">belum ada output</span>
        ) : (
          items.map((item, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded font-mono text-sm font-bold border
                ${i === items.length - 1
                  ? "bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30"
                  : "bg-slate-700 text-emerald-300 border-slate-600"
                }`}
            >
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function EvalStackVisual({ items }: { items: (number | string)[] }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-1">Stack Evaluasi</span>
      <div className="flex flex-col-reverse gap-1 min-h-[120px] items-center justify-start">
        {items.length === 0 ? (
          <div className="text-slate-600 text-xs font-mono mt-8">kosong</div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className={`px-4 py-1.5 rounded font-mono text-sm font-bold border transition-all duration-300
                ${i === items.length - 1
                  ? "bg-violet-500 text-white border-violet-400 scale-110 shadow-lg shadow-violet-500/30"
                  : "bg-slate-700 text-slate-200 border-slate-600"
                }`}
            >
              {typeof item === "number" ? (Number.isInteger(item) ? item : item.toFixed(4)) : item}
            </div>
          ))
        )}
      </div>
      <div className="w-px h-3 bg-slate-600" />
      <div className="text-xs text-slate-500 font-mono">BOTTOM</div>
    </div>
  );
}

function TokenBadge({ token, type }: { token: string; type: string }) {
  const colors: Record<string, string> = {
    operand: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    operator: "bg-orange-500/20 text-orange-300 border-orange-500/50",
    lparen: "bg-pink-500/20 text-pink-300 border-pink-500/50",
    rparen: "bg-pink-500/20 text-pink-300 border-pink-500/50",
  };
  const labels: Record<string, string> = {
    operand: "Operand",
    operator: "Operator",
    lparen: "Kurung Buka",
    rparen: "Kurung Tutup",
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-xl ${colors[type] ?? "bg-slate-700 text-white border-slate-600"}`}>
        {token}
      </span>
      <span className="text-xs text-slate-400">{labels[type] ?? type}</span>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
        <span>Step {current}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Precedence Table ─────────────────────────────────────────────────────────

function PrecTable() {
  const rows = [
    { op: "^", prec: 4, assoc: "Kanan", example: "2^3^2 = 2^(3^2)" },
    { op: "* / %", prec: 3, assoc: "Kiri", example: "6/2*3 = (6/2)*3" },
    { op: "+ -", prec: 2, assoc: "Kiri", example: "3+4-1 = (3+4)-1" },
  ];
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider font-mono">
            <th className="px-4 py-2 text-left">Operator</th>
            <th className="px-4 py-2 text-center">Preced.</th>
            <th className="px-4 py-2 text-center">Asosiatif</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">Contoh</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.op} className="border-t border-slate-800 text-slate-300">
              <td className="px-4 py-2 font-mono font-bold text-amber-400">{r.op}</td>
              <td className="px-4 py-2 text-center">{r.prec}</td>
              <td className="px-4 py-2 text-center text-xs">{r.assoc}</td>
              <td className="px-4 py-2 font-mono text-xs text-slate-500 hidden sm:table-cell">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InfixPostfixPage() {
  const [input, setInput] = useState("a + b * c - (d / e)");
  const [error, setError] = useState("");
  const [convSteps, setConvSteps] = useState<ConversionStep[]>([]);
  const [convIdx, setConvIdx] = useState(-1);
  const [postfix, setPostfix] = useState<string[]>([]);
  const [evalSteps, setEvalSteps] = useState<EvalStep[]>([]);
  const [evalIdx, setEvalIdx] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "converting" | "evaluating" | "done">("idle");
  const [showInfo, setShowInfo] = useState(false);
  const [canEval, setCanEval] = useState(false);

  const EXAMPLES = [
    "a + b * c - (d / e)",
    "3 + 4 * 2",
    "(3 + 4) * 2",
    "2 ^ 3 ^ 2",
    "10 + 3 * 5 / (16 - 4)",
    "A * B + C * D",
  ];

  const handleStart = useCallback(() => {
    setError("");
    const tokens = tokenize(input);
    if (!tokens || tokens.length === 0) {
      setError("Ekspresi tidak valid. Cek kembali inputannya!");
      return;
    }
    const steps = infixToPostfixSteps(tokens);
    if (!steps) {
      setError("Ekspresi tidak valid (kurung tidak seimbang atau karakter aneh).");
      return;
    }
    setConvSteps(steps);
    setConvIdx(0);
    setPhase("converting");
    setPostfix([]);
    setEvalSteps([]);
    setEvalIdx(-1);
    setCanEval(false);
  }, [input]);

  const handleNextConv = () => {
    if (convIdx < convSteps.length - 1) {
      setConvIdx((i) => i + 1);
    } else {
      // done converting
      const finalOutput = convSteps[convSteps.length - 1].output;
      setPostfix(finalOutput);
      setPhase("done");
      // check if purely numeric → can evaluate
      const allNum = finalOutput.every((t) => /^-?\d+(\.\d+)?$/.test(t) || isOperator(t));
      setCanEval(allNum);
    }
  };

  const handlePrevConv = () => {
    if (convIdx > 0) setConvIdx((i) => i - 1);
  };

  const handleStartEval = () => {
    const finalOutput = convSteps[convSteps.length - 1].output;
    const steps = evalPostfixSteps(finalOutput);
    if (!steps) {
      setError("Tidak bisa dievaluasi (mungkin ada variabel atau ekspresi tidak valid).");
      return;
    }
    setEvalSteps(steps);
    setEvalIdx(0);
    setPhase("evaluating");
  };

  const handleNextEval = () => {
    if (evalIdx < evalSteps.length - 1) setEvalIdx((i) => i + 1);
  };
  const handlePrevEval = () => {
    if (evalIdx > 0) setEvalIdx((i) => i - 1);
  };

  const handleReset = () => {
    setConvSteps([]);
    setConvIdx(-1);
    setEvalSteps([]);
    setEvalIdx(-1);
    setPostfix([]);
    setPhase("idle");
    setError("");
    setCanEval(false);
  };

  const curConv = convIdx >= 0 && convIdx < convSteps.length ? convSteps[convIdx] : null;
  const curEval = evalIdx >= 0 && evalIdx < evalSteps.length ? evalSteps[evalIdx] : null;
  const isLastConv = convIdx === convSteps.length - 1;
  const isLastEval = evalIdx === evalSteps.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap');
        .display-font { font-family: 'Space Grotesk', sans-serif; }
        @keyframes slideUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0); } 50% { box-shadow: 0 0 16px 4px rgba(251,191,36,0.25); } }
        .step-card { animation: slideUp 0.3s ease; }
        .active-step { animation: pulse-glow 2s infinite; }
      `}</style>

      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Calculator size={16} className="text-slate-900" />
            </div>
            <div>
              <div className="display-font font-bold text-sm text-white">Infix → Postfix</div>
              <div className="text-xs text-slate-500">Visual Simulator</div>
            </div>
          </div>
          <button
            onClick={() => setShowInfo((v) => !v)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors
              ${showInfo ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
          >
            <Info size={13} />
            Teori
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Info panel */}
        {showInfo && (
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-4 step-card">
            <h2 className="display-font font-bold text-blue-300 flex items-center gap-2">
              <Info size={16} />
              Algoritma Shunting-Yard (Dijkstra)
            </h2>
            <div className="text-sm text-slate-300 space-y-2 leading-relaxed">
              <p>Notasi <span className="text-amber-300 font-bold">infix</span> adalah cara nulis ekspresi yang biasa kita pakai, kayak <code className="bg-slate-800 px-1 rounded">A + B</code>. Operator ada di <em>tengah</em> operand.</p>
              <p>Notasi <span className="text-emerald-300 font-bold">postfix</span> (Polish Reverse) nulis operator di <em>belakang</em>, kayak <code className="bg-slate-800 px-1 rounded">A B +</code>. Komputer jauh lebih gampang evaluasi ini karena gak butuh tanda kurung!</p>
              <div className="bg-slate-900 rounded-lg p-4 space-y-2 text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider mb-2">Aturan Konversi:</div>
                <div className="flex gap-2"><span className="text-blue-400 w-16 shrink-0">Operand</span><span>→ langsung ke output</span></div>
                <div className="flex gap-2"><span className="text-pink-400 w-16 shrink-0">(</span><span>→ push ke stack</span></div>
                <div className="flex gap-2"><span className="text-pink-400 w-16 shrink-0">)</span><span>→ pop stack ke output sampai ketemu "(", hapus "("</span></div>
                <div className="flex gap-2"><span className="text-orange-400 w-16 shrink-0">Operator</span><span>→ pop stack ke output selama prec stack ≥ prec token (kecuali asosiatif kanan), lalu push</span></div>
                <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">Selesai</span><span>→ pop sisa stack ke output</span></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Tabel Presedensi:</div>
              <PrecTable />
            </div>
          </div>
        )}

        {/* Input section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <h3 className="display-font font-semibold text-slate-200 flex items-center gap-2">
            <Braces size={16} className="text-amber-400" />
            Input Ekspresi Infix
          </h3>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter" && phase === "idle") handleStart(); }}
              placeholder="Contoh: a + b * c"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
            />
            {phase === "idle" ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
              >
                <Play size={15} />
                Mulai
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm rounded-xl transition-colors"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            )}
          </div>

          {error && (
            <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
              ⚠️ {error}
            </div>
          )}

          {/* Example quick picks */}
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setError(""); handleReset(); }}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-400 font-mono transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Phase: CONVERTING */}
        {(phase === "converting" || phase === "done" || phase === "evaluating") && curConv && (
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-5 space-y-5 step-card">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="display-font font-semibold text-amber-400 flex items-center gap-2">
                <FileStack size={16} />
                Fase 1: Konversi Infix → Postfix
              </h3>
              {phase !== "converting" && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                  <CheckCircle size={13} />
                  Selesai
                </span>
              )}
            </div>

            <ProgressBar current={convIdx + 1} total={convSteps.length} />

            {/* Tokens row */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Token ekspresi:</div>
              <div className="flex flex-wrap gap-2">
                {convSteps.map((s, i) => {
                  // Find unique tokens processed so far
                  const isProcessed = i <= convIdx;
                  const isCurrent = i === convIdx;
                  return (
                    <div
                      key={i}
                      className={`px-2.5 py-1 rounded-lg font-mono text-sm border transition-all
                        ${isCurrent ? "bg-amber-400 text-slate-900 border-amber-300 font-bold scale-110 shadow-lg shadow-amber-400/30 active-step"
                          : isProcessed ? "bg-slate-700 text-slate-300 border-slate-600"
                          : "bg-slate-900 text-slate-600 border-slate-800"}`}
                    >
                      {s.token}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step detail */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 text-xs font-bold shrink-0 mt-0.5">
                  {convIdx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-400 text-xs">Token aktif:</span>
                    <TokenBadge token={curConv.token} type={curConv.tokenType} />
                  </div>
                  <p className="text-sm text-slate-200">{curConv.action}</p>
                </div>
              </div>

              {/* Stack + Output */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <StackVisual items={curConv.stack} label="Stack" />
                <div className="flex items-center justify-center">
                  <OutputVisual items={curConv.output} />
                </div>
              </div>
            </div>

            {/* Controls */}
            {phase === "converting" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevConv}
                  disabled={convIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={15} />
                  Prev
                </button>
                <button
                  onClick={handleNextConv}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold transition-colors
                    ${isLastConv
                      ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-900"}`}
                >
                  {isLastConv ? (
                    <>
                      <CheckCircle size={15} />
                      Selesaikan
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight size={15} />
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setConvIdx(convSteps.length - 1);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs hover:border-slate-600 transition-colors"
                >
                  <SkipForward size={13} />
                  Skip
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result postfix + eval trigger */}
        {(phase === "done" || phase === "evaluating") && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 step-card">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <CheckCircle size={12} className="text-emerald-400" />
                  Hasil Postfix
                </div>
                <div className="flex flex-wrap gap-2">
                  {postfix.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2 font-mono text-slate-400 text-sm">
                  Postfix: <span className="text-emerald-300">{postfix.join(" ")}</span>
                </div>
              </div>
              {canEval && phase === "done" && (
                <button
                  onClick={handleStartEval}
                  className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-400 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Calculator size={15} />
                  Evaluasi Postfix
                </button>
              )}
              {!canEval && phase === "done" && (
                <div className="text-xs text-slate-500 italic max-w-xs">
                  💡 Evaluasi hanya tersedia kalau ekspresi berisi angka (bukan variabel)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phase: EVALUATING */}
        {phase === "evaluating" && curEval && (
          <div className="rounded-2xl border border-violet-500/30 bg-slate-900/80 p-5 space-y-5 step-card">
            <div className="flex items-center justify-between">
              <h3 className="display-font font-semibold text-violet-400 flex items-center gap-2">
                <Hash size={16} />
                Fase 2: Evaluasi Ekspresi Postfix
              </h3>
              {isLastEval && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                  <CheckCircle size={13} />
                  Selesai
                </span>
              )}
            </div>

            <ProgressBar current={evalIdx + 1} total={evalSteps.length} />

            {/* Postfix tokens */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Token postfix:</div>
              <div className="flex flex-wrap gap-2">
                {evalSteps.map((s, i) => (
                  <div
                    key={i}
                    className={`px-2.5 py-1 rounded-lg font-mono text-sm border transition-all
                      ${i === evalIdx ? "bg-violet-500 text-white border-violet-400 font-bold scale-110 shadow-lg shadow-violet-500/30"
                        : i < evalIdx ? "bg-slate-700 text-slate-300 border-slate-600"
                        : "bg-slate-900 text-slate-600 border-slate-800"}`}
                  >
                    {s.token}
                  </div>
                ))}
              </div>
            </div>

            {/* Step detail */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  {evalIdx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-400 text-xs">Token aktif:</span>
                    <span className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-xl
                      ${curEval.tokenType === "operand"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                        : "bg-orange-500/20 text-orange-300 border-orange-500/50"}`}>
                      {curEval.token}
                    </span>
                    <span className="text-xs text-slate-400">
                      {curEval.tokenType === "operand" ? "Angka" : "Operator"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200">{curEval.action}</p>
                  {curEval.result !== undefined && (
                    <div className="flex items-center gap-2 mt-1">
                      <ArrowRight size={14} className="text-violet-400" />
                      <span className="text-violet-300 font-bold font-mono">
                        Hasil: {Number.isNaN(curEval.result) ? "ERROR (div by 0)" : (Number.isInteger(curEval.result) ? curEval.result : curEval.result.toFixed(6))}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <EvalStackVisual items={curEval.stack} />
              </div>
            </div>

            {/* Final result */}
            {isLastEval && evalSteps[evalIdx].stack.length === 1 && (
              <div className="rounded-xl bg-gradient-to-r from-violet-500/20 to-emerald-500/20 border border-violet-500/40 p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">Hasil Akhir</div>
                <div className="display-font text-3xl font-bold text-white">
                  {Number.isInteger(evalSteps[evalIdx].stack[0])
                    ? evalSteps[evalIdx].stack[0]
                    : (evalSteps[evalIdx].stack[0] as number).toFixed(6)}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{input} = {evalSteps[evalIdx].stack[0]}</div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevEval}
                disabled={evalIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
                Prev
              </button>
              <button
                onClick={handleNextEval}
                disabled={isLastEval}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-violet-500 hover:bg-violet-400 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Idle state hint */}
        {phase === "idle" && (
          <div className="text-center py-12 text-slate-600 space-y-2">
            <Calculator size={32} className="mx-auto opacity-30" />
            <p className="text-sm">Masukkan ekspresi infix di atas, terus klik <span className="text-amber-400">Mulai</span></p>
            <p className="text-xs">atau pilih salah satu contoh</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-slate-700 pb-4 font-mono">
          Shunting-Yard Algorithm · Dijkstra · 1961
        </div>
      </div>
    </div>
  );
}