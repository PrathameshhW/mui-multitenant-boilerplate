import { lazy } from "react";
import { envConfig } from "../config/env.config";

const { orgName } = envConfig;

const client = orgName?.trim() || "default";

export const AppTheme = lazy(() =>
  import(`../clients/${client}/theme/AppTheme.tsx`).catch(
    () => import("../clients/default/theme/AppTheme.tsx")
  )
);

export const LoginLayout = lazy(() =>
  import(`../clients/${client}/login/LoginLayout.tsx`).catch(
    () => import("../clients/default/login/LoginLayout.tsx")
  )
);
