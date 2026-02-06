// 🔴 Use relative paths only, dont use absolute paths it causes issues while building the application

import { lazy } from "react";
import { envConfig } from "../config/env.config";

const { orgName } = envConfig;

export const AppTheme = orgName
  ? lazy(() => import(`../clients/${orgName}/theme/AppTheme`))
  : lazy(() => import(`../clients/default/theme/AppTheme`));

export const LoginLayout = orgName
  ? lazy(() => import(`../clients/${orgName}/login/LoginLayout`))
  : lazy(() => import(`../clients/default/login/LoginLayout`));
