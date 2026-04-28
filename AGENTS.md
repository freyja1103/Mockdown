# AGENTS.md

## Project Notes

- This project uses Hono with `@hono/inertia` and generated page typings.
- Inertia page components should import `PageProps` from `app/pages.gen.ts` and type props as `PageProps<'PageName'>`.
- Do not hand-write page prop types when the props come from `c.render(...)`; let the generated `PageProps` infer them from `app/server.ts`.
- Values that depend on server-side routing, environment, deployment config, or other server-owned state should be passed from `app/server.ts` through Inertia props. Do not duplicate those values as client-side defaults in page components, child components, or fetch helpers.
