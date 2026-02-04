import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppTheme } from "../clients";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AppTheme>
        <Outlet />
      </AppTheme>
    </React.Fragment>
  );
}
