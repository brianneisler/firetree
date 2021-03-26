 #!/usr/bin/env bash
set -e

echo "prettifying..."

prettier --write "**/*.{json,md,yml}"

echo "prettier complete!"
