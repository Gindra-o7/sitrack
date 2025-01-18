"use client";

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Calendar as CalendarIcon, Clock, Users, BookOpen, CheckCircle} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
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
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";

interface Seminar {
    studentName: string;
    // Add other seminar properties as needed
}

interface GradingFormProps {
    seminar: Seminar;
    onClose: () => void;
}

interface GradeOption {
    letter: string;
    numeric: number;
}

const gradeOptions: GradeOption[] = [
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

const DosenPengujiPage = () => {
    const {toast} = useToast();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

    // Data dummy untuk contoh
    const upcomingSeminars = [
        {
            id: 1,
            studentName: "Ahmad Fauzi",
            nim: "1234567890",
            title: "Implementasi Machine Learning pada Sistem IoT",
            date: "2025-01-15",
            time: "23:00",
            room: "Lab Komputer 1",
            status: "upcoming",
            supervisorName: "Dr. Budi Prakoso",
            companyName: "PT Teknologi Indonesia",
            companySupervisor: "Ir. Joko Widodo"
        },
        {
            id: 2,
            studentName: "Siti Aminah",
            nim: "0987654321",
            title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
            date: "2025-01-22",
            time: "13:00",
            room: "Ruang Seminar 2",
            status: "upcoming",
            supervisorName: "Dr. Diana Putri",
            companyName: "RS Sehat Sejahtera",
            companySupervisor: "Dr. Siti Nurhaliza"
        }
    ];

    const pastSeminars = [
        {
            id: 3,
            studentName: "Budi Santoso",
            nim: "1122334455",
            title: "Analisis Keamanan Jaringan pada Cloud Computing",
            date: "2025-01-15",
            time: "10:00",
            room: "Lab Komputer 2",
            status: "completed",
            score: 85,
            supervisorName: "Dr. Rudi Hartono",
            companyName: "PT Cloud Nusantara",
            companySupervisor: "Ir. Bambang Sutejo",
            reportUrl: "/documents/berita-acara-123.pdf"
        }
    ];

    // Effect untuk update waktu saat ini
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Fungsi untuk mengecek apakah seminar sudah bisa dinilai
    const canGradeNow = (seminarDate: string, seminarTime: string) => {
        const seminarDateTime = new Date(`${seminarDate}T${seminarTime}`);
        return currentDateTime >= seminarDateTime;
    };

    // Komponen Form Penilaian
    const GradingForm = ({ seminar, onClose }) => {
        const { toast } = useToast();
        const [formData, setFormData] = useState({
            presentation: "",
            documentation: "",
            mastery: "",
            qa: "",
            notes: ""
        });
        const [showConfirmation, setShowConfirmation] = useState(false);

        const handleGradeChange = (field, value) => {
            setFormData(prevState => ({
                ...prevState,
                [field]: value
            }));
        };

        const calculateFinalGrade = () => {
            const grades = {
                presentation: gradeOptions.find(g => g.letter === formData.presentation)?.numeric || 0,
                documentation: gradeOptions.find(g => g.letter === formData.documentation)?.numeric || 0,
                mastery: gradeOptions.find(g => g.letter === formData.mastery)?.numeric || 0,
                qa: gradeOptions.find(g => g.letter === formData.qa)?.numeric || 0
            };

            return ((grades.presentation + grades.documentation + grades.mastery + grades.qa) / 4).toFixed(1);
        };

        const handleSubmit = (e) => {
            e?.preventDefault();
            const finalGrade = calculateFinalGrade();

            // Close the confirmation dialog
            setShowConfirmation(false);

            // Show success toast with more details
            toast({
                title: "Nilai Berhasil Disimpan! 🎉",
                description: (
                    <div className="mt-2 space-y-2">
                        <p><strong>Mahasiswa:</strong> {seminar.studentName}</p>
                        <p><strong>NIM:</strong> {seminar.nim}</p>
                        <p><strong>Nilai Akhir:</strong> {finalGrade}</p>
                        <p className="text-sm text-muted-foreground">Nilai telah tersimpan dan tidak dapat diubah</p>
                    </div>
                ),
                duration: 5000, // Show for 5 seconds
            });

            // Close the main dialog
            onClose();
        };

        const validateForm = () => {
            return formData.presentation &&
                formData.documentation &&
                formData.mastery &&
                formData.qa;
        };

        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(true);
            }} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="presentation">Presentasi (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("presentation", value)}
                        value={formData.presentation}
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
                    <Label htmlFor="documentation">Dokumentasi (0-100)</Label>
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
                    <Label htmlFor="mastery">Penguasaan Materi (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("mastery", value)}
                        value={formData.mastery}
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
                    <Label htmlFor="qa">Tanya Jawab (0-100)</Label>
                    <Select
                        onValueChange={(value) => handleGradeChange("qa", value)}
                        value={formData.qa}
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

                {/* Grade Summary Card */}
                {validateForm() && (
                    <Card className="bg-muted">
                        <CardContent className="pt-4">
                            <p className="text-sm font-medium">Ringkasan Nilai:</p>
                            <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>Presentasi:</span>
                                    <span>{formData.presentation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Dokumentasi:</span>
                                    <span>{formData.documentation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Penguasaan Materi:</span>
                                    <span>{formData.mastery}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tanya Jawab:</span>
                                    <span>{formData.qa}</span>
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
                    <Button
                        type="submit"
                        disabled={!validateForm()}
                    >
                        Simpan Nilai
                    </Button>
                </DialogFooter>

                {/* Confirmation Dialog */}
                <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Pengiriman Nilai</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className="space-y-2">
                                    <p>Anda akan mengirim nilai untuk:</p>
                                    <div className="bg-muted p-3 rounded-md space-y-1">
                                        <p><strong>Mahasiswa:</strong> {seminar.studentName}</p>
                                        <p><strong>NIM:</strong> {seminar.nim}</p>
                                        <p><strong>Nilai Akhir:</strong> {calculateFinalGrade()}</p>
                                    </div>
                                    <p className="text-yellow-600 dark:text-yellow-500 mt-2">
                                        ⚠️ Nilai yang sudah dikirim tidak dapat diubah kembali.
                                    </p>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>
                                Kembali
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleSubmit}
                                className="bg-primary hover:bg-primary/90"
                            >
                                Ya, Kirim Nilai
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        );
    };

    const renderActionButton = (seminar) => (
        <Dialog open={isGradingModalOpen && selectedSeminar?.id === seminar.id}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSelectedSeminar(seminar);
                        setIsGradingModalOpen(true);
                    }}
                >
                    Detail
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Detail Seminar</DialogTitle>
                    <DialogDescription>
                        Data mahasiswa dan form penilaian
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-sm">Nama:</p>
                            <p className="text-sm font-medium">{seminar.studentName}</p>
                            <p className="text-sm">NIM:</p>
                            <p className="text-sm font-medium">{seminar.nim}</p>
                            <p className="text-sm">Judul:</p>
                            <p className="text-sm font-medium">{seminar.title}</p>
                            <p className="text-sm">Pembimbing:</p>
                            <p className="text-sm font-medium">{seminar.supervisorName}</p>
                            <p className="text-sm">Instansi:</p>
                            <p className="text-sm font-medium">{seminar.companyName}</p>
                            <p className="text-sm">Pembimbing Instansi:</p>
                            <p className="text-sm font-medium">{seminar.companySupervisor}</p>
                        </div>
                    </div>

                    {canGradeNow(seminar.date, seminar.time) ? (
                        <GradingForm
                            seminar={seminar}
                            onClose={() => {
                                setIsGradingModalOpen(false);
                                setSelectedSeminar(null);
                            }}
                        />
                    ) : (
                        <div className="bg-yellow-50 p-4 rounded-md">
                            <p className="text-yellow-800 text-sm">
                                Form penilaian akan tersedia saat jadwal seminar dimulai
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );

    // Effect untuk set tanggal seminar di kalender
    useEffect(() => {
        const dates = [...upcomingSeminars, ...pastSeminars].map(
            seminar => new Date(seminar.date)
        );
        setSelectedDates(dates);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Dosen Penguji</h1>
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
                                    Tanggal yang ditandai merupakan jadwal seminar
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
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Mahasiswa yang diuji</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Seminar Mendatang</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Jadwal seminar</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sudah Dinilai</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <p className="text-xs text-muted-foreground">Mahasiswa selesai</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.5</div>
                        <p className="text-xs text-muted-foreground">Dari semua mahasiswa</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Seminar */}
            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList>
                    <TabsTrigger value="upcoming">Seminar Mendatang</TabsTrigger>
                    <TabsTrigger value="past">Riwayat Seminar</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Seminar Mendatang</CardTitle>
                            <CardDescription>
                                Daftar seminar yang akan Anda uji dalam waktu dekat
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mahasiswa</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Ruangan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcomingSeminars.map((seminar) => (
                                        <TableRow key={seminar.id}>
                                            <TableCell className="font-medium">{seminar.studentName}</TableCell>
                                            <TableCell>{seminar.title}</TableCell>
                                            <TableCell>{seminar.date}</TableCell>
                                            <TableCell>{seminar.time}</TableCell>
                                            <TableCell>{seminar.room}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={canGradeNow(seminar.date, seminar.time) ? "default" : "secondary"}>
                                                    {canGradeNow(seminar.date, seminar.time) ? "Sedang Berlangsung" : "Mendatang"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {renderActionButton(seminar)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="past">
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Seminar</CardTitle>
                            <CardDescription>
                                Daftar seminar yang telah selesai diuji
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mahasiswa</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pastSeminars.map((seminar) => (
                                        <TableRow key={seminar.id}>
                                            <TableCell className="font-medium">{seminar.studentName}</TableCell>
                                            <TableCell>{seminar.title}</TableCell>
                                            <TableCell>{seminar.date}</TableCell>
                                            <TableCell>{seminar.time}</TableCell>
                                            <TableCell>{seminar.score}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            Detail
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-[700px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Detail Riwayat Seminar</DialogTitle>
                                                            <DialogDescription>
                                                                Data mahasiswa dan dokumen berita acara
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4 space-y-6">
                                                            <div className="space-y-4">
                                                                <h3 className="font-semibold">Data Mahasiswa</h3>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <p className="text-sm">Nama:</p>
                                                                    <p className="text-sm font-medium">{seminar.studentName}</p>
                                                                    <p className="text-sm">NIM:</p>
                                                                    <p className="text-sm font-medium">{seminar.nim}</p>
                                                                    <p className="text-sm">Judul:</p>
                                                                    <p className="text-sm font-medium">{seminar.title}</p>
                                                                    <p className="text-sm">Nilai Akhir:</p>
                                                                    <p className="text-sm font-medium">{seminar.score}</p>
                                                                    <p className="text-sm">Pembimbing:</p>
                                                                    <p className="text-sm font-medium">{seminar.supervisorName}</p>
                                                                    <p className="text-sm">Instansi:</p>
                                                                    <p className="text-sm font-medium">{seminar.companyName}</p>
                                                                    <p className="text-sm">Pembimbing Instansi:</p>
                                                                    <p className="text-sm font-medium">{seminar.companySupervisor}</p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <h3 className="font-semibold">Dokumen Berita Acara</h3>
                                                                <div className="border rounded-lg p-4">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="flex items-center gap-2">
                                                                            <BookOpen className="w-4 h-4"/>
                                                                            <span>Berita Acara Seminar KP</span>
                                                                        </div>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => window.open(seminar.reportUrl, '_blank')}
                                                                        >
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Alert untuk mengingatkan input nilai */}
            <AlertDialog>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Pengingat Penilaian</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda memiliki mahasiswa yang belum dinilai. Mohon segera input nilai setelah seminar
                            selesai.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Mengerti</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster />
        </div>
    );
};

export default DosenPengujiPage;