export interface Document {
    id: string;
    name: string;
    status: "Tervalidasi" | "Pending" | "Belum Upload" | "Revisi";
    updatedAt: string;
    description?: string;
    feedback?: string;
    file?: string;
}

export interface ProfileData {
    nim?: string;
    nama?: string;
    judul_kp?: string;
    program_studi?: string;
    dosen_pembimbing?: string;
    pembimbing_instansi?: string;
    instansi?: string;
}

export interface UploadFormData {
    documentType: string;
    file: string;
    description: string;
}

export interface TemplateDocument {
    id: string;
    title: string;
    description: string;
    lastUpdated: string;
    fileSize: string;
    category: string;
    downloadUrl: string;
    cloudinaryUrl: string;
}