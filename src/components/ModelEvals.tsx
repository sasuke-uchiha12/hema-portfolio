import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { LineChart as LineChartIcon, Target, Activity, ChartCandlestick } from 'lucide-react'
import { evals } from '../data/content'

function EvalChart() {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChartIcon className="w-4 h-4 text-white/80" />
          <h3 className="text-base font-semibold tracking-tight">Pass@1 by model (weekly)</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-white/60">Live data</span>
        </div>
      </div>

      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={evals.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="evalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[50, 90]}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#fff',
                fontSize: 12,
              }}
              formatter={(value: number) => [`${value}%`, 'Pass@1']}
              cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#ffffff"
              strokeWidth={1.5}
              fill="url(#evalGrad)"
              dot={{ r: 2, fill: '#ffffff', strokeWidth: 0 }}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {evals.summaryCards.map((card) => (
          <div key={card.label} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-white/60">{card.label}</div>
            <div className="text-lg font-semibold tracking-tight">{card.value}</div>
            <div className={`text-xs mt-1 ${card.subColor}`}>{card.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EvalCategories() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-white/70" />
        <h4 className="text-sm font-medium tracking-tight">Eval Categories</h4>
      </div>
      <div className="space-y-2">
        {evals.categories.map((cat) => (
          <div key={cat.label} className="flex justify-between items-center">
            <span className="text-xs text-white/70">{cat.label}</span>
            <span className="text-xs font-medium">{cat.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentTests() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-white/70" />
        <h4 className="text-sm font-medium tracking-tight">Recent Tests</h4>
      </div>
      <div className="space-y-3">
        {evals.recentTests.map((test) => (
          <div key={test.name} className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/90">{test.name}</div>
              <div className="text-[10px] text-white/60">{test.time}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${test.color}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

function EvalFramework() {
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ChartCandlestick className="w-4 h-4 text-white/80" />
          <h4 className="text-sm font-medium tracking-tight">Evaluation Framework</h4>
        </div>
        <span className="text-xs text-white/60">{evals.frameworkStats}</span>
      </div>
      <p className="text-xs text-white/70 leading-relaxed">{evals.frameworkDesc}</p>
    </div>
  )
}

export default function ModelEvals() {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl tracking-tight">Model Evals</h2>
      <p className="text-white/70 mt-2">
        Continuous evaluation of prompts, tools, and retrieval quality across production workloads.
      </p>
      <EvalChart />
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EvalCategories />
        <RecentTests />
      </div>
      <EvalFramework />
    </>
  )
}
