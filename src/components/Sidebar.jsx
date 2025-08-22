import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  Wrench,
  UserCog,
} from "lucide-react";
 
const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Employees", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "rules", label: "LSL Rules Engine", icon: Wrench },
  { id: "user_management", label: "User Management", icon: UserCog },
];
 
export default function Sidebar({ userRole, userName, activeSection, onSectionChange }) {
  const [collapsed, setCollapsed] = useState(true);
 
  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "payroll_manager":
        return "Payroll Manager";
      case "payroll_officer":
        return "Payroll Officer";
      default:
        return role;
    }
  };
 
  const getAccessibleSections = (role) => {
    switch (role) {
      case "admin":
        return navigationItems;
      case "payroll_manager":
        return navigationItems.filter((item) => item.id !== "rules");
      case "payroll_officer":
        return navigationItems.filter(
          (item) => !["rules", "calculations"].includes(item.id)
        );
      default:
        return navigationItems;
    }
  };
 
  const accessibleSections = getAccessibleSections(userRole);
 
  return (
    <div
      className={`flex flex-col bg-white border-r border-zinc-300 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {/* Dashboard */}
        <div
          key="dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-['Poppins'] transition-colors ${
            activeSection === "dashboard"
              ? "bg-gray-100 text-sky-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-sky-700"
          }`}
          onClick={() => onSectionChange("dashboard")}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-base">Dashboard</span>}
        </div>
        {/* Employees */}
        <div
          key="employees"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-['Poppins'] transition-colors ${
            activeSection === "employees"
              ? "bg-gray-100 text-sky-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-sky-700"
          }`}
          onClick={() => onSectionChange("employees")}
        >
          <Users className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-base">Employees</span>}
        </div>
        {/* Reports */}
        <div
          key="reports"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-['Poppins'] transition-colors ${
            activeSection === "reports"
              ? "bg-gray-100 text-sky-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-sky-700"
          }`}
          onClick={() => onSectionChange("reports")}
        >
          <FileText className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-base">Reports</span>}
        </div>
        {/* Administration Section */}
        {!collapsed && (
          <div className="mt-4 mb-1 px-4">
            <span className="justify-start text-black text-base font-semibold font-['Poppins']">Administration</span>
          </div>
        )}
        {/* LSL Rules Engine */}
        <div
          key="rules"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-['Poppins'] transition-colors ${
            activeSection === "rules"
              ? "bg-gray-100 text-sky-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-sky-700"
          }`}
          onClick={() => onSectionChange("rules")}
        >
          <Wrench className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-base">LSL Rules Engine</span>}
        </div>
        {/* User Management */}
        <div
          key="user_management"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-['Poppins'] transition-colors ${
            activeSection === "user_management"
              ? "bg-gray-100 text-sky-700"
              : "text-gray-700 hover:bg-gray-100 hover:text-sky-700"
          }`}
          onClick={() => onSectionChange("user_management")}
        >
          <UserCog className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-base">User Management</span>}
        </div>
      </nav>
      {/* Bottom Section */}
      <div className="mt-auto self-stretch py-4 border-t border-zinc-300 inline-flex flex-col justify-center items-end gap-2 overflow-hidden">
        {/* Notifications */}
        <div className="self-stretch p-4 bg-white rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden">
          <Bell className="w-6 h-6 shrink-0 text-zinc-900" />
          {!collapsed && (
            <span className="justify-start text-black text-base font-normal font-['Poppins']">Notifications</span>
          )}
        </div>
        {/* User Info */}
        <div className="self-stretch h-14 p-4 bg-white rounded-lg inline-flex justify-start items-center gap-2">
          <div className="size-6 bg-black rounded-full" />
          {!collapsed && (
            <div className="inline-flex flex-col justify-start items-start">
            <span className="self-stretch justify-start text-black text-base font-semibold font-['Poppins']">{userName}</span>
            <span className="self-stretch justify-start text-black text-base font-light font-['Poppins']">{getRoleDisplayName(userRole)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
