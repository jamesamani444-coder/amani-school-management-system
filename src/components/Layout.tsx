import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  FileText, 
  CreditCard, 
  BarChart3, 
  GraduationCap,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: any) => void;
}

export function Layout({ children, activeModule, onModuleChange }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { name: 'Students', icon: Users, id: 'students' },
    { name: 'Teachers', icon: UserRound, id: 'teachers' },
    { name: 'Exams', icon: FileText, id: 'exams' },
    { name: 'Fees', icon: CreditCard, id: 'fees' },
    { name: 'Result Analysis', icon: BarChart3, id: 'results' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-shrink-0 lg:flex-col w-64 border-r bg-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold text-slate-900">EduManage</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={cn(
                  "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                  activeModule === item.id
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  activeModule === item.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center p-3 bg-slate-50 rounded-xl">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/995be370-ad6d-49b9-8835-96730a98429a/teacher-avatar-1-53c90c73-1776341627282.webp" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@edumanage.edu</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-2 text-slate-600 justify-start hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white border-b z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search students, exams..."
                className="pl-10 pr-4 py-2 w-64 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/995be370-ad6d-49b9-8835-96730a98429a/teacher-avatar-1-53c90c73-1776341627282.webp" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-6 border-b">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                    <span className="ml-3 text-xl font-bold text-slate-900">EduManage</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onModuleChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                        activeModule === item.id
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.icon className={cn(
                        "mr-3 h-5 w-5",
                        activeModule === item.id ? "text-blue-600" : "text-slate-400"
                      )} />
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}