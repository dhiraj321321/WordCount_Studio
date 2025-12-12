import React from "react";

export default function StatTile({ label, value, subtitle, tone }) {
    return (
        <div className={`ws-tile ws-tile-${tone}`}>
            <div className="ws-tile-label">{label}</div>
            <div className="ws-tile-value">{value}</div>
            {subtitle && <div className="ws-tile-sub">{subtitle}</div>}
        </div>
    );
}
