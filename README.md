# Church Website

This project contains a simple static website for the church "Кочевник".

## Launching Locally

Use the provided `serve.sh` script to run a local HTTP server. The script requires `python3` to be installed (present by default on most macOS systems).

```bash
chmod +x serve.sh         # one-time setup
./serve.sh               # starts on http://localhost:8000
```
You can specify another port by passing it as an argument:

```bash
./serve.sh 9000
```

The script will automatically open your default browser if the `open` command is available (default on macOS).
