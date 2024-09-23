import { CreationMonths } from "@/components/users/creationMonths/CreationMonths";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/creation-months")({
  component: CreationMonths,
});
