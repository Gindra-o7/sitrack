"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    LayoutDashboard,
    Calendar,
    ClipboardCheck,
    GraduationCap,
    FileCheck,
    BarChart3,
    Building2,
    LogOut,
    User,
    Settings,
    FileText,
    Upload
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ThemeToggler from './ThemeToggler';

interface NavbarProps {
    role: 'mahasiswa' | 'koordinator' | 'dosen_penguji' | 'dosen_pembimbing' | 'pembimbing_instansi' | 'kaprodi';
}

const ProfileContent = ({ role, onClose }: { role: string, onClose: () => void }) => {
    // Example user data - replace with actual data from your backend
    const profileData = {
        mahasiswa: {
            nama: "John Doe",
            email: "john.doe@student.example.com",
            nim: "1234567890",
            judul_kp: "Implementasi Sistem Informasi Berbasis Web",
            program_studi: "Teknik Informatika",
            dosen_pembimbing: "Dr. Jane Smith",
            pembimbing_instansi: "Ir. Robert Johnson",
            instansi: "PT Technology Indonesia",
            semester: "7",
            tahun_ajaran: "2023/2024",
            no_telp: "081234567890"
        },
        pembimbing_instansi: {
            nama: "Robert Johnson",
            email: "robert.johnson@tech.com",
            nikn: "198507142010011234",
            instansi: "PT Technology Indonesia",
            jabatan: "Technical Lead",
            departemen: "IT Development",
            no_telp: "081234567890",
            alamat_instansi: "Jl. Tech Boulevard No. 123",
            masa_kerja: "5 tahun"
        },
        dosen_pembimbing: {
            nama: "Dr. Jane Smith",
            email: "jane.smith@university.edu",
            nip: "198507142010012345",
            program_studi: "Teknik Informatika",
            jabatan: "Lektor",
            bidang_keahlian: "Software Engineering",
            no_telp: "081234567890"
        }
        // Add other roles as needed
    };

    const initialData = profileData[role as keyof typeof profileData] || {};
    const [editedData, setEditedData] = React.useState(initialData);
    const [isLoading, setIsLoading] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleInputChange = (key: string, value: string) => {
        setEditedData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        // Here you would typically make an API call to save the changes
        setIsLoading(true);
        try {
            // Simulate API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Here you would typically make an actual API call to save the changes
            console.log('Saving changes:', {
                ...editedData,
                profileImage
            });

            // Show success toast
            toast.success("Profile updated successfully", {
                description: "Your profile changes have been saved.",
                duration: 3000,
            });
            onClose();
        } catch (err) {
            // Show error toast
            toast.error("Failed to update profile", {
                description: "An error occurred while saving your changes. Please try again.",
                duration: 3000,
            });
            console.error("Error updating profile:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || ""}/>
                    <AvatarFallback className="text-lg">
                        {editedData.nama?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                    >
                        <Upload className="h-4 w-4"/>
                        Change Photo
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <p className="text-xs text-muted-foreground">
                        Recommended: Square JPG, PNG. Max 2MB
                    </p>
                </div>
            </div>

            {/* Profile Fields */}
            <div className="grid gap-4">
                {Object.entries(editedData).map(([key, value]) => (
                    <div key={key}>
                        <Label htmlFor={key} className="capitalize">
                            {key.replace(/_/g, ' ')}
                        </Label>
                        <Input
                            id={key}
                            value={value as string}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="mt-1"
                            disabled={isLoading}
                        />
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </DialogFooter>
        </div>
    );
};

const Navbar: React.FC<NavbarProps> = ({role}) => {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "", // Add actual avatar URL if available
    };

    const handleLogout = () => {
        // Implement your logout logic here
        console.log("Logging out...");
    };

    const roleNavItems = {
        mahasiswa: [
            {href: '/mahasiswa', icon: LayoutDashboard, title: 'Dashboard'},
            {href: '/mahasiswa/template', icon: FileText, title: 'Dokumen'},
        ],
        koordinator: [
            {href: '/koordinator', icon: LayoutDashboard, title: 'Dashboard'},
            {href: '/koordinator/validasi', icon: FileCheck, title: 'Validasi Dokumen'},
            {href: '/koordinator/jadwal', icon: Calendar, title: 'Kelola Jadwal'},
            {href: '/koordinator/nilai', icon: ClipboardCheck, title: 'Rekap Nilai'},
        ],
        dosen_penguji: [
            {href: '/dosen-penguji', icon: LayoutDashboard, title: 'Dashboard'}
        ],
        dosen_pembimbing: [
            {href: '/dosen-pembimbing', icon: LayoutDashboard, title: 'Dashboard'},
            {href: '/dosen-pembimbing/mahasiswa', icon: GraduationCap, title: 'Mahasiswa Bimbingan'},
            {href: '/dosen-pembimbing/nilai', icon: ClipboardCheck, title: 'Input Nilai'},
        ],
        pembimbing_instansi: [
            {href: '/pembimbing-instansi', icon: LayoutDashboard, title: 'Dashboard'},
            {href: '/pembimbing-instansi/mahasiswa', icon: Building2, title: 'Mahasiswa Magang'},
            {href: '/pembimbing-instansi/nilai', icon: ClipboardCheck, title: 'Input Nilai'},
        ],
        kaprodi: [
            {href: '/kaprodi', icon: LayoutDashboard, title: 'Dashboard'},
            {href: '/kaprodi/visualisasi', icon: BarChart3, title: 'Visualisasi Data'},
        ],
    };

    const navItems = roleNavItems[role];

    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="mr-6 font-semibold">
                        {role.split('_').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <Link href={item.href} legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                'flex items-center gap-2',
                                                pathname === item.href && 'bg-accent text-accent-foreground'
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="ml-auto flex items-center gap-4">
                        <ThemeToggler />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <Avatar>
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => setIsLogoutDialogOpen(true)}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Profile Sheet */}
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile information here
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileContent
                        role={role}
                        onClose={() => setIsProfileOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to logout? You`ll need to login again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Navbar;