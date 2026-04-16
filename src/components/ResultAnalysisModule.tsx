import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { BarChart, FileText, Printer, Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function ResultAnalysisModule() {
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  
  const results = [
    { id: '1', name: 'James Wilson', math: 85, science: 78, english: 92, history: 88, average: 85.75, grade: 'A' },
    { id: '2', name: 'Sophia Chen', math: 92, science: 95, english: 88, history: 90, average: 91.25, grade: 'A+' },
    { id: '3', name: 'Lucas Smith', math: 65, science: 72, english: 60, history: 68, average: 63.75, grade: 'C' },
    { id: '4', name: 'Olivia Brown', math: 78, science: 82, english: 85, history: 75, average: 80.00, grade: 'B+' },
  ];

  const printReportCard = (name: string) => {
    toast.success(`Generating report card for ${name}...`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Result Analysis</h1>
          <p className="text-slate-500 mt-1">Analyze academic performance and generate report forms.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <BarChart className="mr-2 h-5 w-5" />
            Class Analytics
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20">
            <Printer className="mr-2 h-5 w-5" />
            Print All Reports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Class Average</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">80.2%</h3>
              <span className="text-emerald-500 text-xs font-bold flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                +2.4%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Top Scorer</p>
            <div className="mt-2">
              <h3 className="text-xl font-bold text-slate-900">Sophia Chen</h3>
              <p className="text-sm text-slate-500">91.25% Average</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Pass Rate</p>
            <div className="mt-2">
              <h3 className="text-3xl font-bold text-slate-900">98.5%</h3>
              <p className="text-sm text-slate-500">126/128 Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Pending Reviews</p>
            <div className="mt-2 flex items-center gap-2">
              <h3 className="text-3xl font-bold text-slate-900">12</h3>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">Urgent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CardTitle className="text-lg">Student Performance - {selectedClass}</CardTitle>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-sm bg-slate-50 border-none rounded-lg p-1.5 focus:ring-0"
            >
              <option>Grade 10A</option>
              <option>Grade 10B</option>
              <option>Grade 11A</option>
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search student..." 
              className="pl-10 h-9 w-48 bg-slate-50 border-none rounded-lg text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Student Name</TableHead>
                <TableHead>Math</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>English</TableHead>
                <TableHead>History</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right pr-6">Report Form</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="pl-6 font-medium">{r.name}</TableCell>
                  <TableCell>{r.math}</TableCell>
                  <TableCell>{r.science}</TableCell>
                  <TableCell>{r.english}</TableCell>
                  <TableCell>{r.history}</TableCell>
                  <TableCell className="font-bold">{r.average}%</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-lg border-none",
                      r.grade.startsWith('A') ? "bg-emerald-100 text-emerald-700" :
                      r.grade.startsWith('B') ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {r.grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      onClick={() => printReportCard(r.name)}
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}