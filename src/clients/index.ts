import { lazy } from "react";
import { envConfig } from "../config/env.config";

const { orgName } = envConfig;

export const AppTheme = orgName
  ? lazy(() => import(`../clients/${orgName}/theme/AppTheme`))
  : lazy(() => import(`../clients/default/theme/AppTheme`));
