import { createFileRoute } from "@tanstack/react-router";
import ButtonUsage from "../components/ButtonUsage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ButtonUsage />
    </div>
  );
}
