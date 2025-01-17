import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Document, UploadFormData } from "@/types/mahasiswa";

interface UploadDocumentDialogProps {
    isProfileComplete: boolean;
    onUploadComplete: (newDocument: Document) => void;
}

const UploadDocumentDialog: React.FC<UploadDocumentDialogProps> = ({
                                                                       isProfileComplete,
                                                                       onUploadComplete
                                                                   }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<UploadFormData>({
        defaultValues: {
            documentType: "",
            file: "",
            description: "",
        },
    });

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    const onSubmit = (data: UploadFormData) => {
        simulateUpload();

        setTimeout(() => {
            const newDocument: Document = {
                id: Date.now().toString(),
                name: data.documentType,
                status: "Pending",
                updatedAt: new Date().toISOString().split('T')[0],
                description: data.description,
                file: data.file
            };
            onUploadComplete(newDocument);

            // Show success toast
            toast({
                title: "Dokumen Berhasil Diupload",
                description: `${data.documentType} telah berhasil diupload dan sedang menunggu validasi.`,
                duration: 5000,
            });

            // Reset form and close dialog
            form.reset();
            setOpen(false);
        }, 5500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full flex items-center gap-2" disabled={!isProfileComplete}>
                    <Upload className="h-4 w-4"/> Upload Dokumen
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Dokumen</DialogTitle>
                    <DialogDescription>
                        Pilih jenis dokumen dan file yang akan diupload
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="documentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Dokumen</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis dokumen" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="proposal">Proposal KP</SelectItem>
                                            <SelectItem value="laporan">Laporan KP</SelectItem>
                                            <SelectItem value="form_nilai">Form Nilai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Tambahkan keterangan singkat tentang dokumen
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isUploading && (
                            <div className="space-y-2">
                                <Progress value={uploadProgress} className="h-2 w-full" />
                                <p className="text-sm text-muted-foreground text-center">
                                    Uploading... {uploadProgress}%
                                </p>
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="submit" disabled={isUploading}>
                                {isUploading ? "Uploading..." : "Upload"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UploadDocumentDialog;