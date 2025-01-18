"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Student {
    id: number;
    studentName: string;
    nim: string;
    title: string;
    status: string;
    university: string;
    academicSupervisor: string;
    startDate: string;
    endDate: string;
    department: string;
    score?: number;
}

const gradeOptions = [
    {letter: "A", numeric: 100},
    {letter: "A-", numeric: 90},
    {letter: "B+", numeric: 85},
    {letter: "B", numeric: 80},
    {letter: "B-", numeric: 75},
    {letter: "C+", numeric: 70},
    {letter: "C", numeric: 65},
    {letter: "C-", numeric: 60},
    {letter: "D+", numeric: 55},
    {letter: "D", numeric: 50},
    {letter: "E", numeric: 0},
];

const PembimbingInstansiPage = () => {
    const { toast } = useToast();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

    // Data dummy untuk mahasiswa magang
    const activeStudents = [
        {
            id: 1,
            studentName: "Ahmad Fauzi",
            nim: "1234567890",
            title: "Implementasi Machine Learning pada Sistem IoT",
            status: "Aktif",
            university: "Universitas Teknologi",
            academicSupervisor: "Dr. Anwar Sanusi",
            startDate: "2024-12-01",
            endDate: "2025-02-28",
            department: "Software Development"
        },
        {
            id: 2,
            studentName: "Siti Aminah",
            nim: "0987654321",
            title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
            status: "Aktif",
            university: "Universitas Teknologi",
            academicSupervisor: "Dr. Budi Prakoso",
            startDate: "2024-12-15",
            endDate: "2025-03-15",
            department: "Mobile Development"
        }
    ];

    const completedStudents = [
        {
            id: 3,
            studentName: "Budi Santoso",
            nim: "1122334455",
            title: "Analisis Keamanan Jaringan pada Cloud Computing",
            status: "Selesai",
            university: "Universitas Teknologi",
            academicSupervisor: "Dr. Citra Dewi",
            startDate: "2024-09-01",
            endDate: "2024-11-30",
            department: "Network Security",
            score: 85
        }
    ];

    // Komponen Form Penilaian
    const GradingForm = ({ student, onClose }) => {
        const [formData, setFormData] = useState({
            attendance: "",
            performance: "",
            teamwork: "",
            innovation: "",
            notes: ""
        });
        const [showConfirmation, setShowConfirmation] = useState(false);

        const handleGradeChange = (field: string, value: string) => {
            setFormData(prevState => ({
                ...prevState,
                [field]: value
            }));
        };

        const calculateFinalGrade = () => {
            const grades = {
                attendance: gradeOptions.find(g => g.letter === formData.attendance)?.numeric || 0,
                performance: gradeOptions.find(g => g.letter === formData.performance)?.numeric || 0,
                teamwork: gradeOptions.find(g => g.letter === formData.teamwork)?.numeric || 0,
                innovation: gradeOptions.find(g => g.letter === formData.innovation)?.numeric || 0
            };

            return ((grades.attendance + grades.performance + grades.teamwork + grades.innovation) / 4).toFixed(1);
        };

        const handleSubmit = (e?: React.FormEvent) => {
            e?.preventDefault();
            const finalGrade = calculateFinalGrade();

            setShowConfirmation(false);

            toast({
                title: "Nilai Berhasil Disimpan! 🎉",
                description: (
                    <div className="mt-2 space-y-2">
                        <p><strong>Mahasiswa:</strong> {student.studentName}</p>
                        <p><strong>NIM:</strong> {student.nim}</p>
                        <p><strong>Nilai Akhir:</strong> {finalGrade}</p>
                    </div>
                ),
                duration: 5000,
            });

            onClose();
        };

        const validateForm = () => {
            return formData.attendance &&
                formData.performance &&
                formData.teamwork &&
                formData.innovation;
        };

        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(true);
            }}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="attendance">Kehadiran & Kedisiplinan (0-100)</Label>
                        <Select
                            onValueChange={(value) => handleGradeChange("attendance", value)}
                            value={formData.attendance}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nilai"/>
                            </SelectTrigger>
                            <SelectContent>
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.letter} value={grade.letter}>
                                        {grade.letter} ({grade.numeric})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="performance">Kinerja & Hasil Kerja (0-100)</Label>
                        <Select
                            onValueChange={(value) => handleGradeChange("performance", value)}
                            value={formData.performance}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nilai"/>
                            </SelectTrigger>
                            <SelectContent>
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.letter} value={grade.letter}>
                                        {grade.letter} ({grade.numeric})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="performance">Kinerja & Hasil Kerja (0-100)</Label>
                        <Select
                            onValueChange={(value) => handleGradeChange("performance", value)}
                            value={formData.performance}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nilai"/>
                            </SelectTrigger>
                            <SelectContent>
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.letter} value={grade.letter}>
                                        {grade.letter} ({grade.numeric})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="teamwork">Kerja Tim & Komunikasi (0-100)</Label>
                        <Select
                            onValueChange={(value) => handleGradeChange("teamwork", value)}
                            value={formData.teamwork}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nilai"/>
                            </SelectTrigger>
                            <SelectContent>
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.letter} value={grade.letter}>
                                        {grade.letter} ({grade.numeric})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="innovation">Inisiatif & Inovasi (0-100)</Label>
                        <Select
                            onValueChange={(value) => handleGradeChange("innovation", value)}
                            value={formData.innovation}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nilai"/>
                            </SelectTrigger>
                            <SelectContent>
                                {gradeOptions.map((grade) => (
                                    <SelectItem key={grade.letter} value={grade.letter}>
                                        {grade.letter} ({grade.numeric})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Catatan & Saran Pengembangan</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleGradeChange("notes", e.target.value)}
                            placeholder="Masukkan catatan untuk mahasiswa (opsional)"
                        />
                    </div>

                    {validateForm() && (
                        <Card className="bg-muted">
                            <CardContent className="pt-4">
                                <p className="text-sm font-medium">Ringkasan Nilai:</p>
                                <div className="mt-2 space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Kehadiran & Kedisiplinan:</span>
                                        <span>{formData.attendance}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Kinerja & Hasil Kerja:</span>
                                        <span>{formData.performance}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Kerja Tim & Komunikasi:</span>
                                        <span>{formData.teamwork}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Inisiatif & Inovasi:</span>
                                        <span>{formData.innovation}</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                        <div className="flex justify-between font-medium">
                                            <span>Nilai Akhir:</span>
                                            <span>{calculateFinalGrade()}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={!validateForm()}>
                            Simpan Nilai
                        </Button>
                    </DialogFooter>

                    <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Konfirmasi Pengiriman Nilai</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className="space-y-2">
                                        <p>Anda akan mengirim nilai untuk:</p>
                                        <div className="bg-muted p-3 rounded-md space-y-1">
                                            <p><strong>Mahasiswa:</strong> {student.studentName}</p>
                                            <p><strong>NIM:</strong> {student.nim}</p>
                                            <p><strong>Nilai Akhir:</strong> {calculateFinalGrade()}</p>
                                        </div>
                                        <p className="text-yellow-600 dark:text-yellow-500 mt-2">
                                            ⚠️ Nilai yang sudah dikirim tidak dapat diubah kembali.
                                        </p>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Kembali</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>
                                    Ya, Kirim Nilai
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </form>
        );
    };

    const renderActionButton = (student: Student) => (
        <Dialog open={isGradingModalOpen && selectedStudent?.id === student.id}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSelectedStudent(student);
                        setIsGradingModalOpen(true);
                    }}
                >
                    Detail
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Detail Mahasiswa</DialogTitle>
                    <DialogDescription>
                        Data mahasiswa dan form penilaian
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm">Nama:</p>
                                <p className="text-sm font-medium">{student.studentName}</p>
                                <p className="text-sm">NIM:</p>
                                <p className="text-sm font-medium">{student.nim}</p>
                                <p className="text-sm">Judul:</p>
                                <p className="text-sm font-medium">{student.title}</p>
                                <p className="text-sm">Universitas:</p>
                                <p className="text-sm font-medium">{student.university}</p>
                                <p className="text-sm">Dosen Pembimbing:</p>
                                <p className="text-sm font-medium">{student.academicSupervisor}</p>
                                <p className="text-sm">Periode Magang:</p>
                                <p className="text-sm font-medium">{student.startDate} s/d {student.endDate}</p>
                                <p className="text-sm">Departemen:</p>
                                <p className="text-sm font-medium">{student.department}</p>
                            </div>
                        </div>

                        {student.status === "Selesai" ? (
                            <div className="bg-muted p-4 rounded-md">
                                <p className="font-medium">Nilai Akhir: {student.score}</p>
                            </div>
                        ) : (
                            <GradingForm
                                student={student}
                                onClose={() => {
                                    setIsGradingModalOpen(false);
                                    setSelectedStudent(null);
                                }}
                            />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="space-y-6">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Pembimbing Instansi</h1>
                    <p className="text-muted-foreground">PT Teknologi Indonesia - Divisi Software Development</p>
                </div>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeStudents.length + completedStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Mahasiswa magang</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktif</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Sedang magang</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Mahasiswa selesai</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departemen</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Divisi penerimaan</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Mahasiswa */}
            <Tabs defaultValue="active" className="w-full">
                <TabsList>
                    <TabsTrigger value="active">Mahasiswa Aktif</TabsTrigger>
                    <TabsTrigger value="completed">Mahasiswa Selesai</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Mahasiswa Aktif</CardTitle>
                            <CardDescription>
                                Daftar mahasiswa yang sedang melakukan magang
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Cari mahasiswa..."
                                    className="max-w-sm"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mahasiswa</TableHead>
                                        <TableHead>Judul Proyek</TableHead>
                                        <TableHead>Departemen</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Periode Magang</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{student.studentName}</p>
                                                    <p className="text-sm text-muted-foreground">{student.nim}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{student.title}</TableCell>
                                            <TableCell>{student.department}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {student.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {`${student.startDate} s/d ${student.endDate}`}
                                            </TableCell>
                                            <TableCell>{renderActionButton(student)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="completed">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Mahasiswa Selesai</CardTitle>
                            <CardDescription>
                                Daftar mahasiswa yang telah menyelesaikan magang
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Cari mahasiswa..."
                                    className="max-w-sm"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mahasiswa</TableHead>
                                        <TableHead>Judul Proyek</TableHead>
                                        <TableHead>Departemen</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Periode Magang</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {completedStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{student.studentName}</p>
                                                    <p className="text-sm text-muted-foreground">{student.nim}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{student.title}</TableCell>
                                            <TableCell>{student.department}</TableCell>
                                            <TableCell>{student.score}</TableCell>
                                            <TableCell>{`${student.startDate} s/d ${student.endDate}`}</TableCell>
                                            <TableCell>{renderActionButton(student)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    );
};

export default PembimbingInstansiPage;