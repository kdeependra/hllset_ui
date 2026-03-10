import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotebookViewer from './pages/NotebookViewer'
import NotebookList from './pages/NotebookList'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notebooks" element={<NotebookList />} />
          <Route path="/notebook/:project/:notebookName" element={<NotebookViewer />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
