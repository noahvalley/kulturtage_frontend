#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

DIR="/home/ifimuzaz/www/kulturtage.sh"

echo 'build...'
ln -sfn CONFIG.prod.ts CONFIG.ts
yarn run build
ln -sfn CONFIG.dev.ts CONFIG.ts

echo 'delete old files...'
# shellcheck disable=SC2029
ssh -i "${HOME}/.ssh/kulturtage-sh.pem" ifimuzaz@kulturtage.sh "rm -rfv '${DIR}'"

echo 'upload new files...'
scp -i "${HOME}/.ssh/kulturtage-sh.pem" -r out ifimuzaz@kulturtage.sh:"${DIR}"

echo 'done'
