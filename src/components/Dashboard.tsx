import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserRound, FileText, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const stats = [
    { title: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Teachers', value: '48', icon: UserRound, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Exams Active', value: '12', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Fees Collected', value: '$84,200', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentActivities = [
    { type: 'Admit', user: 'Sarah Connor', subject: 'Grade 10 Admission', time: '2 hours ago' },
    { type: 'Exam', user: 'Math Dept', subject: 'Final Exam Created', time: '4 hours ago' },
    { type: 'Fee', user: 'John Doe', subject: 'Tuition Payment Received', time: '5 hours ago' },
    { type: 'Result', user: 'Chemistry', subject: 'Results Uploaded', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back, Admin</h1>
        <p className="text-slate-500 mt-1">Here is what's happening in your school today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Monthly Collection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400">Financial chart will be integrated here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    activity.type === 'Admit' ? 'bg-blue-500' :
                    activity.type === 'Exam' ? 'bg-emerald-500' :
                    activity.type === 'Fee' ? 'bg-amber-500' : 'bg-slate-500'
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{activity.subject}</p>
                    <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}