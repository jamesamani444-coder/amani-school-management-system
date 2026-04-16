import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DollarSign, Download, Plus, Receipt, Wallet, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function FeesModule() {
  const transactions = [
    { id: '1', student: 'James Wilson', type: 'Tuition Fee', amount: 1500, date: '2024-02-01', status: 'Paid' },
    { id: '2', student: 'Sophia Chen', type: 'Transport Fee', amount: 300, date: '2024-02-03', status: 'Pending' },
    { id: '3', student: 'Lucas Smith', type: 'Tuition Fee', amount: 1500, date: '2024-01-28', status: 'Paid' },
    { id: '4', student: 'Olivia Brown', type: 'Exam Fee', amount: 100, date: '2024-02-05', status: 'Overdue' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fee Management</h1>
          <p className="text-slate-500 mt-1">Track payments, invoices, and scholarship disbursements.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Download className="mr-2 h-5 w-5" />
            Report
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/20">
            <Plus className="mr-2 h-5 w-5" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Outstanding</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">$12,450</h3>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500">Collection Progress</span>
                <span className="font-bold text-slate-700">88%</span>
              </div>
              <Progress value={88} className="h-1.5 bg-slate-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Collected This Month</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">$45,200</h3>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-xs text-emerald-600 font-medium flex items-center">
              +12% from previous month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Scholarships</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">24 Students</h3>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                <Receipt className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Total value: $15,000 / term
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search receipt no..." 
              className="pl-10 h-9 w-48 bg-slate-50 border-none rounded-lg text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="pl-6 font-medium">{t.student}</TableCell>
                  <TableCell className="text-sm text-slate-600">{t.type}</TableCell>
                  <TableCell className="font-semibold">${t.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-slate-500">{t.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "rounded-full border-none",
                      t.status === 'Paid' ? "bg-emerald-100 text-emerald-700" :
                      t.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
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