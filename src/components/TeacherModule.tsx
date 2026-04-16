import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Mail, Phone, BookOpen, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string;
  email: string;
  phone: string;
}

export function TeacherModule() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: '1', name: 'Prof. Michael Stevens', subject: 'Mathematics', classes: 'Grade 10, 11', email: 'm.stevens@edu.com', phone: '+1 234 567 890' },
    { id: '2', name: 'Dr. Sarah Jenkins', subject: 'Physics', classes: 'Grade 11, 12', email: 's.jenkins@edu.com', phone: '+1 234 567 891' },
    { id: '3', name: 'Mr. David Miller', subject: 'History', classes: 'Grade 9, 10', email: 'd.miller@edu.com', phone: '+1 234 567 892' },
    { id: '4', name: 'Ms. Emily Blunt', subject: 'Literature', classes: 'Grade 10, 12', email: 'e.blunt@edu.com', phone: '+1 234 567 893' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    classes: '',
    email: '',
    phone: ''
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTeacher.name || !newTeacher.subject || !newTeacher.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const teacher: Teacher = {
      ...newTeacher,
      id: Math.random().toString(36).substring(2, 9),
    };

    setTeachers([teacher, ...teachers]);
    setNewTeacher({ name: '', subject: '', classes: '', email: '', phone: '' });
    setIsOpen(false);
    toast.success(`${teacher.name} has been added successfully!`);
  };

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
    toast.info("Teacher record removed");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teachers</h1>
          <p className="text-slate-500 mt-1">Manage faculty information and course assignments.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
              <Plus className="mr-2 h-5 w-5" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddTeacher}>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the details of the new faculty member here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Dr. John Doe" 
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="e.g. Mathematics" 
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="classes">Classes</Label>
                  <Input 
                    id="classes" 
                    placeholder="e.g. Grade 10, 11" 
                    value={newTeacher.classes}
                    onChange={(e) => setNewTeacher({...newTeacher, classes: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john.doe@edu.com" 
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 234 567 890" 
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                  Save Teacher
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 h-8 w-8 z-10"
              onClick={() => deleteTeacher(teacher.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 ring-4 ring-slate-50 group-hover:ring-indigo-100 transition-all">
                  <AvatarFallback className="bg-indigo-50 text-indigo-600 text-xl font-bold">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-bold text-slate-900">{teacher.name}</h3>
                <Badge variant="secondary" className="mt-2 bg-indigo-50 text-indigo-700 border-none">
                  {teacher.subject}
                </Badge>
                
                <div className="mt-6 w-full space-y-3 text-left">
                  <div className="flex items-center text-sm text-slate-500">
                    <BookOpen className="h-4 w-4 mr-2 shrink-0 text-indigo-400" />
                    <span className="truncate">{teacher.classes || 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Mail className="h-4 w-4 mr-2 shrink-0 text-indigo-400" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Phone className="h-4 w-4 mr-2 shrink-0 text-indigo-400" />
                    <span className="truncate">{teacher.phone || 'N/A'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t w-full flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs h-8 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">View Profile</Button>
                  <Button variant="outline" className="flex-1 text-xs h-8 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">Assign Class</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white">
          <CardTitle className="text-lg">Faculty Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Department</TableHead>
                  <TableHead>Head of Dept</TableHead>
                  <TableHead>Teachers Count</TableHead>
                  <TableHead>Avg. Performance</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="pl-6 font-medium text-slate-700">Mathematics</TableCell>
                  <TableCell>Prof. Michael Stevens</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-slate-100 rounded-full mr-3">
                        <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">85%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Manage</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pl-6 font-medium text-slate-700">Science</TableCell>
                  <TableCell>Dr. Sarah Jenkins</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-slate-100 rounded-full mr-3">
                        <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">92%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Manage</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}