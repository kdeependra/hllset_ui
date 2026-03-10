# API Configuration

Flask configuration file for the HLLSet & Fractal Manifold Notebook API.

## Environment Variables

Create a `.env` file in this directory for custom configuration:

```
FLASK_ENV=development
FLASK_DEBUG=True
HLLSET_PATH=D:\innovation\hllset_manifold
FRACTAL_PATH=D:\innovation\fractal_manifold
PORT=8000
```

## Running the API

```powershell
# Development mode
python app.py

# Or use the provided script
..\start-backend.ps1
```

## API Documentation

See the main README.md for full API documentation.
