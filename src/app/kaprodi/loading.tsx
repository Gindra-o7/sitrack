import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KaprodiLoadingPage = () => {
    return (
        <div className="p-4 space-y-6">
            {/* Header Loading State */}
            <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Stats Cards Loading State */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs Loading State */}
            <Tabs defaultValue="statistik" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="statistik">
                        <Skeleton className="h-4 w-28" />
                    </TabsTrigger>
                    <TabsTrigger value="jadwal">
                        <Skeleton className="h-4 w-24" />
                    </TabsTrigger>
                    <TabsTrigger value="dosen">
                        <Skeleton className="h-4 w-24" />
                    </TabsTrigger>
                    <TabsTrigger value="instansi">
                        <Skeleton className="h-4 w-24" />
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="statistik" className="space-y-4">
                    <div className="flex justify-end mb-4">
                        <Skeleton className="h-9 w-32" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Charts Loading State */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-40" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[300px] w-full" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-48" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[300px] w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Table Loading State */}
                <TabsContent value="jadwal">
                    <div className="flex justify-end mb-4">
                        <Skeleton className="h-9 w-32" />
                    </div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-48 mb-4" />
                            <Skeleton className="h-10 w-[180px]" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Dosen Performance Loading State */}
                <TabsContent value="dosen">
                    <div className="flex justify-end mb-4">
                        <Skeleton className="h-9 w-32" />
                    </div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[400px] w-full" />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Instansi Loading State */}
                <TabsContent value="instansi">
                    <div className="flex justify-end mb-4">
                        <Skeleton className="h-9 w-32" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex gap-4">
                                            <Skeleton className="h-4 w-48" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-48" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[300px] w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default KaprodiLoadingPage;