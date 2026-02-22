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
