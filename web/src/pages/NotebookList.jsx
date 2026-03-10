import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Search, Filter, X } from 'lucide-react'
import { notebookService } from '../services/api'
import './NotebookList.css'

function NotebookList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notebooks, setNotebooks] = useState({ hllset: [], fractal: [] })
  const [filteredNotebooks, setFilteredNotebooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(searchParams.get('project') || 'all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    loadNotebooks()
  }, [])

  useEffect(() => {
    filterNotebooks()
  }, [notebooks, searchQuery, selectedProject, selectedCategory])

  const loadNotebooks = async () => {
    try {
      setLoading(true)
      const data = await notebookService.getAllNotebooks()
      setNotebooks(data)
    } catch (error) {
      console.error('Error loading notebooks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterNotebooks = () => {
    let allNotebooks = [
      ...notebooks.hllset.map(nb => ({ ...nb, project: 'hllset', projectName: 'HLLSet Manifold' })),
      ...notebooks.fractal.map(nb => ({ ...nb, project: 'fractal', projectName: 'Fractal Manifold' }))
    ]

    // Filter by project
    if (selectedProject !== 'all') {
      allNotebooks = allNotebooks.filter(nb => nb.project === selectedProject)
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      allNotebooks = allNotebooks.filter(nb => nb.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      allNotebooks = allNotebooks.filter(nb =>
        nb.title.toLowerCase().includes(query) ||
        nb.category.toLowerCase().includes(query) ||
        nb.name.toLowerCase().includes(query)
      )
    }

    setFilteredNotebooks(allNotebooks)
  }

  const getCategories = () => {
    const allNotebooks = [
      ...notebooks.hllset.map(nb => ({ ...nb, project: 'hllset' })),
      ...notebooks.fractal.map(nb => ({ ...nb, project: 'fractal' }))
    ]
    const categories = [...new Set(allNotebooks.map(nb => nb.category))]
    return categories.sort()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedProject('all')
    setSelectedCategory('all')
    setSearchParams({})
  }

  if (loading) {
    return <div className="loading">Loading notebooks...</div>
  }

  const categories = getCategories()
  const hasActiveFilters = searchQuery || selectedProject !== 'all' || selectedCategory !== 'all'

  return (
    <div className="notebook-list">
      <div className="list-header">
        <div className="list-title">
          <BookOpen size={32} />
          <div>
            <h1>All Notebooks</h1>
            <p className="subtitle">
              {filteredNotebooks.length} notebook{filteredNotebooks.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search notebooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>
            <Filter size={16} />
            Project
          </label>
          <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="all">All Projects</option>
            <option value="hllset">HLLSet Manifold</option>
            <option value="fractal">Fractal Manifold</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button className="btn-clear" onClick={clearFilters}>
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>

      {filteredNotebooks.length === 0 ? (
        <div className="no-results">
          <p>No notebooks found matching your criteria.</p>
        </div>
      ) : (
        <div className="notebook-grid">
          {filteredNotebooks.map((notebook, index) => (
            <Link
              key={`${notebook.project}-${notebook.name}-${index}`}
              to={`/notebook/${notebook.project}/${notebook.name}`}
              className="notebook-card"
            >
              <div className="card-header">
                <span className={`badge ${notebook.project}`}>
                  {notebook.projectName}
                </span>
                <span className="category-badge">{notebook.category}</span>
              </div>
              <h3 className="card-title">{notebook.title}</h3>
              <p className="card-filename">{notebook.name}</p>
              <div className="card-footer">
                <span className="view-link">
                  View Notebook →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotebookList
