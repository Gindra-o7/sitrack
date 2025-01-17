import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/mahasiswa"

interface DocumentStatusProps {
    status: Document['status'];
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({ status }) => {
    const statusStyles = {
        Tervalidasi: "bg-green-100 text-green-800 hover:bg-green-100/80",
        Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        "Belum Upload": "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
        Revisi: "bg-red-100 text-red-800 hover:bg-red-100/80",
    };

    return (
        <Badge className={statusStyles[status]} variant="secondary">
            {status}
        </Badge>
    );
};

export default DocumentStatus;