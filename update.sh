#!/bin/bash
set -e

# Update local repository for any possible updates
git fetch
git rebase

# Fetch & Update Trending History
npm run update
git add -A
git commit -m "Automatic update"

# Finally push the changes to the server
git push
