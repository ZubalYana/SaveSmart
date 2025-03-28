import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = [
    "#1E3A8A",
    "#0047AB",
    "#2643A6",
    "#4672F1",
    "#5A9BFF",
    "#5887D2",
    "#7BA7F8",
    "#9EC1FF",
    "#B0D0FF",
    "#1E90FF",
];

export default function IncomePieChart({ data }) {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
