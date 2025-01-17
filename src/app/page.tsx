'use client';

import React from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {BookOpen, Calendar, Users, ClipboardCheck, ArrowRight} from "lucide-react";
import ThemeToggler from "@/components/ThemeToggler";
import Image from "next/image";

const MainContent = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header - Made sticky and full-width */}
            <header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/uin-suska.svg"
                            alt="Uin Suska Logo"
                            width="36"
                            height="36"
                            priority
                            className="h-auto"
                        />
                        <span className="font-bold">SiTrack</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggler/>
                        <Button>Login</Button>
                    </div>
                </div>
            </header>

            {/* Hero Section - Improved responsive padding and width */}
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
                        Sistem Informasi Seminar Kerja Praktik
                    </h1>
                    <p className="mx-auto max-w-2xl text-gray-500 text-base md:text-lg lg:text-xl">
                        Platform terintegrasi untuk manajemen dan monitoring kegiatan seminar kerja praktik mahasiswa
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto">Mulai Sekarang</Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">Pelajari Lebih Lanjut</Button>
                    </div>
                </div>
            </section>

            {/* Features Section - Responsive grid and spacing */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Fitur Utama</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="h-full">
                        <CardHeader>
                            <BookOpen className="w-6 h-6 text-primary"/>
                            <CardTitle>Manajemen Seminar</CardTitle>
                            <CardDescription>
                                Kelola jadwal dan detail seminar dengan mudah dan terstruktur
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="h-full">
                        <CardHeader>
                            <Calendar className="w-6 h-6 text-primary"/>
                            <CardTitle>Penjadwalan Otomatis</CardTitle>
                            <CardDescription>
                                Sistem penjadwalan cerdas untuk menghindari konflik waktu
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="h-full sm:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <Users className="w-6 h-6 text-primary"/>
                            <CardTitle>Monitoring Progress</CardTitle>
                            <CardDescription>
                                Pantau perkembangan mahasiswa secara real-time
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* Flow Section - Improved responsive layout */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Alur Proses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {title: "Pendaftaran", icon: <ClipboardCheck/>},
                        {title: "Pengajuan Jadwal", icon: <Calendar/>},
                        {title: "Pelaksanaan Seminar", icon: <Users/>},
                        {title: "Penilaian", icon: <BookOpen/>}
                    ].map((step, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 relative">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                {step.icon}
                            </div>
                            <h3 className="font-semibold">{step.title}</h3>
                            {index < 3 && (
                                <ArrowRight
                                    className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"/>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section - Improved width constraints */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Pertanyaan Umum</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Apa persyaratan untuk mendaftar seminar?</AccordionTrigger>
                        <AccordionContent>
                            Mahasiswa harus telah menyelesaikan kerja praktik dan mendapatkan persetujuan dari dosen
                            pembimbing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Berapa lama proses persetujuan jadwal seminar?</AccordionTrigger>
                        <AccordionContent>
                            Proses persetujuan jadwal seminar biasanya memakan waktu 2-3 hari kerja setelah pengajuan.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Bagaimana jika terjadi kendala teknis?</AccordionTrigger>
                        <AccordionContent>
                            Silakan hubungi admin sistem melalui menu bantuan atau kirim email ke support@kampus.ac.id
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Footer - Improved responsive grid */}
            <footer className="border-t mt-12">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold">Tentang Kami</h4>
                            <ul className="space-y-2">
                                <li>Profil</li>
                                <li>Kontak</li>
                                <li>Lokasi</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold">Layanan</h4>
                            <ul className="space-y-2">
                                <li>Pendaftaran</li>
                                <li>Jadwal</li>
                                <li>Monitoring</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold">Bantuan</h4>
                            <ul className="space-y-2">
                                <li>FAQ</li>
                                <li>Panduan</li>
                                <li>Dukungan</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold">Legal</h4>
                            <ul className="space-y-2">
                                <li>Kebijakan Privasi</li>
                                <li>Syarat & Ketentuan</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                        © 2025 SiTrack Teknik Informatika. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function Home() {
    return <MainContent/>;
}