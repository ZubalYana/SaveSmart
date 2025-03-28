import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

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
                        fill="#1E3A8A"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
