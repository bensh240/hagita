---
name: Deployment workflow
description: How to build and deploy the site to Vercel and push to GitHub
type: reference
---

**Build:** `npm run build` (output in `dist/`)
**Deploy:** `npx vercel deploy --prod --yes ./dist`
**Alias:** `npx vercel alias <deployment-url> hagita.vercel.app`
**Git push:** `git push origin main` → https://github.com/bensh240/hagita

After code changes, user typically wants: build → deploy → push to git.
