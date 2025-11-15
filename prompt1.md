Date: 2025-11-14

Context summary (read carefully):
- Repo to clone: https://github.com/beatschainweb3/beats
- Repo contains three major pieces: beatschain app (Next/Vercel), chrome extension (migrated from a zip called "migration"), and mcp-server (Express/Node backend).
- Extension previously live on Chrome Web Store; app was live on Vercel.
- We had recent deployment issues on Railway for the MCP server (logs show missing envs, ethers module mismatch, uploads dir, port issues). The MCP must run in a Docker container on Railway.
- No Firebase. Authentication should be Google OAuth2 (id token exchange) and a wallet "under the hood" handled by thirdweb or equivalent. Fix Google auth + wallet integration.
- We need to identify missing gaps across the repo, using any MARKDOWN files dated in the last 3 days (search repo for .md files with date stamps or commit history).
- Add or map a radio-submission workflow: user uploads audio via Chrome extension → extension sends to MCP → MCP pins to IPFS or Web3.Storage, triggers Livepeer ingestion for streaming/transcoding, stores metadata in Supabase, creates record and returns status to extension.
- Implement or design "split-sheets" PDF signing workflow. We must be able to produce a filled PDF from a template, collect signatures and cryptographic proof (preferably a wallet signature attached to the PDF metadata or a signed hash), and store signed results in Supabase/IPFS.
- Fix Railway deployment issues for the mcp-server (we discussed earlier: use Dockerfile, package-lock.json, correct Node version, ensure environment variables are exposed and not quoted or trailing spaces, ensure uploads folder/permissions, resolve ethers v5/v6 mismatch).
- We want to deploy agents (e.g., automated tasks, GitHub Actions, or self-hosted bots) to help with tests, builds, routine fixes, and monitoring. Propose practical, deployable agent architecture.

Your mission:
1. Clone the repo into the current Codespace workspace.
2. Run a complete static & dynamic analysis to identify missing files, dependency mismatches, broken imports, env var usage, and runtime errors.
3. Using the last 3 days of .md files (or commits) in the repo, extract requirements, TODOs, and migration notes, and use them to reconcile intended system state vs actual code.
4. Prepare a prioritized list of missing gaps and bugs with clear reproduction steps and one-line severity tags (P0,P1,P2).
5. Create and apply minimal, safe fixes for the MCP server to make it runnable in a Docker container (buildable locally), including:
   - Ensure package-lock.json exists (or run npm ci).
   - Ensure Node is set to 20 in package.json engines (or Dockerfile).
   - Create or fix Dockerfile (use node:20-alpine, COPY package*.json, RUN npm ci, COPY ., CMD npm start).
   - Ensure uploads/ exists or create at start time and set proper permissions.
   - Fix ethers mismatch: if code uses ethers v5 syntax, install ethers@^5.x; if it is v6, update imports/usage accordingly. Prefer the smallest change (install v5) unless other code demands v6.
   - Ensure server reads envs correctly at runtime (no quoting or trailing spaces).
   - Remove hard-coded PORT env in Railway; ensure server uses process.env.PORT at runtime. For Docker use EXPOSE 8080; CMD uses process.env.PORT fallback.
   - Add a small health check endpoint if missing.
   - Add graceful error logging and do NOT exit the container on unhandledRejection/uncaughtException — log and exit with non-zero to let orchestrator restart.
6. Fix tokenExchange/Google auth flow:
   - Locate tokenExchange.js (or equivalent).
   - Use `google-auth-library` to validate tokens on server-side using CLIENT_ID and optionally CLIENT_SECRET.
   - Ensure envs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET exist and are read. If code currently expects only CLIENT_ID, add server-side verification logic that calls `oauth2Client.verifyIdToken()` and create a session cookie.
   - For wallet-under-the-hood behavior: implement an approach and code sketch to **associate a wallet with a Google-authenticated user**. Offer two secure options (custodial & non-custodial) and implement the safer minimal viable option:
     Option A (recommended, safer MVP): Let users sign a nonce with a client-side wallet when available (extension can prompt user), else create a custodial wallet server-side using thirdweb's server key and store encrypted key material in Supabase (service role) — document tradeoffs and implement only if user authorizes custodial model.
     Option B (non-custodial preferred long-term): Integrate Web3Auth or require extension to manage private keys; server only verifies wallet signatures.
   - Provide code to create or link a wallet address after Google auth (either store an address, or create wallet via thirdweb SDK).
7. Radio submission flow (high level design + code hooks):
   - Chrome extension: Add UI for radio submission, collect metadata (title, artist, genre, tags), file picker, and optional artwork. Implement background task to chunk upload or use tus-js-client / web3.storage client.
   - Extension -> MCP: create `/api/upload` route (multipart form) that uses multer with uploads folder or streams to Web3.Storage. Return IPFS CID and Livepeer job id.
   - MCP -> Livepeer: implement route to create an upload/asset and start ingest. Store Livepeer asset id, playback id, and status in Supabase `radio_submissions` table with fields: id, user_id, cid, livepeer_asset_id, title, artist, metadata JSON, created_at, status.
   - MCP should trigger webhook/callback to extension when processing finished (use pushMessage via extension port or pollable status).
   - Provide SQL migration for Supabase (CREATE TABLE radio_submissions (...)) and sample REST API endpoints and minimal security (JWT-based sessions from Google id token exchange).
8. Split-sheets signing flow:
   - Provide a template PDF (or locate existing template in repo /migration zip). If none found, create a canonical template as HTML->PDF or a fillable PDF.
   - Implement server endpoint `/api/splits/generate` that accepts JSON (contributors array + splits + metadata) and generates a PDF using `pdfkit` or `puppeteer` (HTML -> PDF).
   - To collect a signature: Option A (recommended for web3): compute SHA256 of the PDF (or canonical JSON) and request a wallet signature (user signs raw bytes / hash via extension) -> attach signature + signer address + signature timestamp to the PDF metadata and store CID in IPFS and record in Supabase. Option B: integrate with a third-party e-sign (DocuSign/HelloSign) — list steps and tradeoffs.
   - Provide example endpoint `/api/splits/sign` to verify an incoming Ethereum signature using ethers (compatible version).
   - Provide code to embed the signature back into the PDF metadata or include a small JSON "signed_manifest" stored alongside the PDF on IPFS.
9. Thirdweb integration:
   - Identify where thirdweb is used. If code expects `ethers`, ensure compatibility. If thirdweb server-side SDK requires `THIRDWEB_SECRET_KEY`, `THIRDWEB_CLIENT_ID`, ensure these envs exist and are used only server-side.
   - If thirdweb is used to mint, sign, or run relayer actions, ensure a secure server-side relayer is present, and the secret key is stored in Railway as a secret. Mention the option to use thirdweb relayer or a custom relayer.
10. Railway fixes summary (automate as part of repo fixes):
    - Use Dockerfile and Docker-based deploy settings.
    - Ensure package-lock.json included.
    - Ensure NODE_VERSION set to 20 for builds and in Docker.
    - Ensure uploads dir created at container start or on build.
    - Ensure all required env variables exist and are subscribed to service (list them and check for empty/quoted values).
    - Resolve ethers version mismatch.
    - Add health endpoints and better logging.
11. Agent deployment and automation:
    - Propose a small set of agents/workers:
      * CI agent (GitHub Actions): lint, test, build Docker image, run security scan (npm audit), build and run integration tests (start mcp-server in container, run basic smoke tests).
      * Monitoring agent: small health-checker that pings /health on a schedule and posts to Slack or GitHub issues.
      * Worker (background) agent: process livepeer callbacks and handle file pinning to IPFS (use BullMQ or similar with Redis for queue). Show a docker-compose skeleton.
    - Provide GitHub Actions workflow templates for CI + Docker build + push to registry, and optional Railway Deploy via CLI.
12. Deliverables (what I expect from you, the agent):
    - A clear `report.md` in repo root listing:
      * All missing files and routes (exact file paths), severity, and recommended fix.
      * The 3-day .md files summary and extracted TODOs.
      * Exact env variables required for each service (mcp-server, extension, app) and which ones are missing or mismatched.
      * A prioritized P0/P1/P2 bug list with reproduction steps and exact commands to run locally and in Codespace to reproduce.
      * A patchset (git branch `fix/mcp-docker-2025-11-14`) containing: Dockerfile, package-lock.json (if generated), minimal code fixes to get mcp-server running in Docker (uploads folder creation, ethers fix, tokenExchange fix), SQL migration for `radio_submissions`, example `split-sheet` generator and verifier endpoints (stubs ok), and Github Action CI workflow.
    - Create the branch and open a PR (`fix/mcp-docker-2025-11-14`) with the patch. In the PR description include the full `report.md` contents and summary.
    - Run `npm ci` and `npm start` inside Codespace/container and paste the first 200 lines of console output into the PR as a CI artifact or comment.
    - Run basic smoke tests:
      * GET / -> returns status ok
      * GET /healthz -> returns ok
      * POST /api/pin (with small JSON) -> returns mock or real ipfs CID
      * POST /api/token-exchange (with a sample dummy token) -> show how to test or return proper error
      * POST /api/upload -> simulate file upload (use curl multipart or node script)
    - A short technical note `decision_log.md` explaining decisions made for:
      * ethers v5 vs v6 choice
      * custodial vs non-custodial wallet approach for Google Auth
      * split-sheet signing approach
      * why Docker vs Nixpacks for Railway
13. Permissions & operational notes:
    - Do NOT commit any secrets (API keys, client secrets, private keys). If needed, create placeholder `.env.example`.
    - If you need to run commands that require network access, run only safe commands like `npm ci` and `docker build` (assume Docker available).
    - When you need extra input (for example, whether we accept custodial wallets), open a GitHub issue titled `decision: custodial-wallet-yes-or-no` and assign it to me.
14. Useful helper commands to run immediately in Codespace:
    - Clone & inspect:
      git clone https://github.com/beatschainweb3/beats .
      git status
      git checkout -b fix/mcp-docker-2025-11-14
    - Install & lint:
      npm ci
      npm run lint || echo "no linter"
      node -v
      npm -v
    - Find suspects:
      grep -RIn "SUPABASE_URL" src || true
      grep -RIn "WEB3STORAGE_TOKEN" -n || true
      grep -RIn "GOOGLE_CLIENT" -n || true
      grep -RIn "tokenExchange" -n || true
      jq -r '.dependencies' package.json || cat package.json
      find . -type f -name "*.md" -mtime -3 -print
      git log --since="3 days ago" --pretty=oneline --name-only | sed -n '1,200p'
    - Run server:
      npm start
    - Run tests (if exist):
      npm test
15. Final product (what I will post back here after you finish):
    - Link to opened PR
    - `report.md` content pasted here
    - `decision_log.md`
    - The logs output from `npm start` (first 200 lines)
    - A checklist of what remains and next steps for production-deployment (Railway config, secrets to set, Chrome Store steps, Vercel redeploy)
    - A prioritized roadmap to complete full features (radio-submission, split-sheet signing with on-chain proof, full thirdweb integration)

If anything in the repo contradicts this plan or you discover additional constraints (eg. private submodules, private NPM packages, corporate policy), report immediately with exact error and proposed mitigation.

Begin now. Produce the branch, the PR skeleton, the `report.md`, and paste the first logs and initial findings into the PR and into this Codespace chat.