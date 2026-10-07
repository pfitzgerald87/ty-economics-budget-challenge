"use client";

import { useMemo, useState } from 'react';
import {
  budgetBands,
  departments,
  electionBands,
  gameFlow,
  taxDecisions,
  userRoles
} from '@/lib/gameData';

const emptySelections = departments.reduce((acc, department) => {
  acc[department.id] = { issues: [], cuts: [] };
  return acc;
}, {});

function getBudgetScore(balance) {
  if (balance >= 250000) return 5;
  if (balance >= 10000) return 3;
  if (balance >= -180000) return 0;
  if (balance >= -450000) return -5;
  return -10;
}

function getElectionResult(score) {
  if (score >= 30) return 'Landslide Victory';
  if (score >= 20) return 'Majority Government';
  if (score >= 10) return 'Re-Elected';
  if (score >= 0) return 'Hung Parliament';
  return 'Government Defeated';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
}

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('Minister for Finance');
  const [selectedTaxes, setSelectedTaxes] = useState(['carbon-tax', 'income-tax-up']);
  const [selections, setSelections] = useState(emptySelections);

  function toggleTax(id) {
    setSelectedTaxes((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function toggleSelection(departmentId, type, itemId) {
    setSelections((current) => {
      const departmentSelection = current[departmentId] || { issues: [], cuts: [] };
      const key = type === 'issue' ? 'issues' : 'cuts';
      const items = departmentSelection[key] || [];

      const nextItems = items.includes(itemId)
        ? items.filter((value) => value !== itemId)
        : [...items, itemId];

      return {
        ...current,
        [departmentId]: {
          ...departmentSelection,
          [key]: nextItems
        }
      };
    });
  }

  const departmentSummaries = useMemo(() => {
    return departments.map((department) => {
      const selectedIssueIds = selections[department.id]?.issues || [];
      const selectedCutIds = selections[department.id]?.cuts || [];

      const issues = department.issues.filter((issue) => selectedIssueIds.includes(issue.id));
      const cuts = department.cuts.filter((cut) => selectedCutIds.includes(cut.id));

      const issueCost = issues.reduce((total, item) => total + item.cost, 0);
      const savingsGenerated = issues.reduce((total, item) => total + item.savings, 0)
        + cuts.reduce((total, item) => total + item.savings, 0);
      const fundingRequest = Math.max(0, issueCost - savingsGenerated);
      const ministerScore = issues.reduce((total, item) => total + item.score, 0)
        + cuts.reduce((total, item) => total + item.score, 0);

      return {
        ...department,
        issues,
        cuts,
        issueCost,
        savingsGenerated,
        fundingRequest,
        ministerScore
      };
    });
  }, [selections]);

  const selectedTaxObjects = taxDecisions.filter((tax) => selectedTaxes.includes(tax.id));
  const totalTaxRevenue = selectedTaxObjects.reduce((sum, decision) => sum + decision.revenue, 0);
  const totalFundingRequest = departmentSummaries.reduce((sum, department) => sum + department.fundingRequest, 0);
  const budgetBalance = totalTaxRevenue - totalFundingRequest;
  const budgetScore = getBudgetScore(budgetBalance);
  const taxScore = selectedTaxObjects.reduce((sum, decision) => sum + decision.score, 0);
  const averageMinisterScore = departmentSummaries.length
    ? departmentSummaries.reduce((sum, department) => sum + department.ministerScore, 0) / departmentSummaries.length
    : 0;
  const governmentScore = averageMinisterScore + taxScore + budgetScore;
  const electionResult = getElectionResult(governmentScore);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-900/80 via-slate-900 to-emerald-900/80 p-6 shadow-soft">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28rem] text-sky-200">Government simulation</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">TY Economics Budget Challenge</h1>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-200">Role</label>
              <select
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                className="rounded-xl border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none ring-0"
              >
                {userRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'Avg Minister Score', value: averageMinisterScore.toFixed(1), tone: 'sky' },
            { label: 'Tax Score', value: taxScore.toFixed(1), tone: 'violet' },
            { label: 'Budget Score', value: budgetScore.toFixed(1), tone: 'emerald' },
            { label: 'Government Score', value: governmentScore.toFixed(1), tone: 'amber' },
            { label: 'Election Result', value: electionResult, tone: 'rose' }
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <nav className="mb-8 flex flex-wrap gap-3">
          {gameFlow.map((step, index) => (
            <div
              key={step}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                index === 0
                  ? 'border-sky-400 bg-sky-500/10 text-sky-200'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              {index + 1}. {step}
            </div>
          ))}
        </nav>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">Tax Summit</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Tax Decisions</h2>
                </div>
                <span className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-200">
                  {selectedTaxObjects.length} selected
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {taxDecisions.map((decision) => {
                  const isSelected = selectedTaxes.includes(decision.id);
                  return (
                    <button
                      key={decision.id}
                      onClick={() => toggleTax(decision.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-50'
                          : 'border-slate-700 bg-slate-950/30 text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold">{decision.label}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          decision.score >= 0 ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'
                        }`}>
                          {decision.score > 0 ? '+' : ''}{decision.score}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{decision.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                        <span>Revenue: {formatCurrency(decision.revenue)}</span>
                        <span>{isSelected ? 'Selected' : 'Click to select'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">Departments</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Department Decisions</h2>
                </div>
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
                  {departmentSummaries.filter((department) => department.issues.length || department.cuts.length).length} active
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {departments.map((department) => {
                  const selection = selections[department.id] || { issues: [], cuts: [] };
                  const deptSummary = departmentSummaries.find((item) => item.id === department.id);

                  return (
                    <div key={department.id} className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{department.name}</h3>
                          <p className="text-xs text-slate-400">{department.tagline}</p>
                        </div>
                        <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.18rem] text-slate-300">
                          {department.priority}
                        </span>
                      </div>

                      <div className="mb-4 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                          <p className="text-[10px] uppercase tracking-[0.18rem] text-slate-400">Funding request</p>
                          <p className="mt-2 text-lg font-bold text-amber-200">{formatCurrency(deptSummary.fundingRequest)}</p>
                        </div>
                        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                          <p className="text-[10px] uppercase tracking-[0.18rem] text-slate-400">Minister score</p>
                          <p className="mt-2 text-lg font-bold text-emerald-200">{deptSummary.ministerScore}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.18rem] text-slate-400">Issues to fix</p>
                          <div className="space-y-2">
                            {department.issues.map((issue) => {
                              const isSelected = selection.issues.includes(issue.id);
                              return (
                                <button
                                  key={issue.id}
                                  onClick={() => toggleSelection(department.id, 'issue', issue.id)}
                                  className={`w-full rounded-xl border p-3 text-left transition ${
                                    isSelected
                                      ? 'border-sky-400 bg-sky-500/10'
                                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold text-white">{issue.title}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                      issue.score >= 0 ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'
                                    }`}>
                                      {issue.score > 0 ? '+' : ''}{issue.score}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                                    <span>Cost: {formatCurrency(issue.cost)}</span>
                                    <span>Savings: {formatCurrency(issue.savings)}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.18rem] text-slate-400">Spending cuts</p>
                          <div className="space-y-2">
                            {department.cuts.map((cut) => {
                              const isSelected = selection.cuts.includes(cut.id);
                              return (
                                <button
                                  key={cut.id}
                                  onClick={() => toggleSelection(department.id, 'cut', cut.id)}
                                  className={`w-full rounded-xl border p-3 text-left transition ${
                                    isSelected
                                      ? 'border-amber-400 bg-amber-500/10'
                                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold text-white">{cut.title}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                      cut.score >= 0 ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'
                                    }`}>
                                      {cut.score > 0 ? '+' : ''}{cut.score}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                                    <span>Cost: {formatCurrency(cut.cost)}</span>
                                    <span>Savings: {formatCurrency(cut.savings)}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">Budget summary</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Funding & Budget</h2>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Tax revenue</span>
                    <span className="font-bold text-emerald-200">{formatCurrency(totalTaxRevenue)}</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Funding requests</span>
                    <span className="font-bold text-amber-200">{formatCurrency(totalFundingRequest)}</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Budget balance</span>
                    <span className="font-bold text-sky-200">{formatCurrency(budgetBalance)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2rem] text-emerald-200">Budget score</p>
                <p className="mt-2 text-3xl font-black text-white">{budgetScore}</p>
                <p className="mt-2 text-sm text-emerald-100">
                  {budgetBands.find((band) => band.value === budgetScore)?.label || 'Budget not classified yet'}
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">Election night</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Result forecast</h2>

              <div className="mt-5 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2rem] text-sky-200">Government score</p>
                <p className="mt-2 text-3xl font-black text-white">{governmentScore.toFixed(1)}</p>
                <p className="mt-2 text-sm text-sky-100">{electionResult}</p>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-300">
                {electionBands.map((band) => (
                  <div
                    key={band.label}
                    className={`rounded-xl border px-3 py-2 ${
                      band.label === electionResult
                        ? 'border-amber-400 bg-amber-500/10 text-amber-100'
                        : 'border-slate-700 bg-slate-950/30'
                    }`}
                  >
                    {band.label}: {band.range}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2rem] text-slate-400">Game features</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Future roadmap</h2>

              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li className="rounded-xl border border-slate-700 bg-slate-950/30 p-3">Event cards and breaking news</li>
                <li className="rounded-xl border border-slate-700 bg-slate-950/30 p-3">Coalition government scenarios</li>
                <li className="rounded-xl border border-slate-700 bg-slate-950/30 p-3">Live polling tracker</li>
                <li className="rounded-xl border border-slate-700 bg-slate-950/30 p-3">Classroom leaderboards</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
