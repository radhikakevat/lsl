import Sidebar from "../components/Sidebar";
 import SearchCombo from "../components/ui/SearchCombo";

export default function Layout({ userRole, userName, activeSection, onSectionChange, children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        userName={userName}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
 
      {/* Main Area */}
      <div className="flex-1 flex flex-col p-3">
        {/* Top Header */}
        {/* <header className="h-14 bg-blue-600 text-white flex items-center px-4">
          
        </header> */}
       <SearchCombo />
 
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}