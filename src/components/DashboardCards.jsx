import { motion } from "framer-motion";
import { Flame, BookOpen, Target, Star } from "lucide-react";

const stats = [
  {
    label: "Learning Streak",
    value: "12 Days",
    icon: Flame,
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Lessons Completed",
    value: "48",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Accuracy",
    value: "87%",
    icon: Target,
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "XP Points",
    value: "2,450",
    icon: Star,
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-violet-500/5"
        >
          {/* Gradient accent */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
          />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon
                className={`h-6 w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text`}
                style={{
                  color: `var(--tw-gradient-from)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
