import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DocumentStatus from "./DocumentStatus";
import { Document } from "@/types/mahasiswa";

interface DocumentDetailDialogProps {
    document: Document;
}

const DocumentDetailDialog: React.FC<DocumentDetailDialogProps> = ({ document }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm">
                Detail
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Detail Dokumen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label>Nama Dokumen</Label>
                    <p className="text-sm">{document.name}</p>
                </div>
                <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                        <DocumentStatus status={document.status} />
                    </div>
                </div>
                <div>
                    <Label>Terakhir Update</Label>
                    <p className="text-sm">{document.updatedAt}</p>
                </div>
                {document.description && (
                    <div>
                        <Label>Deskripsi</Label>
                        <p className="text-sm">{document.description}</p>
                    </div>
                )}
                {document.feedback && (
                    <div>
                        <Label>Feedback</Label>
                        <p className="text-sm text-red-600">{document.feedback}</p>
                    </div>
                )}
                {document.file && (
                    <div>
                        <Label>File</Label>
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {document.file}
                        </p>
                    </div>
                )}
            </div>
        </DialogContent>
    </Dialog>
);

export default DocumentDetailDialog;