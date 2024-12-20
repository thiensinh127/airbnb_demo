"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import { Button } from "./button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4 ">
        {showReset && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => router.push("/")}
            // className="text-sm text-gray-500 hover:underline"
          >
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};
