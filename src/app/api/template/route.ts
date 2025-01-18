import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

interface CloudinaryResource {
    public_id: string;
    display_name?: string;
    context?: {
        description?: string;
    };
    created_at: string;
    bytes: number;
    secure_url: string;
}

interface CloudinarySearchResponse {
    resources: CloudinaryResource[];
}

interface Template {
    id: string;
    title: string;
    description: string;
    lastUpdated: string;
    fileSize: string;
    category: string;
    cloudinaryUrl: string;
}

export async function GET() {
    try {
        const { resources }: CloudinarySearchResponse = await cloudinary.search
            .expression('folder:Templates/*')
            .sort_by('public_id', 'desc')
            .execute();

        const templates: Template[] = resources.map((resource: CloudinaryResource) => ({
            id: resource.public_id,
            title: getTemplateTitle(resource.display_name || resource.public_id),
            description: resource.context?.description || getDefaultDescription(resource.public_id),
            lastUpdated: new Date(resource.created_at).toLocaleDateString('id-ID'),
            fileSize: formatFileSize(resource.bytes),
            category: getTemplateCategory(resource.public_id),
            cloudinaryUrl: resource.secure_url
        }));

        return NextResponse.json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }
}

// Helper functions
function getTemplateTitle(publicId: string): string {
    const filename = publicId.split('/').pop() || '';
    return filename
        .replace(/\.[^/.]+$/, '') // remove extension
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getTemplateCategory(publicId: string): string {
    if (publicId.includes('proposal')) return 'proposal';
    if (publicId.includes('laporan')) return 'laporan';
    if (publicId.includes('form')) return 'form';
    return 'other';
}

function getDefaultDescription(publicId: string): string {
    const category = getTemplateCategory(publicId);
    const descriptions: Record<string, string> = {
        proposal: 'Template standar untuk penulisan proposal kerja praktik',
        laporan: 'Format baku laporan akhir kerja praktik',
        form: 'Form dokumen kerja praktik',
        other: 'Dokumen template kerja praktik'
    };
    return descriptions[category];
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}