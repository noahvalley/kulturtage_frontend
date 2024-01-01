#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

echo 'link dev config...'
ln -sfn CONFIG.dev.ts CONFIG.ts

echo 'done'
