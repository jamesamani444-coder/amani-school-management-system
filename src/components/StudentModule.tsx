import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Filter, MoreVertical, UserPlus, User, BookOpen, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Student {
  id: string;
  name: string;
  grade: string;
  admissionNo: string;
  status: 'Active' | 'Inactive';
  guardian: string;
}

export function StudentModule() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'James Wilson', grade: 'Grade 10A', admissionNo: 'ADM001', status: 'Active', guardian: 'Robert Wilson' },
    { id: '2', name: 'Sophia Chen', grade: 'Grade 9C', admissionNo: 'ADM042', status: 'Active', guardian: 'Mei Chen' },
    { id: '3', name: 'Lucas Smith', grade: 'Grade 11B', admissionNo: 'ADM088', status: 'Active', guardian: 'Emma Smith' },
    { id: '4', name: 'Olivia Brown', grade: 'Grade 12A', admissionNo: 'ADM105', status: 'Inactive', guardian: 'William Brown' },
  ]);

  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    guardian: '',
    dob: '',
    gender: 'male'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new student object
    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${formData.firstName} ${formData.lastName}`,
      grade: formData.grade,
      admissionNo: `ADM${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      guardian: formData.guardian
    };

    setStudents([newStudent, ...students]);
    toast.success('Admission Complete', {
      description: `${newStudent.name} has been enrolled in ${newStudent.grade}.`,
    });
    
    // Reset form and close dialog
    setFormData({
      firstName: '',
      lastName: '',
      grade: '',
      guardian: '',
      dob: '',
      gender: 'male'
    });
    setIsAdmissionOpen(false);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 mt-1">Manage student records and admissions.</p>
        </div>
        <Dialog open={isAdmissionOpen} onOpenChange={setIsAdmissionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-6">
              <UserPlus className="mr-2 h-5 w-5" />
              New Admission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl">
            <div className="bg-blue-600 px-6 py-8 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Student Admission Form</DialogTitle>
                <p className="text-blue-100 text-sm mt-1">Enter the details to enroll a new student.</p>
              </DialogHeader>
            </div>
            
            <form onSubmit={handleAdmission} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. John" 
                        className="pl-10"
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Doe" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-sm font-semibold text-slate-700">Grade / Class</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="grade" 
                        value={formData.grade}
                        onChange={handleInputChange}
                        placeholder="e.g. Grade 10A" 
                        className="pl-10"
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">Gender</Label>
                    <select 
                      id="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian" className="text-sm font-semibold text-slate-700">Guardian Name</Label>
                  <Input 
                    id="guardian" 
                    value={formData.guardian}
                    onChange={handleInputChange}
                    placeholder="Enter guardian full name" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-semibold text-slate-700">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="dob" 
                      type="date" 
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 py-6"
                  onClick={() => setIsAdmissionOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Complete Admission
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name or admission no..." 
                className="pl-10 w-full md:w-80 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="pl-6 text-slate-500 font-semibold">Student Name</TableHead>
                <TableHead className="text-slate-500 font-semibold">Admission No</TableHead>
                <TableHead className="text-slate-500 font-semibold">Grade</TableHead>
                <TableHead className="text-slate-500 font-semibold">Guardian</TableHead>
                <TableHead className="text-slate-500 font-semibold">Status</TableHead>
                <TableHead className="text-right pr-6 text-slate-500 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-slate-50/80 transition-colors border-slate-100">
                    <TableCell className="font-medium pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-mono text-sm">{student.admissionNo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none">
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{student.guardian}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none",
                        student.status === 'Active' 
                          ? "bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-200/50" 
                          : "bg-slate-100 text-slate-600 shadow-sm shadow-slate-200/50"
                      )}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No students found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}