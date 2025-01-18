"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const PembimbingInstansiSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-16 mb-1" />
                            <Skeleton className="h-3 w-28" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs Skeleton */}
            <Tabs defaultValue="active" className="w-full">
                <TabsList>
                    <TabsTrigger value="active">Mahasiswa Aktif</TabsTrigger>
                    <TabsTrigger value="completed">Mahasiswa Selesai</TabsTrigger>
                </TabsList>

                {["active", "completed"].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-72" />
                            </CardHeader>
                            <CardContent>
                                {/* Search Input Skeleton */}
                                <div className="py-4">
                                    <Skeleton className="h-10 w-72" />
                                </div>

                                {/* Table Skeleton */}
                                <div className="space-y-4">
                                    {/* Table Header Skeleton */}
                                    <div className="flex gap-4 py-3 border-b">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>

                                    {/* Table Rows Skeleton */}
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="flex gap-4 py-4">
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                            <Skeleton className="h-4 w-48" />
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-6 w-24" />
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-8 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default PembimbingInstansiSkeleton;