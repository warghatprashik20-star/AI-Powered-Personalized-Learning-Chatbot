import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ProgressChart from "../components/ProgressChart";
import QuizGenerator from "../components/QuizGenerator";
import VoiceAssistant from "../components/VoiceAssistant";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />

      {/* Main content */}
      <div className="ml-64 flex-1">
        <Navbar />

        <main className="p-6">
          {/* Welcome header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, Student!</h1>
            <p className="mt-1 text-sm text-gray-400">
              Here's your learning overview for today
            </p>
          </div>

          {/* Stats cards */}
          <DashboardCards />

          {/* Charts + Quiz row */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProgressChart />
            <QuizGenerator />
          </div>

          {/* Voice assistant */}
          <div className="mt-6">
            <VoiceAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
