import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Notebook data structure
const NOTEBOOKS = {
  hllset_manifold: [
    { name: 'workbook_db_ingestion.ipynb', path: 'workbook_db_ingestion.ipynb', title: 'Database Ingestion Workbook', category: 'Advanced' },
    { name: 'zai.ipynb', path: 'zai.ipynb', title: 'ZAI Implementation', category: 'Advanced' },
    { name: '01_quick_start.ipynb', path: 'notebooks/01_quick_start.ipynb', title: '01: Quick Start', category: 'Quick Start' },
    { name: '02_n_token_algorithm.ipynb', path: 'notebooks/02_n_token_algorithm.ipynb', title: '02: N-Token Algorithm', category: 'Core Algorithms' },
    { name: '03_adjacency_matrix.ipynb', path: 'notebooks/03_adjacency_matrix.ipynb', title: '03: Adjacency Matrix', category: 'Core Algorithms' },
    { name: '04_kernel_entanglement.ipynb', path: 'notebooks/04_kernel_entanglement.ipynb', title: '04: Kernel Entanglement', category: 'Core Algorithms' },
    { name: '05_manifold_os.ipynb', path: 'notebooks/05_manifold_os.ipynb', title: '05: Manifold OS', category: 'Core Algorithms' },
    { name: '06_lattice_evolution.ipynb', path: 'notebooks/06_lattice_evolution.ipynb', title: '06: Lattice Evolution', category: 'Core Algorithms' },
    { name: '07_contextual_selection.ipynb', path: 'notebooks/07_contextual_selection.ipynb', title: '07: Contextual Selection', category: 'Core Algorithms' },
    { name: '08_priority_weighting.ipynb', path: 'notebooks/08_priority_weighting.ipynb', title: '08: Priority Weighting', category: 'Core Algorithms' },
    { name: '09_senses_and_signs.ipynb', path: 'notebooks/09_senses_and_signs.ipynb', title: '09: Senses and Signs', category: 'Core Algorithms' },
    { name: '10_lattice_evolution.ipynb', path: 'notebooks/10_lattice_evolution.ipynb', title: '10: Lattice Evolution Advanced', category: 'Advanced' },
    { name: 'demo_analyst_workflow.ipynb', path: 'notebooks/demo_analyst_workflow.ipynb', title: 'Demo: Analyst Workflow', category: 'Demos' },
    { name: 'demo_graph_visualization.ipynb', path: 'notebooks/demo_graph_visualization.ipynb', title: 'Demo: Graph Visualization', category: 'Demos' },
    { name: 'demo_unified_storage.ipynb', path: 'notebooks/demo_unified_storage.ipynb', title: 'Demo: Unified Storage', category: 'Demos' },
    { name: 'entanglement_subgraph_demo.ipynb', path: 'notebooks/entanglement_subgraph_demo.ipynb', title: 'Demo: Entanglement Subgraph', category: 'Demos' },
    { name: 'multi_seed_disambiguation_demo.ipynb', path: 'notebooks/multi_seed_disambiguation_demo.ipynb', title: 'Demo: Multi-Seed Disambiguation', category: 'Demos' },
    { name: 'nedge_entanglement_demo.ipynb', path: 'notebooks/nedge_entanglement_demo.ipynb', title: 'Demo: N-Edge Entanglement', category: 'Demos' }
  ],
  fractal_manifold: [
    { name: '00_playground.ipynb', path: '00_playground.ipynb', title: '00: Playground', category: 'Quick Start' },
    { name: '0_hllset.ipynb', path: '0_hllset.ipynb', title: '0: HLLSet Basics', category: 'Foundations' },
    { name: '1._pycuda.ipynb', path: '1._pycuda.ipynb', title: '1: PyCUDA Integration', category: 'Foundations' },
    { name: '7_mf_algebra.ipynb', path: '7_mf_algebra.ipynb', title: '7: Manifold Algebra', category: 'Foundations' },
    { name: '8_mf_os.ipynb', path: '8_mf_os.ipynb', title: '8: Manifold OS', category: 'Foundations' },
    { name: '9_inflected_id.ipynb', path: '9_inflected_id.ipynb', title: '9: Inflected Identity', category: 'Foundations' },
    { name: '11_perceptron_swarm.ipynb', path: '11_perceptron_swarm.ipynb', title: '11: Perceptron Swarm', category: 'Perceptron Swarm' },
    { name: '12_swarm_forecast.ipynb', path: '12_swarm_forecast.ipynb', title: '12: Swarm Forecasting', category: 'Forecasting' },
    { name: '13_swarm_forecast_sigreg.ipynb', path: '13_swarm_forecast_sigreg.ipynb', title: '13: Swarm Forecast with Sigmoid Regression', category: 'Forecasting' },
    { name: '14_hllset_jepa_comparison.ipynb', path: '14_hllset_jepa_comparison.ipynb', title: '14: HLLSet vs JEPA Comparison', category: 'Comparisons' },
    { name: 'demo_analyst_workflow.ipynb', path: 'demo_analyst_workflow.ipynb', title: 'Demo: Analyst Workflow', category: 'Demos' },
    { name: 'demo_mcp_agent.ipynb', path: 'demo_mcp_agent.ipynb', title: 'Demo: MCP Agent', category: 'Demos' }
  ]
}

export const notebookService = {
  // Get all notebooks
  getAllNotebooks() {
    return Promise.resolve({
      hllset: NOTEBOOKS.hllset_manifold,
      fractal: NOTEBOOKS.fractal_manifold
    })
  },

  // Get notebooks by project
  getNotebooksByProject(project) {
    const projectKey = project === 'hllset' ? 'hllset_manifold' : 'fractal_manifold'
    return Promise.resolve(NOTEBOOKS[projectKey] || [])
  },

  // Get notebook content
  async getNotebook(project, notebookName) {
    try {
      // Map project names to match backend expectations
      const projectPath = project === 'hllset' ? 'hllset' : 'fractal'
      
      // Find the full path for this notebook
      const projectKey = project === 'hllset' ? 'hllset_manifold' : 'fractal_manifold'
      const notebook = NOTEBOOKS[projectKey].find(nb => nb.name === notebookName)
      const fullPath = notebook?.path || notebookName
      
      const response = await api.get(`/api/notebooks/${projectPath}/${encodeURIComponent(fullPath)}`)
      return response.data
    } catch (error) {
      console.error('Error fetching notebook:', error)
      throw error
    }
  },

  // Execute notebook cell
  async executeCell(project, notebookName, cellIndex, code) {
    try {
      const response = await api.post(`/api/notebooks/${project}/${notebookName}/execute`, {
        cellIndex,
        code
      })
      return response.data
    } catch (error) {
      console.error('Error executing cell:', error)
      throw error
    }
  },

  // Search notebooks
  searchNotebooks(query) {
    const allNotebooks = [
      ...NOTEBOOKS.hllset_manifold.map(nb => ({ ...nb, project: 'hllset' })),
      ...NOTEBOOKS.fractal_manifold.map(nb => ({ ...nb, project: 'fractal' }))
    ]
    
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(
      allNotebooks.filter(nb => 
        nb.title.toLowerCase().includes(lowerQuery) ||
        nb.category.toLowerCase().includes(lowerQuery) ||
        nb.name.toLowerCase().includes(lowerQuery)
      )
    )
  }
}

export default api
