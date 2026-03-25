"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function OutputNode({ data }: NodeProps<any>) {
  return (
    <Card className="w-64 shadow-xl border-2 border-green-500/30 bg-green-500/5">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500" />
      
      <CardHeader className="flex flex-row items-center gap-2 p-3 border-b border-green-500/10">
        <CheckCircle2 size={16} className="text-green-500" />
        <CardTitle className="text-xs font-bold uppercase tracking-wider">
          Final Output
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="rounded-md bg-background border p-3 text-sm min-h-[60px] font-mono">
          {data.result || "Waiting for execution..."}
        </div>
      </CardContent>
    </Card>
  );
}