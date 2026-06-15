"use client";

import { useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

type LikeState = {
  count: number;
  liked: boolean;
};

export function LikeButton({ initialCount }: { initialCount: number }) {
  const [state, addOptimistic] = useOptimistic<LikeState, void>(
    { count: initialCount, liked: false },
    (current) => ({
      count: current.liked ? current.count - 1 : current.count + 1,
      liked: !current.liked,
    }),
  );

  return (
    <Button
      variant={state.liked ? "default" : "outline"}
      size="sm"
      onClick={() => addOptimistic()}
    >
      <ThumbsUp className={state.liked ? "fill-current" : ""} />
      {state.count}
    </Button>
  );
}
