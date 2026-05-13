#!/usr/bin/env bash
set -euo pipefail

npx next build
npx next export
npx wrangler pages deploy out --project-name=nickpiscitellicom
