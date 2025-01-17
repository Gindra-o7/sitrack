"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileText, Info } from "lucide-react";
import { TemplateDocument } from "@/types/mahasiswa"

const TemplatePage = () => {
    const templates: TemplateDocument[] = [
        {
            id: "1",
            title: "Template Proposal KP",
            description: "Template standar untuk penulisan proposal kerja praktik",
            lastUpdated: "2024-01-15",
            fileSize: "2.3 MB",
            category: "proposal",
            downloadUrl: "/templates/proposal.docx"
        },
        {
            id: "2",
            title: "Template Laporan KP",
            description: "Format baku laporan akhir kerja praktik",
            lastUpdated: "2024-01-15",
            fileSize: "3.1 MB",
            category: "laporan",
            downloadUrl: "/templates/laporan.docx"
        },
        {
            id: "3",
            title: "Form Nilai Pembimbing",
            description: "Form penilaian untuk pembimbing lapangan",
            lastUpdated: "2024-01-15",
            fileSize: "500 KB",
            category: "form",
            downloadUrl: "/templates/form-nilai.pdf"
        },
        // Add more templates as needed
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Template Dokumen</h1>
                <p className="text-muted-foreground">
                    Download template dokumen yang diperlukan untuk kerja praktik
                </p>
            </div>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                    Pastikan untuk menggunakan template terbaru dalam penyusunan dokumen KP Anda.
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="proposal">Proposal</TabsTrigger>
                    <TabsTrigger value="laporan">Laporan</TabsTrigger>
                    <TabsTrigger value="form">Form</TabsTrigger>
                </TabsList>

                {["all", "proposal", "laporan", "form"].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {templates
                                .filter(template => tab === "all" || template.category === tab)
                                .map((template) => (
                                    <Card key={template.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5" />
                                                {template.title}
                                            </CardTitle>
                                            <CardDescription>{template.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-1 text-sm">
                                                <p>Terakhir diperbarui: {template.lastUpdated}</p>
                                                <p>Ukuran file: {template.fileSize}</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                className="w-full flex items-center gap-2"
                                                onClick={() => window.open(template.downloadUrl)}
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default TemplatePage;