"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileText, Info, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Template {
    id: string;
    title: string;
    description: string;
    lastUpdated: string;
    fileSize: string;
    category: string;
    cloudinaryUrl: string;
}

const TemplatePage = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await fetch('/api/template');
            if (!response.ok) throw new Error('Failed to fetch templates');
            const data = await response.json();
            setTemplates(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (template: Template) => {
        try {
            const response = await fetch(template.cloudinaryUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = template.title + getFileExtension(template.cloudinaryUrl);
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Gagal mengunduh file. Silakan coba lagi.');
        }
    };

    const handleView = (template: Template) => {
        window.open(template.cloudinaryUrl, '_blank');
    };

    const getFileExtension = (url: string): string => {
        const extension = url.split('.').pop();
        return extension ? '.' + extension : '';
    };

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Error: {error}. Silakan muat ulang halaman.
                </AlertDescription>
            </Alert>
        );
    }

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
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <Card key={i}>
                                        <CardHeader>
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-4 w-1/3" />
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex flex-col space-y-2">
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                templates
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
                                            <CardFooter className="flex flex-col space-y-2">
                                                <Button
                                                    className="w-full flex items-center gap-2"
                                                    onClick={() => handleView(template)}
                                                    variant="outline"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Lihat File
                                                </Button>
                                                <Button
                                                    className="w-full flex items-center gap-2"
                                                    onClick={() => handleDownload(template)}
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default TemplatePage;