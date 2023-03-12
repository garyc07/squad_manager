#!/bin/bash
set -e

#npm run db:migrate:undo:all && npm run db:migrate

npm run db:migrate:undo:all \
&& npm run db:migrate \
&& npm run db:seed