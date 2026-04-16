import React, { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StudentModule } from './components/StudentModule';
import { TeacherModule } from './components/TeacherModule';
import { ExamsModule } from './components/ExamsModule';
import { FeesModule } from './components/FeesModule';
import { ResultAnalysisModule } from './components/ResultAnalysisModule';

type Module = 'dashboard' | 'students' | 'teachers' | 'exams' | 'fees' | 'results';

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <StudentModule />;
      case 'teachers': return <TeacherModule />;
      case 'exams': return <ExamsModule />;
      case 'fees': return <FeesModule />;
      case 'results': return <ResultAnalysisModule />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
        {renderModule()}
      </Layout>
      <Toaster position="top-right" />
    </div>
  );
}