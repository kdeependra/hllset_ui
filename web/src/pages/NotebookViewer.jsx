import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Play, Copy, Check, AlertCircle } from 'lucide-react'
import { notebookService } from '../services/api'
import { marked } from 'marked'
import './NotebookViewer.css'

function NotebookViewer() {
  const { project, notebookName } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedCell, setCopiedCell] = useState(null)
  const [notebookData, setNotebookData] = useState(null)

  useEffect(() => {
    loadNotebook()
  }, [project, notebookName])

  const loadNotebook = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await notebookService.getNotebook(project, notebookName)
      setNotebookData({
        name: notebookName,
        project: project,
        projectName: project === 'hllset' ? 'HLLSet Manifold' : 'Fractal Manifold',
        cells: data.cells || [],
        metadata: data.metadata
      })
    } catch (err) {
      setError('Failed to load notebook. Make sure the backend API is running.')
      console.error('Error loading notebook:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyCode = (code, cellIndex) => {
    navigator.clipboard.writeText(code)
    setCopiedCell(cellIndex)
    setTimeout(() => setCopiedCell(null), 2000)
  }

  const getNotebookTitle = () => {
    return notebookName
      .replace('.ipynb', '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const renderMarkdown = (content) => {
    return marked(content, { breaks: true, gfm: true })
  }

  if (loading) {
    return <div className="loading">Loading notebook...</div>
  }

  if (error) {
    return (
      <div className="notebook-viewer">
        <div className="error-container">
          <AlertCircle size={48} />
          <h2>Error Loading Notebook</h2>
          <p>{error}</p>
          <div className="error-actions">
            <Link to="/notebooks" className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Notebooks
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="notebook-viewer">
      <div className="notebook-header">
        <Link to="/notebooks" className="back-link">
          <ArrowLeft size={20} />
          Back to Notebooks
        </Link>
        <div className="notebook-info">
          <div className="notebook-title-section">
            <BookOpen size={28} />
            <div>
              <h1>{getNotebookTitle()}</h1>
              <div className="notebook-meta">
                <span className={`badge ${project}`}>
                  {notebookData?.projectName}
                </span>
                <span className="filename">{notebookName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="notebook-content">
        {notebookData?.cells && notebookData.cells.length > 0 ? (
          <>
            <div className="info-banner">
              <AlertCircle size={20} />
              <div>
                <strong>Notebook Loaded Successfully</strong>
                <p>
                  Viewing notebook from {notebookData?.projectName} project with {notebookData.cells.length} cells.
                </p>
                <p className="notebook-path">
                  Path: <code>D:\innovation\{project === 'hllset' ? 'hllset_manifold' : 'fractal_manifold'}\{notebookName}</code>
                </p>
              </div>
            </div>
          </>
        ) : null}

        {notebookData?.cells && notebookData.cells.length > 0 ? (
          <div className="cells-container">
            {notebookData.cells.map((cell, index) => (
              <div key={index} className={`cell cell-${cell.type}`}>
                {cell.type === 'markdown' ? (
                  <div className="markdown-cell">
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(cell.source) }} />
                  </div>
                ) : cell.type === 'code' ? (
                  <div className="code-cell">
                    <div className="cell-header">
                      <span className="cell-number">In [{cell.execution_count || index + 1}]</span>
                      <div className="cell-actions">
                        <button
                          className="icon-btn"
                          onClick={() => copyCode(cell.source, index)}
                          title="Copy code"
                        >
                          {copiedCell === index ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    <pre className="code-block">
                      <code>{cell.source}</code>
                    </pre>
                    {cell.outputs && cell.outputs.length > 0 && (
                      <div className="cell-output">
                        <div className="output-header">
                          <span className="cell-number">Out [{cell.execution_count || index + 1}]</span>
                        </div>
                        <div className="output-content">
                          {cell.outputs.map((output, outIndex) => (
                            <pre key={outIndex}>{output.text || JSON.stringify(output.data)}</pre>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="placeholder-content">
            <BookOpen size={64} />
            <h3>Notebook Content</h3>
            <p>
              Connect to the backend API to view notebook cells and outputs.
            </p>
            <p className="tech-note">
              The notebook exists at the file path shown above.
              Implement a Python backend using <code>nbformat</code> to parse and display notebook content.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotebookViewer
