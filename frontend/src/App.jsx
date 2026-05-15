import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredStudents(students)
    } else {
      const lowercased = searchTerm.toLowerCase()
      setFilteredStudents(
        students.filter(student => 
          student.fullName.toLowerCase().includes(lowercased) ||
          student.department.toLowerCase().includes(lowercased) ||
          student.email.toLowerCase().includes(lowercased)
        )
      )
    }
  }, [searchTerm, students])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students')
      setStudents(response.data)
      setFilteredStudents(response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching students:", err)
      setError("Failed to fetch students. Ensure the backend is running.")
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Management System</h1>
        <p>CI/CD Automated Deployment Project</p>
      </header>
      
      <main className="main-content">
        
        {!loading && !error && (
          <div className="dashboard-controls">
            <h2>
              Enrolled Students 
              <span className="badge">{filteredStudents.length}</span>
            </h2>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by name, email or dept..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading student records...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <h3>Connection Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && filteredStudents.length === 0 && (
          <div className="empty-state">
            <h3>No Students Found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        )}

        {!loading && !error && filteredStudents.length > 0 && (
          <div className="table-glass">
            <div className="table-inner">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Department</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.studentId}>
                      <td className="td-id">#{student.studentId}</td>
                      <td className="td-name">{student.fullName}</td>
                      <td className="td-email">{student.email}</td>
                      <td><span className="dept-pill">{student.department}</span></td>
                      <td>Sem {student.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
