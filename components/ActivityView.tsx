"use client";

import { useMemo } from "react";
import { Dumbbell, Footprints, Target } from "lucide-react";
import { CaloriesChart } from "./CaloriesChart";
import { Calendar } from "./shared/Calendar";
import { StatsCard } from "./shared/StatsCard";
import { ChallengeCard } from "./shared/ChallengeCard";
import { FilterTabs } from "./shared/FilterTabs";
import { MobileBottomNav } from "./shared/MobileBottomNav";
import { DesktopBottomNav } from "./shared/DesktopBottomNav";
import { getCurrentDateInfo } from "@/lib/dateUtils";

interface ActivityViewProps {
  onNavigate: (view: "activity" | "plan" | "workout") => void;
}

export function ActivityView({ onNavigate }: ActivityViewProps) {
  const dateInfo = useMemo(() => getCurrentDateInfo(), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Your Activity
              </h1>
              <p className="text-gray-400">
                {dateInfo.month} {dateInfo.year}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
              </button>
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition">
                <Dumbbell className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] rounded-3xl p-6">
                <Calendar date={dateInfo.date} currentDay={dateInfo.day} />
              </div>

                <StatsCard
                  title="My Goals"
                  subtitle=""
                  value=""
                  icon={Target}
                  gradient="from-pink-300 to-pink-400"
                >
                  <p className="text-sm text-black/90 leading-tight mb-3">
                    Keep it up, you can achieve your goals
                  </p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-black/80 mb-1">
                      <span>Progress</span>
                      <span>49%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[49%] bg-black rounded-full"></div>
                    </div>
                  </div>
                </StatsCard>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">


                <FilterTabs
                  tabs={[
                    { id: "all", label: "All" },
                    { id: "running", label: "Running" },
                    { id: "cycling", label: "Cycling" },
                  ]}
                  activeTab="all"
                />
                  <ChallengeCard
                    title="Today's Challenge"
                    description="Do your plan before 9:00 PM"
                    imageSrc="/images/1.svg"
                    onClick={() => onNavigate("plan")}
                  />

                <StatsCard
                  title="Steps"
                  value="1840"
                  subtitle="Steps"
                  icon={Footprints}
                  gradient="from-purple-400 to-purple-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#252525] rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Calories</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-white">• 1288 Kcal</span>
                      <span className="text-sm text-gray-500">• 328 Kcal</span>
                      <span className="text-sm text-gray-500">• 872 Kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center py-6">
                  <div className="relative w-64 h-64">
                    <CaloriesChart
                      totalCalories={1288}
                      activeCalories={328}
                      restCalories={872}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DesktopBottomNav activeTab="home" />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mobile-container relative pb-24 md:pb-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Your Activity</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              {dateInfo.month} {dateInfo.year}
            </p>

            <div className="mb-6">
              <Calendar date={dateInfo.date} currentDay={dateInfo.day} />
            </div>

            <ChallengeCard
              title="Today's Challenge"
              description="Do your plan before 9:00 PM"
              imageSrc="/images/1.svg"
              onClick={() => onNavigate("plan")}
            />

            <FilterTabs
              tabs={[
                { id: "all", label: "All" },
                { id: "running", label: "Running" },
                { id: "cycling", label: "Cycling" },
              ]}
              activeTab="all"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatsCard
                title="Steps"
                value="1840"
                subtitle="Steps"
                icon={Footprints}
                gradient="from-purple-400 to-purple-500"
              />

              <StatsCard
                title="My Goals"
                subtitle=""
                value=""
                icon={Target}
                gradient="from-pink-300 to-pink-400"
              >
                <p className="text-sm text-white/90 leading-tight mb-3">
                  Keep it up, you can achieve your goals
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                    <span>Progress</span>
                    <span>49%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-[49%] bg-white rounded-full"></div>
                  </div>
                </div>
              </StatsCard>
            </div>

            <div className="bg-[#252525] rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Calories</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-white">• 1288 Kcal</span>
                    <span className="text-sm text-gray-500">• 328 Kcal</span>
                    <span className="text-sm text-gray-500">• 872 Kcal</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center py-6">
                <div className="relative w-48 h-48">
                  <CaloriesChart
                    totalCalories={1288}
                    activeCalories={328}
                    restCalories={872}
                  />
                </div>
              </div>
            </div>
          </div>

          <MobileBottomNav activeTab="home" />
        </div>
      </div>
    </div>
  );
}
