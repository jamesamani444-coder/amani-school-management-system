import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Calendar, Clock, FilePlus, Filter, Trash2, Edit2, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock data for exams
const EXAMS_DATA = [
  { id: '1', name: 'Mid-Term Assessment', term: 'First Term', status: 'Upcoming', date: '2024-03-15', totalSubjects: 6 },
  { id: '2', name: 'Practical Biology', term: 'Second Term', status: 'Ongoing', date: '2024-02-10', totalSubjects: 1 },
  { id: '3', name: 'End Term Exam', term: 'Third Term', status: 'Draft', date: '2024-06-20', totalSubjects: 8 },
  { id: '4', name: 'Weekly Test - Physics', term: 'First Term', status: 'Completed', date: '2024-01-25', totalSubjects: 1 },
];

// Mock data for subjects per exam
const SUBJECTS_DATA: Record<string, any[]> = {
  '1': [
    { id: 's1', name: 'Mathematics', date: '2024-03-15', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 40 },
    { id: 's2', name: 'Physics', date: '2024-03-16', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 40 },
    { id: 's3', name: 'Chemistry', date: '2024-03-17', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 40 },
  ],
  '3': [
    { id: 'e1', name: 'English Literature', date: '2024-06-20', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e2', name: 'Mathematics Higher', date: '2024-06-21', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e3', name: 'History & Civics', date: '2024-06-22', startTime: '01:00 PM', endTime: '04:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e4', name: 'Geography', date: '2024-06-23', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e5', name: 'Biology', date: '2024-06-24', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e6', name: 'Computer Science', date: '2024-06-25', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 35 },
    { id: 'e7', name: 'Physical Education', date: '2024-06-26', startTime: '01:00 PM', endTime: '03:00 PM', maxMarks: 50, passingMarks: 18 },
    { id: 'e8', name: 'Arts & Craft', date: '2024-06-27', startTime: '09:00 AM', endTime: '11:00 AM', maxMarks: 50, passingMarks: 18 },
  ]
};

export function ExamsModule() {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  const createExam = () => {
    toast.success('New exam scheduled successfully!');
  };

  const selectedExam = EXAMS_DATA.find(e => e.id === selectedExamId);
  const subjects = selectedExamId ? SUBJECTS_DATA[selectedExamId] || [] : [];

  if (selectedExamId && selectedExam) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedExamId(null)}
            className="hover:bg-slate-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Exams
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{selectedExam.name}</h1>
            <p className="text-slate-500">{selectedExam.term} • {selectedExam.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Subject Schedule</CardTitle>
                  <CardDescription>Listing all subjects included in this examination</CardDescription>
                </div>
                <Badge variant="outline" className={cn(
                  "rounded-full px-3 py-1 font-semibold border-none",
                  selectedExam.status === 'Upcoming' ? "bg-blue-100 text-blue-700" :
                  selectedExam.status === 'Ongoing' ? "bg-amber-100 text-amber-700" :
                  selectedExam.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                  "bg-slate-100 text-slate-600"
                )}>
                  {selectedExam.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="pl-6 py-4 text-slate-700 font-bold uppercase text-[11px] tracking-wider">Subject</TableHead>
                    <TableHead className="text-slate-700 font-bold uppercase text-[11px] tracking-wider">Date</TableHead>
                    <TableHead className="text-slate-700 font-bold uppercase text-[11px] tracking-wider">Time Slot</TableHead>
                    <TableHead className="text-center text-slate-700 font-bold uppercase text-[11px] tracking-wider">Max Marks</TableHead>
                    <TableHead className="text-center text-slate-700 font-bold uppercase text-[11px] tracking-wider">Passing</TableHead>
                    <TableHead className="text-right pr-6 text-slate-700 font-bold uppercase text-[11px] tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <TableRow key={subject.id} className="group hover:bg-slate-50/50 transition-colors">
                        <TableCell className="pl-6 py-4 font-semibold text-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            {subject.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-slate-600 text-sm">
                            <Calendar className="h-3.5 w-3.5 mr-2 text-slate-400" />
                            {subject.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-slate-600 text-sm">
                            <Clock className="h-3.5 w-3.5 mr-2 text-slate-400" />
                            {subject.startTime} - {subject.endTime}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">{subject.maxMarks}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                            {subject.passingMarks}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                        No subjects assigned to this exam yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedExamId(null)} className="rounded-xl">Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">Add Subject to Exam</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Examinations</h1>
          <p className="text-slate-500 mt-1">Create and schedule school exams and tests.</p>
        </div>
        <Button onClick={createExam} className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 rounded-xl">
          <FilePlus className="mr-2 h-5 w-5" />
          Create New Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Exam Schedule List</CardTitle>
              <CardDescription>Select an exam to view detailed subject rows</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Exam Title</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">View Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EXAMS_DATA.map((exam) => (
                  <TableRow 
                    key={exam.id} 
                    className="cursor-pointer hover:bg-slate-50/80 transition-colors group"
                    onClick={() => setSelectedExamId(exam.id)}
                  >
                    <TableCell className="pl-6 font-medium">
                      <div>
                        {exam.name}
                        <p className="text-xs text-slate-500 font-normal mt-0.5">{exam.totalSubjects} Subjects Included</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{exam.term}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="h-3 w-3 mr-1.5 text-slate-400" />
                        {exam.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none",
                        exam.status === 'Upcoming' ? "bg-blue-100 text-blue-700" :
                        exam.status === 'Ongoing' ? "bg-amber-100 text-amber-700" :
                        exam.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
                        View <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-emerald-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
               <Clock className="h-24 w-24" />
            </div>
            <CardHeader className="relative">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Live Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-emerald-100 font-bold">Currently Ongoing</p>
                  <p className="mt-1 font-bold text-lg">Physics Practical</p>
                  <p className="text-sm text-emerald-50 text-opacity-80">Grade 11 • Room 304</p>
                  <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-2/3 rounded-full" />
                  </div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-emerald-100 font-bold">Next Exam</p>
                  <p className="mt-1 font-bold text-lg">Literature II</p>
                  <p className="text-sm text-emerald-50 text-opacity-80">Tomorrow • 09:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common tasks for exam management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 group">
                <BookOpen className="mr-3 h-4 w-4 text-slate-400 group-hover:text-emerald-600" />
                Subject Groups
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 group">
                <Calendar className="mr-3 h-4 w-4 text-slate-400 group-hover:text-emerald-600" />
                Academic Calendar
              </Button>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 rounded-xl mt-2">
                Generate Hall Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}