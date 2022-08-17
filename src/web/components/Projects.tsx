import ProjectList from './ProjectList'
import Invoice from "./Invoice"
import '../style/Projects.css'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ReadMe from './ReadMe'

function Projects() {
  const navigate = useNavigate()

  return (
    <>
      <div className="Projects__header" onClick={() => navigate('/')}>
        Invoicely
      </div>
      <div className="Projects__content">
        <Routes>
          <Route path="/readme" element={<ReadMe />} />
          <Route path="/" element={<ProjectList />} />
          <Route path="/invoices/:id" element={<Invoice />} />
        </Routes>
      </div>
    </>
  )
}

export default Projects
