import {ThemeProvider} from "@/components/providers/theme-provider";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sitrack KP",
    description: "Sistem Informasi Pengelolaan Seminar Kerja Praktik Teknik Informatika Universitas Islam Negeri Sultan Syarif Kasim Riau",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
