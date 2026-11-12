# VRM Engineering CMS (Sanity Studio)

Admin interface for **Services** and **Projects**. Live at `https://cms.vrmengineering.co.ke`.
The public website reads published content straight from the Sanity API in the browser, so publishing
in the Studio updates the site without a rebuild or deploy hook.

## What you still need to do (the code is ready)

1. **Sanity project:** created, ID `bbl7h451` (dataset `production`). Already set in the Studio config, `web/.env`, `studio/.env` and `render.yaml`.
2. **Put the Project ID in three places**
   - `studio/sanity.config.ts` and `studio/sanity.cli.ts` (replace `YOUR_SANITY_PROJECT_ID`) or set `SANITY_STUDIO_PROJECT_ID` in `studio/.env`
   - the website: `web/.env` as `VITE_SANITY_PROJECT_ID=...` and, on Render, the same variable on the `vrmengineering` service
   - the CMS Render service: `SANITY_STUDIO_PROJECT_ID`
3. **Run it locally**: `cd studio && npm install && npm run dev` (opens <http://localhost:3333>).
4. **Import the current content** (15 services, 16 projects with their photos), once:
   - sanity.io/manage > API > Tokens > add a token with **Editor** access, save it as `SANITY_WRITE_TOKEN` in `studio/.env` (never commit it)
   - `npm run import -- --dry` to preview, then `npm run import`
   - The import skips the old "client" names on purpose: the dataset is public.
5. **CORS** (sanity.io/manage > API > CORS origins): add `https://cms.vrmengineering.co.ke` (with credentials) and `http://localhost:3333`. **Also required for the website to read content** (without this the site silently shows its built-in content): add each address the site runs from, **without** credentials: `http://localhost:3000` (local dev), `https://vrmengineering.co.ke`, `https://www.vrmengineering.co.ke`, and the Render address (`https://vrmengineering.onrender.com`).
6. **Render**: the two services are in `web/render.yaml` (website + `vrmengineering-cms`, root directory `studio`, build `npm ci && npm run build`, publish `dist`, rewrite `/*` to `/index.html`). Add the custom domain `cms.vrmengineering.co.ke` to the CMS service and a DNS **CNAME** `cms` pointing at its `onrender.com` host.
7. **Register the self-hosted Studio**, once it is live: `npm run deploy:external` (from `studio/`).

## What editors manage

- **Services**: name, web address, one-sentence summary, "What's included" list, project stage, icon, display order.
- **Projects**: name, sector, location, year, status, short description, features, scope, residence layout (residential only), cost estimate, gallery images (the first is the thumbnail). Images accept a description for accessibility.

Until a project ID is configured, or if the CMS cannot be reached, the website shows the content in `web/src/data/site.js`.

## Security

No write token is ever used by the website. The dataset is public, so do not store confidential material in it.
