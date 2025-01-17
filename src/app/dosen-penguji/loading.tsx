import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Navbar Skeleton
const NavbarSkeleton = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                {/* Role text skeleton */}
                <Skeleton className="h-4 w-24 mr-6" />

                {/* Navigation items skeleton */}
                <div className="flex gap-2">
                    {[1, 2, 3].map((item) => (
                        <Skeleton key={item} className="h-9 w-24" />
                    ))}
                </div>

                {/* Right side items */}
                <div className="ml-auto flex items-center gap-4">
                    <Skeleton className="h-8 w-8" /> {/* Theme toggle */}
                    <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                </div>
            </div>
        </div>
    );
};

// Page Content Skeleton
const PageContentSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Tabs skeleton */}
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-2 mb-6">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>

                {/* Card skeleton */}
                <div className="border rounded-lg p-6 space-y-6">
                    {/* Card header skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>

                    {/* Search bar skeleton */}
                    <div className="flex items-center space-x-2 mb-4">
                        <Skeleton className="h-9 w-80" />
                    </div>

                    {/* Table skeleton */}
                    <div className="space-y-4">
                        {/* Table header skeleton */}
                        <div className="flex gap-4 pb-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Skeleton key={item} className="h-4 w-24" />
                            ))}
                        </div>

                        {/* Table rows skeleton */}
                        {[1, 2, 3, 4].map((row) => (
                            <div key={row} className="flex items-center gap-4 py-4">
                                <Skeleton className="h-4 w-20" /> {/* NIM */}
                                <Skeleton className="h-4 w-32" /> {/* Name */}
                                <Skeleton className="h-4 w-48" /> {/* Title */}
                                <Skeleton className="h-4 w-24" /> {/* Date */}
                                <Skeleton className="h-4 w-24" /> {/* Status/Time */}
                                <Skeleton className="h-4 w-20" /> {/* Room */}
                                <Skeleton className="h-8 w-24" /> {/* Button */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Combined loading state
const LoadingState = () => {
    return (
        <>
            <NavbarSkeleton />
            <PageContentSkeleton />
        </>
    );
};

export default LoadingState;