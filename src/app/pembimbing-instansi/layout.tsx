import { FC, ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { Toaster } from "sonner";

interface RoleLayoutProps {
    children: ReactNode;
}

const RoleLayout: FC<RoleLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar role="pembimbing_instansi" />
            <main className="flex-1 p-8">
                {children}
                <Toaster />
            </main>
        </div>
    );
};

export default RoleLayout;