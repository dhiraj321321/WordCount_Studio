import React, { useEffect, useState } from "react";
import { fetchHistory } from "../api";
import StatTile from "./StatTile";

export default function AnalyticsPane() {
    const [latest, setLatest] = useState(null);
    const [history, setHistory] = useState([]);

    const load = async () => {
        try {
            const list = await fetchHistory();
            setHistory(list);
            setLatest(list.length ? list[list.length - 1] : null);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        load();
        const handler = () => load();
        window.addEventListener("ws-refresh", handler);
        return () => window.removeEventListener("ws-refresh", handler);
    }, []);

    const wc = latest?.wordCount || 0;
    const charCount = latest?.charCount || 0;
    const sentenceCount = latest?.sentenceCount || 0;
    const paragraphCount = latest?.paragraphCount || 0;

    // Clarity insight: best when 200–300 words
    const readabilityScore = latest
        ? Math.min(100, Math.max(0, 100 - Math.abs(wc - 250)))
        : 0;

    return (
        <aside className="ws-analytics">
            <div className="ws-analytics-header">
                <h2>Session analytics</h2>
                <p>Backed by your Spring Boot + PostgreSQL engine.</p>
            </div>

            <div className="ws-analytics-grid">
                <StatTile
                    label="Words"
                    value={wc}
                    subtitle="Core unit of your message"
                    tone="teal"
                />
                <StatTile
                    label="Characters"
                    value={charCount}
                    subtitle="Including spaces"
                    tone="violet"
                />
                <StatTile
                    label="Sentences"
                    value={sentenceCount}
                    subtitle="Rhythm of your text"
                    tone="amber"
                />
                <StatTile
                    label="Paragraphs"
                    value={paragraphCount}
                    subtitle="Visual breathing space"
                    tone="rose"
                />
            </div>

            <div className="ws-ring-card">
                <div className="ws-ring">
                    <div
                        className="ws-ring-fill"
                        style={{ "--ws-ring-progress": `${readabilityScore}` }}
                    />
                    <div className="ws-ring-center">
                        <span className="ws-ring-score">{readabilityScore}</span>
                        <span className="ws-ring-label">readability</span>
                    </div>
                </div>
                <div className="ws-ring-text">
                    <h3>Clarity insight</h3>
                    <p>
                        This synthetic score rewards concise blocks around 200–300 words,
                        ideal for technical write‑ups.
                    </p>
                </div>
            </div>

            <div className="ws-history-card">
                <div className="ws-history-head">
                    <h3>Recent drafts</h3>
                </div>
                <div className="ws-history-list">
                    {history
                        .slice()
                        .reverse()
                        .slice(0, 6)
                        .map((item) => (
                            <div key={item.id} className="ws-history-row">
                                <div className="ws-history-meta">
                                    <span className="ws-history-id">#{item.id}</span>
                                    <span className="ws-history-time">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                                </div>
                                <div className="ws-history-line">
                                    {item.wordCount}w • {item.charCount}c
                                </div>
                                <div className="ws-history-snippet">
                                    {item.content.length > 80
                                        ? item.content.slice(0, 80) + "…"
                                        : item.content}
                                </div>
                            </div>
                        ))}
                    {!history.length && (
                        <div className="ws-history-empty">
                            Analyze your first draft to populate this timeline.
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
