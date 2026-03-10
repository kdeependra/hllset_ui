from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import nbformat
from pathlib import Path
import json
import os
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)

# Paths to notebook directories
HLLSET_PATH = Path(r'D:\innovation\hllset_manifold')
FRACTAL_PATH = Path(r'D:\innovation\fractal_manifold')

PROJECT_PATHS = {
    'hllset': HLLSET_PATH,
    'fractal': FRACTAL_PATH
}

def parse_notebook(notebook_path):
    """Parse a Jupyter notebook and extract cells"""
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            nb = nbformat.read(f, as_version=4)
        
        cells = []
        for cell in nb.cells:
            cell_data = {
                'type': cell.cell_type,
                'source': cell.source,
            }
            
            if cell.cell_type == 'code':
                outputs = []
                if hasattr(cell, 'outputs'):
                    for output in cell.outputs:
                        output_data = {}
                        if hasattr(output, 'text'):
                            output_data['text'] = output.text
                        elif hasattr(output, 'data'):
                            output_data['data'] = str(output.data)
                        outputs.append(output_data)
                cell_data['outputs'] = outputs
                cell_data['execution_count'] = cell.execution_count
            
            cells.append(cell_data)
        
        return {
            'cells': cells,
            'metadata': nb.metadata
        }
    except Exception as e:
        raise Exception(f"Error parsing notebook: {str(e)}")

@app.route('/api/notebooks/<project>/<path:notebook_name>')
def get_notebook(project, notebook_name):
    """Get a specific notebook's content"""
    try:
        # Decode URL-encoded path
        notebook_name = unquote(notebook_name)
        
        if project not in PROJECT_PATHS:
            return jsonify({'error': 'Invalid project'}), 404
        
        # Try direct path first
        notebook_path = PROJECT_PATHS[project] / notebook_name
        
        if not notebook_path.exists():
            return jsonify({'error': f'Notebook not found: {notebook_name}'}), 404
        
        notebook_data = parse_notebook(notebook_path)
        notebook_data['name'] = notebook_name
        notebook_data['project'] = project
        
        return jsonify(notebook_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notebooks/<project>')
def list_notebooks(project):
    """List all notebooks in a project"""
    try:
        if project not in PROJECT_PATHS:
            return jsonify({'error': 'Invalid project'}), 404
        
        project_path = PROJECT_PATHS[project]
        notebooks = []
        
        # Search for .ipynb files recursively
        for notebook_path in project_path.rglob('*.ipynb'):
            if '.ipynb_checkpoints' not in str(notebook_path):
                relative_path = notebook_path.relative_to(project_path)
                notebooks.append({
                    'name': notebook_path.name,
                    'path': str(relative_path),
                    'size': notebook_path.stat().st_size
                })
        
        return jsonify(notebooks)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notebooks')
def list_all_notebooks():
    """List all notebooks from both projects"""
    try:
        all_notebooks = {}
        
        for project_name, project_path in PROJECT_PATHS.items():
            notebooks = []
            for notebook_path in project_path.rglob('*.ipynb'):
                if '.ipynb_checkpoints' not in str(notebook_path):
                    relative_path = notebook_path.relative_to(project_path)
                    notebooks.append({
                        'name': notebook_path.name,
                        'path': str(relative_path),
                        'size': notebook_path.stat().st_size
                    })
            all_notebooks[project_name] = notebooks
        
        return jsonify(all_notebooks)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'hllset_path': str(HLLSET_PATH),
        'fractal_path': str(FRACTAL_PATH),
        'hllset_exists': HLLSET_PATH.exists(),
        'fractal_exists': FRACTAL_PATH.exists()
    })

@app.route('/')
def index():
    """Root endpoint"""
    return jsonify({
        'message': 'HLLSet & Fractal Manifold Notebook API',
        'endpoints': {
            '/api/health': 'Health check',
            '/api/notebooks': 'List all notebooks',
            '/api/notebooks/<project>': 'List notebooks for a project',
            '/api/notebooks/<project>/<notebook_name>': 'Get notebook content'
        }
    })

if __name__ == '__main__':
    print("Starting HLLSet & Fractal Manifold Notebook API...")
    print(f"HLLSet Path: {HLLSET_PATH}")
    print(f"Fractal Path: {FRACTAL_PATH}")
    app.run(debug=True, host='0.0.0.0', port=8000)
