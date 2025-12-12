import React from "react";
import "./App.css";
import EditorPane from "./components/EditorPane";
import AnalyticsPane from "./components/AnalyticsPane";
import { fetchHistory } from "./api";

function App() {
    const handleExport = async () => {
        try {
            const list = await fetchHistory();
            if (!list.length) return;

            const latest = list[list.length - 1];

            const lines = [
                "WordStudio Neo – Report",
                `ID: ${latest.id}`,
                `Created: ${new Date(latest.createdAt).toString()}`,
                "",
                `Words: ${latest.wordCount}`,
                `Characters: ${latest.charCount}`,
                `Sentences: ${latest.sentenceCount}`,
                `Paragraphs: ${latest.paragraphCount}`,
                "",
                "Content:",
                latest.content
            ];

            const blob = new Blob([lines.join("\n")], {
                type: "text/plain;charset=utf-8"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `wordstudio-report-${latest.id}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Export failed", e);
        }
    };

    return (
        <div className="ws-root">
            <div className="ws-bg-orbit" />
            <header className="ws-header">
                <div className="ws-logo">
                    <span className="ws-logo-mark">W</span>
                    <span className="ws-logo-text">WordStudio Neo</span>
                </div>
                <div className="ws-header-right">
                    <span className="ws-beta-pill">Week 8 • Wordcount Tools</span>
                    <button className="ws-ghost-btn" onClick={handleExport}>
                        Export report
                    </button>
                </div>
            </header>

            <main className="ws-main-grid">
                <EditorPane />
                <AnalyticsPane />
            </main>

            <footer className="ws-footer">
                React + Spring Boot + PostgreSQL • Advanced Wordcount UI
            </footer>
        </div>
    );
}

export default App;
