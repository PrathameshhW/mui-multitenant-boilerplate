# MUI Multi-Client Boilerplate

React + TypeScript + Vite boilerplate for white-label apps with client-specific theme and login layout.

## Stack

- React 19
- TypeScript
- Vite
- MUI 7
- Tailwind CSS 4
- React Hook Form + Zod

## Core Idea

Each client has its own UI implementation:

- `src/clients/<client>/theme/AppTheme.tsx`
- `src/clients/<client>/login/LoginLayout.tsx`

Builds are client-specific.  
Only the selected client's theme/layout files are included in the final bundle.

## Project Structure

```text
src/
  clients/
    default/
      theme/AppTheme.tsx
      login/LoginLayout.tsx
    client1/
      theme/AppTheme.tsx
      login/LoginLayout.tsx
  pages/
  wrappers/
  components/
  config/
```

## Setup

```bash
npm install
```

## Run in Dev

Default client:

```bash
npm run dev
```

Client 1 mode:

```bash
npm run client1
```

## Build

Default build:

```bash
npm run build
```

Client 1 build:

```bash
npm run client1:build
```

## Environment

Use Vite env to select client:

```bash
VITE_ORG_NAME=client1
```

Example file:

- `.env.client1` -> `VITE_ORG_NAME=client1`

## How Client Selection Works

Client selection is resolved at compile time in `vite.config.ts` via one alias:

- `@client` -> `src/clients/<selected>`

Examples:

- `@client/theme/AppTheme`
- `@client/login/LoginLayout`
- `@client/pages/Dashboard`

Because imports are static alias imports (not dynamic template imports), Vite only bundles the selected client modules.

## Important Rule

If selected client files are missing, Vite throws an error during dev/build.  
This is intentional to prevent accidental fallback bundles with wrong branding.

## Add a New Client

1. Create folder:
   - `src/clients/<new-client>/theme/AppTheme.tsx`
   - `src/clients/<new-client>/login/LoginLayout.tsx`
2. Add env file (optional):
   - `.env.<mode>` with `VITE_ORG_NAME=<new-client>`
3. Run:
   - `vite --mode <mode>` for dev
   - `vite build --mode <mode>` for build

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run client1`
- `npm run client1:build`

## Jenkins Deployment

A sample [Jenkinsfile](/Users/prathameshjadhav/Documents/Projects/Personal/mui-setup/Jenkinsfile) is included for automatic multi-tenant builds and Netlify deployments.

### What it does

- Installs dependencies with `npm ci`
- Discovers all tenant folders inside `src/clients`
- Runs all tenant builds in parallel
- Archives `dist/<client>` artifacts in Jenkins
- Deploys each built tenant to its matching Netlify site

### No Manual Client Selection

The pipeline does not ask you to choose `default` or `client1`.

It automatically detects:

- `src/clients/default`
- `src/clients/client1`

If you add another folder like `src/clients/client2`, Jenkins will pick it up automatically on the next run.

### Jenkins Parameters

- `SKIP_DEPLOY`: set to `true` if you only want to build all tenants without deploying

### Required Jenkins Credentials And Env Vars

1. Add a Jenkins secret text credential with id `netlify-auth-token`.
2. Add tenant-specific environment variables in the Jenkins job or globally:
   - `NETLIFY_SITE_ID_DEFAULT=<site-id-for-default>`
   - `NETLIFY_SITE_ID_CLIENT1=<site-id-for-client1>`

For any new tenant, follow the same pattern:

- `NETLIFY_SITE_ID_<CLIENT_NAME_IN_UPPERCASE>=<site-id>`

Example:

- `src/clients/client-two` -> `NETLIFY_SITE_ID_CLIENT_TWO`

### Expected Jenkins Agent Setup

- Node.js + npm
- Internet access to install npm packages and deploy to Netlify

### Cloudflare Note

This pipeline deploys the static frontend to Netlify.

Cloudflare should stay in front as your DNS/proxy layer by pointing each tenant domain to the correct Netlify site. Jenkins does not need to deploy separately to Cloudflare unless you also want it to manage DNS through the Cloudflare API.

### Auto Build Trigger

Opening Jenkins at `http://localhost:8080` does not start a build by itself.

If you want automatic builds, configure one of these in Jenkins:

1. Git webhook trigger on every push
2. Poll SCM on a schedule
3. Manual `Build Now` / `Build with Parameters`

Webhook trigger is the recommended option.
