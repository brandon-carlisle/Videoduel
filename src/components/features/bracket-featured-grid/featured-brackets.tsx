import Link from "next/link";

import { api } from "@/utils/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AnimatedLoaderIcon from "../loader-icon/animated-loader-icon";

export default function FeaturedBrackets() {
  const { data, status } = api.bracket.getFeatured.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (status === "loading") {
    return <AnimatedLoaderIcon />;
  }

  if (!data) return <p>Nothing found... 😭</p>;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data?.featured.map((bracket) => (
        <div key={bracket.id}>
          <Card>
            <CardHeader>
              <CardTitle>{bracket.name}</CardTitle>
              <CardDescription>by {bracket.createdBy.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={`/bracket/${bracket.id}`}>Vote now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
