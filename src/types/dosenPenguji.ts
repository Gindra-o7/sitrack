export interface Seminar {
    id: number;
    studentName: string;
    nim: string;
    title: string;
    date: string;
    time: string;
    room?: string;
    status: string;
    score?: number;
    supervisorName: string;
    companyName: string;
    companySupervisor: string;
    reportUrl?: string;
}

export interface GradeOption {
    letter: string;
    numeric: number;
}