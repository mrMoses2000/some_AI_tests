#!/usr/bin/env bash
# Simple script to run the church site locally on macOS
# Usage: ./serve.sh [port]
# Default port is 8000

set -e

PORT="${1:-8000}"

# Navigate to the directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required but not found. Install it via Homebrew or Xcode tools." >&2
  exit 1
fi

# Start server and open browser
python3 -m http.server "$PORT" &
SERVER_PID=$!
# Allow the server a moment to start
sleep 1
if command -v open >/dev/null 2>&1; then
  open "http://localhost:$PORT/index.html"
fi
wait $SERVER_PID
