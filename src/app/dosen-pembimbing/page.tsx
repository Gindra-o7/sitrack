"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    company: string;
    companySupervisor: string;
    date?: string;
    time?: string;
    room?: string;
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

const DosenPembimbingPage = () => {
    const { toast } = useToast();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

    // Data dummy untuk mahasiswa bimbingan
    const activeStudents = [
        {
            id: 1,
            studentName: "Ahmad Fauzi",
            nim: "1234567890",
            title: "Implementasi Machine Learning pada Sistem IoT",
            status: "Belum Seminar",
            company: "PT Teknologi Indonesia",
            companySupervisor: "Ir. Joko Widodo",
            date: "2025-01-15",
            time: "13:00",
            room: "Lab Komputer 1"
        },
        {
            id: 2,
            studentName: "Siti Aminah",
            nim: "0987654321",
            title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
            status: "Menunggu Seminar",
            company: "RS Sehat Sejahtera",
            companySupervisor: "Dr. Siti Nurhaliza",
            date: "2025-01-22",
            time: "10:00",
            room: "Ruang Seminar 2"
        }
    ];

    const completedStudents = [
        {
            id: 3,
            studentName: "Budi Santoso",
            nim: "1122334455",
            title: "Analisis Keamanan Jaringan pada Cloud Computing",
            status: "Selesai",
            company: "PT Cloud Nusantara",
            companySupervisor: "Ir. Bambang Sutejo",
            score: 85,
            date: "2025-01-10",
            time: "09:00",
            room: "Lab Komputer 2"
        }
    ];

    // Komponen Form Penilaian
    const GradingForm = ({ student, onClose }) => {
        const [formData, setFormData] = useState({
            guidance: "",
            documentation: "",
            implementation: "",
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
                guidance: gradeOptions.find(g => g.letter === formData.guidance)?.numeric || 0,
                documentation: gradeOptions.find(g => g.letter === formData.documentation)?.numeric || 0,
                implementation: gradeOptions.find(g => g.letter === formData.implementation)?.numeric || 0
            };

            return ((grades.guidance + grades.documentation + grades.implementation) / 3).toFixed(1);
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
            return formData.guidance &&
                formData.documentation &&
                formData.implementation;
        };

        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(true);
            }} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="guidance">Proses Bimbingan (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("guidance", value)}
                        value={formData.guidance}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih nilai" />
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
                    <Label htmlFor="documentation">Dokumentasi Laporan (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("documentation", value)}
                        value={formData.documentation}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih nilai" />
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
                    <Label htmlFor="implementation">Implementasi (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("implementation", value)}
                        value={formData.implementation}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih nilai" />
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
                    <Label htmlFor="notes">Catatan</Label>
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
                                    <span>Proses Bimbingan:</span>
                                    <span>{formData.guidance}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Dokumentasi Laporan:</span>
                                    <span>{formData.documentation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Implementasi:</span>
                                    <span>{formData.implementation}</span>
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
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Detail Mahasiswa</DialogTitle>
                    <DialogDescription>
                        Data mahasiswa dan form penilaian
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-sm">Nama:</p>
                            <p className="text-sm font-medium">{student.studentName}</p>
                            <p className="text-sm">NIM:</p>
                            <p className="text-sm font-medium">{student.nim}</p>
                            <p className="text-sm">Judul:</p>
                            <p className="text-sm font-medium">{student.title}</p>
                            <p className="text-sm">Instansi:</p>
                            <p className="text-sm font-medium">{student.company}</p>
                            <p className="text-sm">Pembimbing Instansi:</p>
                            <p className="text-sm font-medium">{student.companySupervisor}</p>
                            {student.date && (
                                <>
                                    <p className="text-sm">Jadwal Seminar:</p>
                                    <p className="text-sm font-medium">
                                        {student.date} {student.time} - {student.room}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {student.status === "Selesai" ? (
                        <div className="bg-muted p-4 rounded-md">
                            <p className="font-medium">Nilai Akhir: {student.score}</p>
                        </div>
                    ) : student.status === "Menunggu Seminar" ? (
                        <div className="bg-yellow-50 p-4 rounded-md">
                            <p className="text-yellow-800 text-sm">
                                Mahasiswa sudah terjadwal seminar. Form penilaian akan tersedia setelah seminar selesai.
                            </p>
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
            </DialogContent>
        </Dialog>
    );

    useEffect(() => {
        const dates = [...activeStudents, ...completedStudents]
            .filter(student => student.date)
            .map(student => new Date(student.date));
        setSelectedDates(dates);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Dosen Pembimbing</h1>
                    <p className="text-muted-foreground">Selamat datang, Dr. Anwar Sanusi</p>
                </div>
                <div className="flex gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4"/>
                                Kalender
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
                            <DialogHeader>
                                <DialogTitle>Jadwal Seminar</DialogTitle>
                                <DialogDescription>
                                    Tanggal yang ditandai merupakan jadwal seminar mahasiswa bimbingan
                                </DialogDescription>
                            </DialogHeader>
                            <Calendar
                                mode="multiple"
                                selected={selectedDates}
                                className="rounded-md border"
                            />
                        </DialogContent>
                    </Dialog>
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
                        <p className="text-xs text-muted-foreground">Mahasiswa bimbingan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktif</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Sedang bimbingan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Mahasiswa lulus</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.5</div>
                        <p className="text-xs text-muted-foreground">Dari mahasiswa lulus</p>
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
                                Daftar mahasiswa yang sedang dalam bimbingan
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
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Instansi</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Jadwal</TableHead>
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
                                            <TableCell>{student.company}</TableCell>
                                            <TableCell>
                                                <Badge variant={student.status === "Menunggu Seminar" ? "default" : "secondary"}>
                                                    {student.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {student.date ? `${student.date} ${student.time}` : '-'}
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
                                Daftar mahasiswa yang telah menyelesaikan kerja praktik
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
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Instansi</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Tanggal Selesai</TableHead>
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
                                            <TableCell>{student.company}</TableCell>
                                            <TableCell>{student.score}</TableCell>
                                            <TableCell>{student.date}</TableCell>
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

export default DosenPembimbingPage;