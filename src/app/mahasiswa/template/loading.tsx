import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function TemplateLoading() {
    return (
        <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>

            {/* Alert Skeleton */}
            <Skeleton className="h-[52px] w-full" />

            {/* Tabs Skeleton */}
            <Skeleton className="h-10 w-[400px]" />

            {/* Cards Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border">
                        <CardHeader>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[180px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-9 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}