import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, GitBranch, Layers } from 'lucide-react'
import './Home.css'

function Home() {
  const stats = {
    hllset: {
      total: 18,
      categories: ['Quick Start', 'Core Algorithms', 'Demos', 'Advanced']
    },
    fractal: {
      total: 12,
      categories: ['Foundations', 'Perceptron Swarm', 'Forecasting', 'Comparisons']
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            HLLSet & Fractal Manifold
            <span className="gradient-text"> Notebooks</span>
          </h1>
          <p className="hero-subtitle">
            Explore advanced manifold computing, kernel entanglement, and fractal algebra
            through interactive Jupyter notebooks
          </p>
          <Link to="/notebooks" className="btn btn-primary btn-large">
            <BookOpen size={20} />
            Browse All Notebooks
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon hllset">
              <Layers size={32} />
            </div>
            <h3>HLLSet Manifold</h3>
            <p>
              Explore n-token algorithms, adjacency matrices, kernel entanglement,
              and manifold OS concepts
            </p>
            <div className="feature-stats">
              <span className="stat-number">{stats.hllset.total}</span>
              <span className="stat-label">notebooks</span>
            </div>
            <Link to="/notebooks?project=hllset" className="feature-link">
              View HLLSet Notebooks <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon fractal">
              <GitBranch size={32} />
            </div>
            <h3>Fractal Manifold</h3>
            <p>
              Deep dive into fractal algebra, perceptron swarms, forecasting,
              and inflected identities
            </p>
            <div className="feature-stats">
              <span className="stat-number">{stats.fractal.total}</span>
              <span className="stat-label">notebooks</span>
            </div>
            <Link to="/notebooks?project=fractal" className="feature-link">
              View Fractal Notebooks <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Notebook Categories</h2>
        <div className="category-grid">
          <div className="category-item">
            <h4>🚀 Quick Start</h4>
            <p>Get started with basic concepts and workflows</p>
          </div>
          <div className="category-item">
            <h4>🧮 Algorithms</h4>
            <p>Core computational algorithms and implementations</p>
          </div>
          <div className="category-item">
            <h4>🎯 Demonstrations</h4>
            <p>Practical examples and use cases</p>
          </div>
          <div className="category-item">
            <h4>🔬 Advanced Topics</h4>
            <p>Deep dives into complex manifold concepts</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
