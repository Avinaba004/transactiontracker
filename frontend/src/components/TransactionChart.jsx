import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TransactionChart.css";

export default function TransactionChart({ transactions }) {
  const monthlyData = {};
  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    const year = d.getFullYear();
    const month = d.toLocaleString("default", { month: "short" });
    const key = `${year}-${month}`;
    monthlyData[key] = (monthlyData[key] || 0) + tx.amount;
  });

  const chartData = Object.entries(monthlyData).map(([key, amount]) => {
    const [year, month] = key.split("-");
    return { label: `${month} ${year}`, amount };
  });

  // sort by year then by month
  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  chartData.sort((a, b) => {
    const [mA, yA] = a.label.split(" ");
    const [mB, yB] = b.label.split(" ");
    if (+yA !== +yB) return +yA - +yB;
    return monthOrder.indexOf(mA) - monthOrder.indexOf(mB);
  });

  return (
    <div className="chart-card">
      <h2 className="chart-title">Monthly Expenses</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
          >
            <XAxis
              dataKey="label"
              interval={0}
              height={60}
              tickLine={{ stroke: "#ccc" }}
              axisLine={{ stroke: "#ccc" }}
              tick={{ angle: -45, textAnchor: "end", className: "axis-text" }}
            />
            <YAxis
              axisLine={{ stroke: "#ccc" }}
              tickLine={{ stroke: "#ccc" }}
              tick={{ className: "axis-text" }}
            />
            <Tooltip contentClassName="tooltip" />
            <Bar dataKey="amount" fill="#4f46e5" className="bar-fill" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
