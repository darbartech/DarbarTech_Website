import {
  Award,
  BarChart3,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, PageHeader, StatCard } from "../components/ui";
import { results } from "../data";

const percentageOf = (obtained: number, total: number) =>
  Math.round((obtained / total) * 100);

export default function ResultsPage() {
  const averages = results.map((r) => percentageOf(r.obtained, r.total));
  const overall =
    Math.round(
      averages.reduce((s, a) => s + a, 0) / averages.length,
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessments & Results"
        subtitle="Your scores, grades and performance summary."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<BarChart3 size={16} />} label="Assessment Average" value={`${overall}%`} />
        <StatCard icon={<TrendingUp size={16} />} label="Highest Score" value="90%" sub="HTML Quiz 1" />
        <StatCard icon={<GraduationCap size={16} />} label="Course Average" value="82%" sub="Full Stack Web Development" />
        <StatCard icon={<Award size={16} />} label="Completion Status" value="On Track" />
      </div>

      <Card>
        <CardHeader title="Recent Performance" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 border-collapse text-left">
            <thead>
              <tr>
                {[
                  "Assessment",
                  "Course",
                  "Date",
                  "Marks",
                  "Percentage",
                  "Grade",
                  "Feedback",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b border-(--border-primary-dashboard) px-4 py-2.5 text-xs font-semibold text-(--tertiary-text-dashboard)"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-(--border-primary-dashboard) last:border-b-0 hover:bg-(--bg-table)"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-(--text-primary-dashboard)">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)/80">
                    {row.course}
                  </td>
                  <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)/80">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-(--text-primary-dashboard)/80">
                    {row.obtained} / {row.total}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--bg-lightblue)" }}
                    >
                      {percentageOf(row.obtained, row.total)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-xs font-semibold"
                      style={{
                        background: "var(--secondary-bg-dashboard)",
                        color: "var(--secondary-text-dashboard)",
                      }}
                    >
                      {row.grade}
                    </span>
                  </td>
                  <td className="max-w-56 px-4 py-3 text-xs text-(--tertiary-text-dashboard)">
                    {row.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}