# 🐳 OrbStack Local Docker Setup

This guide shows how to install and use OrbStack as a local Docker engine replacement on macOS. It includes basic installation and usage steps, just like with Docker Desktop — but using OrbStack instead.

## ✅ Requirements

    •	macOS 12 or later (Intel or Apple Silicon)
    •	Homebrew installed

## @⚙️ Installation

Install OrbStack via Homebrew:

```bash
brew install --cask orbstack
```

Or download manually from:
https://orbstack.dev

Launch the app once to complete setup.

## 🔁 Set OrbStack as Docker Context (if needed)

OrbStack usually sets itself as default, but verify with:

```bash
docker context show
```

Expected output:

```bash
orbstack
```

If not:

```basg
docker context use orbstack
```

### 🔨 Build Docker Image

Same as usual:

```bash
docker build -t your-image-name .
```

### ▶️ Run a Container

```bash
docker run -it your-image-name
```

🧪 Test OrbStack Installation

Run the hello-world container:

```bash
docker run hello-world
```

### 📦 Push Image to Registry (Optional)
```bash
docker tag your-image-name your-dockerhub-user/your-image-name

docker push your-dockerhub-user/your-image-name
```
### 🧼 Optional: Migrate from Docker Desktop
```bash
orb migrate docker
```
This copies all your images, volumes, and containers to OrbStack.
