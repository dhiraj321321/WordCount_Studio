import React, { useState } from "react";
import { submitText } from "../api";

const THEMES = [
    { id: "aurora", label: "Aurora", hint: "Cool focus mode" },
    { id: "cyber", label: "Cyberwave", hint: "Neon contrast" },
    { id: "sunset", label: "Sunset", hint: "Warm reading" }
];

export default function EditorPane() {
    const [content, setContent] = useState("");
    const [theme, setTheme] = useState("aurora");
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!content.trim()) return;
        setLoading(true);
        try {
            await submitText(content, theme);
            // analytics pane will refetch data via global state or polling
            window.dispatchEvent(new Event("ws-refresh"));
        } finally {
            setLoading(false);
        }
    };

    const wordPreview = content.trim()
        ? content.trim().split(/\s+/).length
        : 0;

    return (
        <section className={`ws-editor ws-theme-${theme}`}>
            <div className="ws-editor-top">
                <div>
                    <h1 className="ws-editor-title">Live text canvas</h1>
                    <p className="ws-editor-sub">
                        Paste or type. The right panel turns your words into rich analytics.
                    </p>
                </div>
                <div className="ws-theme-chips">
                    {THEMES.map((t) => (
                        <button
                            key={t.id}
                            className={
                                "ws-chip " + (theme === t.id ? "ws-chip-active" : "")
                            }
                            onClick={() => setTheme(t.id)}
                        >
                            <span className="ws-chip-dot" />
                            <span className="ws-chip-main">{t.label}</span>
                            <span className="ws-chip-hint">{t.hint}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="ws-editor-shell">
                <div className="ws-editor-bar">
                    <span className="ws-dot red" />
                    <span className="ws-dot amber" />
                    <span className="ws-dot green" />
                    <span className="ws-editor-bar-label">
            draft.txt • {wordPreview} words (local)
          </span>
                </div>
                <textarea
                    className="ws-textarea"
                    placeholder="Write like an engineer, thinker, or storyteller..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="ws-editor-actions">
                <button
                    className="ws-btn ghost"
                    onClick={() => setContent("")}
                    disabled={loading}
                >
                    Clear
                </button>
                <button
                    className="ws-btn primary"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? "Analyzing…" : "Generate analytics"}
                </button>
            </div>
        </section>
    );
}
