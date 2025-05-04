"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "Jan",
    interactions: 4000,
  },
  {
    name: "Feb",
    interactions: 3000,
  },
  {
    name: "Mar",
    interactions: 2000,
  },
  {
    name: "Apr",
    interactions: 2780,
  },
  {
    name: "May",
    interactions: 1890,
  },
  {
    name: "Jun",
    interactions: 2390,
  },
  {
    name: "Jul",
    interactions: 3490,
  },
  {
    name: "Aug",
    interactions: 4000,
  },
  {
    name: "Sep",
    interactions: 5000,
  },
  {
    name: "Oct",
    interactions: 6000,
  },
  {
    name: "Nov",
    interactions: 7000,
  },
  {
    name: "Dec",
    interactions: 8000,
  },
]

export function Overview() {
  return (
    <div className="rounded-lg overflow-hidden">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
          />
          <Bar dataKey="interactions" fill="url(#colorInteractions)" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
