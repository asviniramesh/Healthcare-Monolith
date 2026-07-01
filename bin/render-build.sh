#!/usr/bin/env bash
set -euo pipefail

bundle install
cd frontend
npm install
npm run build
cd ..
cp -R frontend/dist/. public/
bundle exec rails assets:precompile
bundle exec rails db:migrate
