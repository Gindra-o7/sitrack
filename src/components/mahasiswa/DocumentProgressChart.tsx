import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { useTheme } from 'next-themes';

interface DocumentProgressChartsProps {
    uploadedDocs: number;
    totalDocs: number;
}

const DocumentProgressCharts: React.FC<DocumentProgressChartsProps> = ({ uploadedDocs, totalDocs }) => {
    const { theme } = useTheme();
    const percentage = Math.round((uploadedDocs / totalDocs) * 100);

    // Dinamis colors berdasarkan theme
    const COLORS = {
        light: {
            primary: '#2563eb',    // Blue untuk uploaded
            secondary: '#e2e8f0'   // Gray untuk remaining
        },
        dark: {
            primary: '#3b82f6',
            secondary: '#334155'
        }
    };

    const currentColors = COLORS[theme === 'dark' ? 'dark' : 'light'];

    const data = [
        { name: 'Uploaded', value: uploadedDocs },
        { name: 'Remaining', value: totalDocs - uploadedDocs }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Progress Dokumen</CardTitle>
                <CardDescription>Status dokumen-dokumen yang diperlukan</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? currentColors.primary : currentColors.secondary}
                                    />
                                ))}
                                <Label
                                    value={`${percentage}%`}
                                    position="center"
                                    className="text-2xl font-bold"
                                    fill="currentColor"
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">
                    {uploadedDocs} dari {totalDocs} dokumen telah diupload
                </p>
            </CardContent>
        </Card>
    );
};

export default DocumentProgressCharts;