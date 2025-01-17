"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Calendar,
    User,
    FileText,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster"

// Import komponen-komponen yang telah dipisahkan
import DocumentStatus from "@/components/mahasiswa/DocumentStatus";
import DocumentDetailDialog from "@/components/mahasiswa/DocumentDetailDialog";
import UploadDocumentDialog from "@/components/mahasiswa/UploadDocumentDialog";
import DocumentProgressChart from "@/components/mahasiswa/DocumentProgressChart";

// Import types
import { Document, ProfileData } from "@/types/mahasiswa";

export default function MahasiswaPage() {
    const [documents, setDocuments] = React.useState<Document[]>([
        { id: "1", name: "Proposal KP", status: "Tervalidasi", updatedAt: "2024-01-10", file: "proposal.pdf", description: "Proposal KP Final" },
        { id: "2", name: "Form Nilai Pembimbing", status: "Pending", updatedAt: "2024-01-12" },
        { id: "3", name: "Laporan KP", status: "Revisi", updatedAt: "2024-01-15", feedback: "Bab 3 perlu diperbaiki sesuai template", file: "laporan_v1.pdf" },
        { id: "4", name: "Form Pendaftaran", status: "Belum Upload", updatedAt: "-" },
    ]);

    const [profileData, setProfileData] = React.useState<ProfileData>({
        nim: "12345",
        nama: "John Doe",
        judul_kp: "Pendaftaran",
        program_studi: "Teknik Informasi",
        dosen_pembimbing: "Prof. Gilang",
        pembimbing_instansi: "Sumanto",
        instansi: "PT Pencari Cinta Sejati",
    });

    const nextSeminar = {
        date: "20 Januari 2024",
        time: "13:00 WIB",
        room: "FST 301",
        examiner: "Dr. Budi Santoso, M.Kom",
    };

    const isProfileComplete = React.useMemo(() => {
        const requiredFields = ['nim', 'nama', 'judul_kp', 'program_studi', 'dosen_pembimbing', 'pembimbing_instansi', 'instansi'];
        return requiredFields.every(field => profileData[field as keyof ProfileData]);
    }, [profileData]);

    const allDocumentsValidated = documents.every(doc => doc.status === "Tervalidasi");
    const hasRevision = documents.some(doc => doc.status === "Revisi");

    const getAlertContent = () => {
        if (!isProfileComplete) {
            return {
                icon: <User className="h-4 w-4" />,
                title: "Lengkapi Profil",
                description: "Silakan lengkapi data profil Anda terlebih dahulu sebelum melakukan upload dokumen seminar KP.",
                variant: "destructive"
            };
        }
        if (hasRevision) {
            return {
                icon: <AlertTriangle className="h-4 w-4" />,
                title: "Dokumen Perlu Revisi",
                description: "Terdapat dokumen yang perlu direvisi. Silakan periksa detail dokumen dan lakukan revisi sesuai feedback.",
                variant: "warning"
            };
        }
        if (allDocumentsValidated) {
            return {
                icon: <CheckCircle2 className="h-4 w-4" />,
                title: "Siap Seminar",
                description: "Semua dokumen telah tervalidasi. Anda akan segera mendapatkan jadwal seminar.",
                variant: "default"
            };
        }
        return {
            icon: <FileText className="h-4 w-4" />,
            title: "Upload Dokumen",
            description: "Silakan upload dokumen yang diperlukan untuk proses KP.",
            variant: "default"
        };
    };

    const alertContent = getAlertContent();

    // Handler untuk upload dokumen baru
    const handleUploadComplete = (newDocument: Document) => {
        setDocuments(prev => [...prev, newDocument]);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Mahasiswa</h1>
                <p className="text-muted-foreground">Selamat datang, Gilang Ramadhan Indra</p>
            </div>

            {/* Status Alert */}
            <Alert variant={alertContent.variant as "default" | "destructive"}>
                {alertContent.icon}
                <AlertTitle>{alertContent.title}</AlertTitle>
                <AlertDescription>
                    {alertContent.description}
                </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Actions Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi</CardTitle>
                        <CardDescription>Upload dokumen atau lihat jadwal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <UploadDocumentDialog
                            isProfileComplete={isProfileComplete}
                            onUploadComplete={handleUploadComplete}
                        />
                        <Button variant="outline" className="w-full flex items-center gap-2">
                            <Calendar className="h-4 w-4"/> Lihat Jadwal
                        </Button>
                    </CardContent>
                </Card>

                {/* Next Seminar Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Seminar</CardTitle>
                        <CardDescription>Informasi seminar anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Tanggal & Waktu</p>
                            <p className="text-sm font-bold">{nextSeminar.date} - {nextSeminar.time}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Ruangan</p>
                            <p className="text-sm font-bold">{nextSeminar.room}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Dosen Penguji</p>
                            <p className="text-sm font-bold">{nextSeminar.examiner}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Progress Chart */}
                <DocumentProgressChart uploadedDocs={3} totalDocs={15} />
            </div>

            {/* Documents Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Dokumen Terkini</CardTitle>
                    <CardDescription>Status dokumen yang telah diupload</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Dokumen</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Terakhir Update</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell>
                                        <DocumentStatus status={doc.status} />
                                    </TableCell>
                                    <TableCell>{doc.updatedAt}</TableCell>
                                    <TableCell>
                                        <DocumentDetailDialog document={doc} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}