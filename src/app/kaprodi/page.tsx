"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";

const KaprodiPage = () => {
    const { theme } = useTheme();

    // Definisi warna berdasarkan tema
    const COLORS = {
        light: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        dark: ['#4F94CD', '#3CB371', '#DAA520', '#CD6839']
    };

    const CHART_COLORS = {
        light: {
            text: '#374151',
            grid: '#E5E7EB',
            bars: ['#8884d8', '#82ca9d']
        },
        dark: {
            text: '#9CA3AF',
            grid: '#374151',
            bars: ['#6366f1', '#4ade80']
        }
    };

    const currentColors = theme === 'dark' ? CHART_COLORS.dark : CHART_COLORS.light;
    const currentPieColors = theme === 'dark' ? COLORS.dark : COLORS.light;

    // Sample data
    const studentStats = [
        { status: 'Selesai Seminar', count: 125 },
        { status: 'Proses Seminar', count: 45 },
        { status: 'Menunggu Jadwal', count: 30 },
    ];

    const gradeByYear = [
        { angkatan: '2020', rata: 3.75 },
        { angkatan: '2021', rata: 3.65 },
        { angkatan: '2022', rata: 3.80 },
        { angkatan: '2023', rata: 3.70 },
    ];

    const dosenKinerja = [
        { nama: 'Dr. Ahmad', penguji: 15, pembimbing: 8 },
        { nama: 'Dr. Budi', penguji: 12, pembimbing: 10 },
        { nama: 'Dr. Clara', penguji: 18, pembimbing: 6 },
        { nama: 'Dr. Diana', penguji: 14, pembimbing: 9 },
    ];

    const instansiData = [
        { nama: 'PT ABC Tech', mahasiswa: 25, rata_nilai: 3.8 },
        { nama: 'PT XYZ Digital', mahasiswa: 20, rata_nilai: 3.7 },
        { nama: 'PT Innovation', mahasiswa: 15, rata_nilai: 3.9 },
        { nama: 'PT Software', mahasiswa: 18, rata_nilai: 3.6 },
    ];

    const jadwalSeminar = [
        { tanggal: '2025-01-20', mahasiswa: 'John Doe', ruang: 'R301', waktu: '09:00', pembimbing: 'Dr. Ahmad', penguji: 'Dr. Budi' },
        { tanggal: '2025-01-20', mahasiswa: 'Jane Smith', ruang: 'R302', waktu: '13:00', pembimbing: 'Dr. Clara', penguji: 'Dr. Diana' },
    ];

    // Custom chart components
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded p-2 shadow-lg">
                    <p className="text-sm font-medium">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const handleExportToExcel = (data, filename) => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    return (
        <div className="p-4 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Kaprodi</h1>
                <p className="text-muted-foreground">Selamat datang, Iwan Iskandar S.T., M.T.</p>
            </div>
            {/* Statistik Utama */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Mahasiswa KP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">200</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rata-rata Nilai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">3.72</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Instansi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">15</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seminar Minggu Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">8</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="statistik" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="statistik">Statistik Mahasiswa</TabsTrigger>
                    <TabsTrigger value="jadwal">Jadwal Seminar</TabsTrigger>
                    <TabsTrigger value="dosen">Kinerja Dosen</TabsTrigger>
                    <TabsTrigger value="instansi">Instansi Mitra</TabsTrigger>
                </TabsList>

                {/* Tab Statistik Mahasiswa */}
                <TabsContent value="statistik" className="space-y-4">
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => handleExportToExcel(studentStats, 'statistik-mahasiswa')}
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Ekstrak ke Excel
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status Mahasiswa KP</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={studentStats}
                                        cx={200}
                                        cy={150}
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label
                                    >
                                        {studentStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={currentPieColors[index % currentPieColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Rata-rata Nilai per Angkatan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LineChart width={400} height={300} data={gradeByYear}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={currentColors.grid} />
                                    <XAxis dataKey="angkatan" stroke={currentColors.text} />
                                    <YAxis domain={[0, 4]} stroke={currentColors.text} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="rata"
                                        stroke={currentColors.bars[0]}
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Tab Jadwal Seminar */}
                <TabsContent value="jadwal">
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => handleExportToExcel(jadwalSeminar, 'jadwal-seminar')}
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Ekstrak ke Excel
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Seminar Kerja Praktik</CardTitle>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih Ruangan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="R301">R301</SelectItem>
                                        <SelectItem value="R302">R302</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Mahasiswa</TableHead>
                                        <TableHead>Ruangan</TableHead>
                                        <TableHead>Pembimbing</TableHead>
                                        <TableHead>Penguji</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jadwalSeminar.map((jadwal, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{jadwal.tanggal}</TableCell>
                                            <TableCell>{jadwal.waktu}</TableCell>
                                            <TableCell>{jadwal.mahasiswa}</TableCell>
                                            <TableCell>{jadwal.ruang}</TableCell>
                                            <TableCell>{jadwal.pembimbing}</TableCell>
                                            <TableCell>{jadwal.penguji}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab Kinerja Dosen */}
                <TabsContent value="dosen">
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => handleExportToExcel(dosenKinerja, 'kinerja-dosen')}
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Ekstrak ke Excel
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kinerja Dosen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BarChart width={800} height={400} data={dosenKinerja}>
                                <CartesianGrid strokeDasharray="3 3" stroke={currentColors.grid} />
                                <XAxis dataKey="nama" stroke={currentColors.text} />
                                <YAxis stroke={currentColors.text} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="penguji" fill={currentColors.bars[0]} name="Sebagai Penguji" />
                                <Bar dataKey="pembimbing" fill={currentColors.bars[1]} name="Sebagai Pembimbing" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab Instansi Mitra */}
                <TabsContent value="instansi">
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => handleExportToExcel(instansiData, 'data-instansi')}
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Ekstrak ke Excel
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Instansi Mitra</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Instansi</TableHead>
                                            <TableHead>Jumlah Mahasiswa</TableHead>
                                            <TableHead>Rata-rata Nilai</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {instansiData.map((instansi, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{instansi.nama}</TableCell>
                                                <TableCell>{instansi.mahasiswa}</TableCell>
                                                <TableCell>{instansi.rata_nilai}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Distribusi Mahasiswa per Instansi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BarChart width={800} height={300} data={instansiData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={currentColors.grid} />
                                    <XAxis dataKey="nama" stroke={currentColors.text} />
                                    <YAxis stroke={currentColors.text} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="mahasiswa"
                                        fill={currentColors.bars[1]}
                                        name="Jumlah Mahasiswa"
                                    />
                                </BarChart>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default KaprodiPage;