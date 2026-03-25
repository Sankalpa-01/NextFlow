"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Type } from "lucide-react";
import { InputNode as InputNodeType } from "@/types/workflow";

export function InputNode({ data, id }: NodeProps<InputNodeType>) {
  return (
    <Card className="w-64 shadow-xl border-2 border-muted hover:border-primary transition-all">
      <CardHeader className="flex flex-row items-center gap-2 p-3 border-b bg-muted/30">
        <Type size={16} className="text-blue-500" />
        <CardTitle className="text-xs font-bold uppercase tracking-wider">
          User Input
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <label className="text-[10px] text-muted-foreground uppercase font-bold">
          Initial Value
        </label>
        <Input 
          className="mt-1 text-sm bg-background" 
          placeholder="Type something..." 
          defaultValue={data.value}
        />
      </CardContent>
      
      {/* Output Handle: This is where the data flows OUT */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-blue-500 border-2 border-background" 
      />
    </Card>
  );
}