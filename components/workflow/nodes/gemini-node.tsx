"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { GeminiNode as GeminiNodeType } from "@/types/workflow";
import { cn } from "@/lib/utils";

export function GeminiNode({ data }: NodeProps<GeminiNodeType>) {
  const isRunning = data.status === "loading";

  return (
    <Card className={cn(
      "w-80 shadow-2xl border-2 transition-all",
      isRunning ? "border-blue-500 ring-2 ring-blue-500/20" : "border-muted"
    )}>
      {/* Input Handle: Context flows IN from other nodes */}
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <CardHeader className="flex flex-row items-center justify-between p-3 border-b bg-blue-500/5">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-500" />
          <CardTitle className="text-xs font-bold uppercase tracking-wider">
            Gemini AI
          </CardTitle>
        </div>
        {isRunning && <Loader2 size={14} className="animate-spin text-blue-500" />}
      </CardHeader>

      <CardContent className="p-3 space-y-3">
        <div>
          <label className="text-[10px] text-muted-foreground uppercase font-bold">
            System Prompt
          </label>
          <Textarea 
            className="mt-1 text-xs min-h-[80px] bg-background resize-none" 
            placeholder="Tell the AI what to do with the input..."
            defaultValue={data.prompt}
          />
        </div>

        {data.lastResult && (
          <div className="p-2 rounded bg-muted/50 border text-[10px] italic text-foreground/80 max-h-24 overflow-y-auto">
            <strong>Last Result:</strong> {data.lastResult}
          </div>
        )}
      </CardContent>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </Card>
  );
}