import {
  CircleCheckIcon,
  ClockIcon,
  SendIcon,
  Share2Icon,
  TrendingUpIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  dummyAccountsData,
  dummyActivityData,
  dummyPostsData,
} from "../assets/assets";

const Dashboard = () => {
  const [stats, setStats] = useState({
    scheduled: 0,
    published: 0,
    connectedAccounts: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postRes, accountRes, activityRes] = [
          { data: dummyPostsData },
          { data: dummyAccountsData },
          { data: dummyActivityData },
        ];
        const posts = postRes.data;
        setStats({
          scheduled: posts.filter((p) => p.status === "scheduled").length,
          published: posts.filter((p) => p.status === "published").length,
          connectedAccounts: accountRes.data.filter(
            (a: any) => a.status === "connected",
          ).length,
        });
        setActivities(activityRes.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setStats({
          scheduled: dummyPostsData.filter((p) => p.status === "scheduled")
            .length,
          published: dummyPostsData.filter((p) => p.status === "published")
            .length,
          connectedAccounts: dummyAccountsData.filter(
            (a: any) => a.status === "connected",
          ).length,
        });
        setActivities(dummyActivityData.slice(0, 5));
      }
    };
    fetchDashboardData();
  });

  const statCards = [
    {
      title: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today",
    },
    {
      title: "Published Posts",
      value: stats.published,
      icon: CircleCheckIcon,
      trend: "All time",
    },
    {
      title: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back!</h2>
        <p className="text-slate-500 text-sm mt-1">
          Here's what's happening with your social media today.
        </p>
      </div>

      {/*Stat Card*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          /* 1. Changed 'relative-border' to 'relative border' */
          <div
            key={card.title}
            className="bg-white hover:bg-red-50 hover:border-red-200 relative border border-slate-200 rounded-2xl p-5  transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-medium text-slate-800 tabular-nums">
                {card.value}
              </div>

              <div className="text-xs absolute right-4 top-4 text-red-500 flex items-center gap-1">
                <TrendingUpIcon className="size-3" />
                {card.trend}
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div>
        <div className="bg-white border border-slate-200 flex justify-between items-center rounded-2xl p-6">
          <h3 className="font-semibold text-slate-900">Recent Activity</h3>
          <span className="text-xs text-slate-500">
            {activities.length === 0 && "No recent activity"}
          </span>
        </div>

        <div>
          {activities.length === 0 ? (
            <div className=" bg-white border border-slate-200 rounded-2xl m-4 py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">No recent activity</p>
              <p className="text-slate-400 text-xs">
                Your scheduled posts will appear here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <SendIcon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                        Published
                      </span>
                      <span className="text-xs text-slate-400 shrink-0">
                        {new Date(activity.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
