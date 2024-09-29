import { Users } from "@/components/users/creationMonths/Index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/")({
  component: Users,
});
