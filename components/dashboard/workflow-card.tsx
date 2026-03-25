"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play, MoreVertical } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // npm install date-fns

interface WorkflowCardProps {
  id: string;
  title: string;
  updatedAt: Date;
  status: "draft" | "published";
  nodeCount: number;
}

export function WorkflowCard({ id, title, updatedAt, status, nodeCount }: WorkflowCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-all shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold truncate max-w-[180px]">
          {title}
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Clock size={12} />
          {formatDistanceToNow(updatedAt)} ago
        </div>
        <div className="flex gap-2">
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status}
          </Badge>
          <Badge variant="outline">{nodeCount} Nodes</Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/workflow/${id}`} className="w-full">
          <Button className="w-full gap-2" variant="outline">
            <Play size={14} fill="currentColor" />
            Open Editor
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}