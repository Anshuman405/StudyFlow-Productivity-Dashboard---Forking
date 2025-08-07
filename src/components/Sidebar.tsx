import React from 'react';
import { LayoutDashboardIcon, CalendarIcon, CheckSquareIcon, FolderIcon, BarChart3Icon, SettingsIcon, LogOutIcon, BookOpenIcon, EditIcon, GraduationCapIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}
export const Sidebar = ({
  activeView,
  setActiveView
}: SidebarProps) => {
  const {
    user,
    logout
  } = useAuth();
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    id: 'calendar',
    label: 'Calendar',
    icon: <CalendarIcon size={20} />
  }, {
    id: 'tasks',
    label: 'Tasks',
    icon: <CheckSquareIcon size={20} />
  }, {
    id: 'materials',
    label: 'Study Materials',
    icon: <FolderIcon size={20} />
  }, {
    id: 'notes',
    label: 'Notes',
    icon: <EditIcon size={20} />
  }, {
    id: 'reflection',
    label: 'Reflection',
    icon: <BarChart3Icon size={20} />
  }, {
    id: 'chanceit',
    label: 'Chance It',
    icon: <GraduationCapIcon size={20} />
  }];
  const handleLogout = () => {
    logout();
  };
  return <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <BookOpenIcon className="h-6 w-6 text-indigo-400" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">StudyFlow</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Organize your academic life
        </p>
      </div>
      {user && <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="ml-2 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(item => <button key={item.id} className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${activeView === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveView(item.id)}>
            <span className={`${activeView === item.id ? 'text-indigo-500' : 'text-gray-400'}`}>
              {item.icon}
            </span>
            <span className="ml-3">{item.label}</span>
          </button>)}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
          <span className="text-gray-400">
            <SettingsIcon size={20} />
          </span>
          <span className="ml-3">Settings</span>
        </button>
        <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
          <span className="text-gray-400">
            <LogOutIcon size={20} />
          </span>
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>;
};