import {
  CalendarDays,
  LayoutDashboardIcon,
  LogOutIcon,
  UsersIcon,
  Wand2Icon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const { logout, user } = {
    logout: () => {
      window.location.href = "/";
    },
    user: {
      name: "John Doe",
      email: "john_doe@example.com",
    },
  };

  const location = useLocation();
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboardIcon, label: "Dashboard" },
    { to: "/accounts", icon: UsersIcon, label: "Accounts" },
    { to: "/schedule", icon: CalendarDays, label: "Scheduler" },
    { to: "/ai-composer", icon: Wand2Icon, label: "AI Composer" },
  ];
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
          <img src="/logo.svg" alt="Logo" className="size-6" />
          <span>Poster</span>
          <span className="text-red-400 font-semibold">AI</span>
        </div>
      </div>

      {/* Nav Section Label */}
      <div className="px-6 py-2">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Menu
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 mt-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-red-100 text-red-600" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <item.icon
                className={`size-5 shrink-0 ${isActive ? "text-red-500" : "text-slate-500"}`}
              />
              {item.label}
              {isActive && (
                <span className="ml-auto w-[5px] h-5 bg-red-500 rounded-full"></span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="px-4 py-3 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-linear-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">
              {user?.name || "Unknown User"}
            </p>
            <p className="text-sm text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className=" flex items-center justify-center gap-2 w-full mt-3 py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700 font-medium text-sm"
        >
          <LogOutIcon className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
