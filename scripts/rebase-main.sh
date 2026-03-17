#!/usr/bin/env bash
set -euo pipefail

REMOTE="${1:-origin}"
BASE_BRANCH="${2:-main}"

echo "[info] Fetching $REMOTE/$BASE_BRANCH..."
git fetch "$REMOTE" "$BASE_BRANCH"

echo "[info] Rebasing current branch on top of $REMOTE/$BASE_BRANCH"
if ! git rebase "$REMOTE/$BASE_BRANCH"; then
  echo
  echo "[warn] Rebase stopped because of conflicts."
  echo "Resolve files with conflicts, then run:"
  echo "  git add <resolved-files>"
  echo "  git rebase --continue"
  echo
  echo "To abort the rebase:"
  echo "  git rebase --abort"
  exit 1
fi

echo "[ok] Rebase completed."
echo "[next] Push with: git push --force-with-lease"
