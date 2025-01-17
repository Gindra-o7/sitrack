"use client";

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Loading(){
    return (
        <div className="min-h-screen bg-background">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-9 rounded" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-20" />
                    </div>
                </div>
            </header>

            {/* Hero Section Skeleton */}
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="text-center space-y-6">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-2/3 mx-auto" />
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Skeleton className="h-12 w-full sm:w-32" />
                        <Skeleton className="h-12 w-full sm:w-32" />
                    </div>
                </div>
            </section>

            {/* Features Section Skeleton */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
                <Skeleton className="h-8 w-48 mx-auto mb-12" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((index) => (
                        <Card key={index} className="h-full">
                            <CardHeader>
                                <Skeleton className="h-6 w-6 mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Flow Section Skeleton */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
                <Skeleton className="h-8 w-48 mx-auto mb-12" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex flex-col items-center gap-4">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section Skeleton */}
            <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                <Skeleton className="h-8 w-48 mx-auto mb-12" />
                <Accordion type="single" collapsible className="w-full">
                    {[1, 2, 3].map((index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>
                                <Skeleton className="h-6 w-full max-w-md" />
                            </AccordionTrigger>
                            <AccordionContent>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Footer Skeleton */}
            <footer className="border-t mt-12">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((section) => (
                            <div key={section} className="space-y-4">
                                <Skeleton className="h-6 w-24" />
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <Skeleton key={item} className="h-4 w-20" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t text-center">
                        <Skeleton className="h-4 w-72 mx-auto" />
                    </div>
                </div>
            </footer>
        </div>
    );
}