"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Bell, Dumbbell } from "lucide-react";
import { MobileBottomNav } from "./shared/MobileBottomNav";
import { DesktopBottomNav } from "./shared/DesktopBottomNav";
import { FilterTabs } from "./shared/FilterTabs";

interface WorkoutPlanViewProps {
  onNavigate: (view: "activity" | "plan" | "workout") => void;
  onSelectWorkout: (workoutId: "upper" | "lower") => void;
}

export function WorkoutPlanView({
  onNavigate,
  onSelectWorkout,
}: WorkoutPlanViewProps) {
  const workouts = [
    {
      id: "upper" as const,
      title: "Upper body workout",
      duration: "20 mins",
      calories: 328,
      type: "Cardio",
      exercises: "Chest / Shoulders / Triceps",
      color: "from-pink-300 to-pink-400",
      image: "/images/3.svg",
    },
    {
      id: "lower" as const,
      title: "Lower body workout",
      duration: "32 mins",
      calories: 538,
      type: "Cardio",
      exercises: "Glutes / Squads / Hamstrings",
      color: "from-purple-400 to-purple-500",
      image: "/images/2.svg",
    },
  ];

  const handleWorkoutClick = (workoutId: "upper" | "lower") => {
    onSelectWorkout(workoutId);
    // Navigation is now handled in the onSelectWorkout callback
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate("activity")}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/avatars/4.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">HI ABEBA</p>
                  <span className="flex gap-2 items-center text-sm text-gray-400">
                    <Dumbbell className="w-3 h-3" />
                    Fitness Freak
                  </span>
                </div>
              </div>
            </div>
            <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
              <Bell className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-[#d4ff00] to-[#b8e600] rounded-3xl p-8 mb-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black/70 mb-2">
                      Progress
                    </p>
                    <p className="text-3xl font-black text-black mb-1">
                      Lower Body
                    </p>
                    <p className="text-base text-black/70 mb-4">
                      Cardio • 18 mins
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="bg-black/20 rounded-full px-6 py-3">
                        <p className="text-3xl font-black text-black">538</p>
                        <p className="text-xs text-black/70">CALORIES</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-32 h-32 relative">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#000"
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset="63"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg font-black text-black">75%</p>
                      </div>
                    </div>
                    <div className="absolute right-32 -bottom-20 w-56 h-56">
                      <Image
                        src="/images/4.svg"
                        alt="Exercise"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your plan</h2>
              </div>

              <FilterTabs
                tabs={[
                  { id: "all", label: "All workouts" },
                  { id: "lower", label: "Lower body" },
                  { id: "upper", label: "Upper body" },
                ]}
                activeTab="all"
              />

              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleWorkoutClick(workout.id)}
                    className={`bg-gradient-to-br ${workout.color} rounded-3xl p-6 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-xl font-bold text-white mb-2">
                          {workout.title}
                        </p>
                        <div className="inline-block bg-black/20 rounded-full px-3 py-1 mb-3">
                          <p className="text-xs font-semibold text-white">
                            {workout.type} • {workout.exercises}
                          </p>
                        </div>
                        <p className="text-sm text-white/90">
                          {workout.exercises}
                        </p>
                      </div>
                      <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs font-bold text-black">
                            {workout.duration.split(" ")[0]}
                          </p>
                          <p className="text-[10px] text-black/70">mins</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="absolute right-20 -bottom-6 w-36 h-36">
                        <Image
                          src={workout.image}
                          alt="Exercise"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <DesktopBottomNav activeTab="workouts" />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mobile-container relative pb-24 md:pb-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate("activity")}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src="/images/avatars/4.svg"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">HI ABEBA</p>
                    <span className="flex gap-2 items-center text-xs text-gray-400">
                      <Dumbbell className="w-3 h-3" />
                      Fitness Freak
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#d4ff00] to-[#b8e600] rounded-3xl p-6 mb-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black/70 mb-2">
                    Progress
                  </p>
                  <p className="text-2xl font-black text-black mb-1">
                    Lower Body
                  </p>
                  <p className="text-sm text-black/70 mb-3">Cardio • 18 mins</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-black/20 rounded-full px-4 py-2">
                      <p className="text-2xl font-black text-black">538</p>
                      <p className="text-xs text-black/70">CALORIES</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-24 h-24 relative">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#000"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="63"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm font-black text-black">75%</p>
                    </div>
                  </div>
                  <div className="absolute right-10 -bottom-28 w-40 h-40">
                    <Image
                      src="/images/3.svg"
                      alt="Exercise"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Your plan</h2>

              <FilterTabs
                tabs={[
                  { id: "all", label: "All workouts" },
                  { id: "lower", label: "Lower body" },
                  { id: "upper", label: "Upper body" },
                ]}
                activeTab="all"
              />

              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleWorkoutClick(workout.id)}
                    className={`bg-gradient-to-br ${workout.color} rounded-3xl p-6 relative overflow-hidden cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-lg font-bold text-white mb-2">
                          {workout.title}
                        </p>
                        <div className="inline-block bg-black/20 rounded-full px-3 py-1 mb-3">
                          <p className="text-xs font-semibold text-white">
                            {workout.type} • {workout.exercises}
                          </p>
                        </div>
                        <p className="text-sm text-white/90">
                          {workout.exercises}
                        </p>
                      </div>
                      <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs font-bold text-black">
                            {workout.duration.split(" ")[0]}
                          </p>
                          <p className="text-[10px] text-black/70">mins</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="absolute right-0 -bottom-6 w-28 h-28">
                        <Image
                          src={workout.image}
                          alt="Exercise"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <MobileBottomNav activeTab="workouts" />
        </div>
      </div>
    </div>
  );
}
