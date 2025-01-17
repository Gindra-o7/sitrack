"use client";

// app/mahasiswa/loading.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    {/* Role text */}
                    <div className="mr-6">
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Navigation */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            {[1, 2].map((item) => (
                                <NavigationMenuItem key={item} className="mx-2">
                                    <Skeleton className="h-8 w-24" />
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Right side items */}
                    <div className="ml-auto flex items-center gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" /> {/* Theme toggle */}
                        <Avatar>
                            <AvatarFallback>
                                <Skeleton className="h-full w-full rounded-full" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Header */}
                <Skeleton className="h-10 w-64" />

                {/* Alert */}
                <Skeleton className="h-20 w-full rounded-lg" />

                {/* Cards Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((card) => (
                        <Card key={card}>
                            <CardHeader>
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <Skeleton key={item} className="h-4 w-full" />
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Documents Table */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((header) => (
                                    <Skeleton key={header} className="h-4 w-24" />
                                ))}
                            </div>
                            {/* Table Rows */}
                            {[1, 2, 3].map((row) => (
                                <div key={row} className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((cell) => (
                                        <Skeleton key={cell} className="h-4 w-full" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}