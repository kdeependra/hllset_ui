import { Link } from 'react-router-dom'
import { BookOpen, Home, List } from 'lucide-react'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <BookOpen size={32} />
              <span>HLLSet & Fractal Manifold</span>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/notebooks" className="nav-link">
                <List size={20} />
                <span>Notebooks</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 HLLSet & Fractal Manifold. Advanced Manifold Computing.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
