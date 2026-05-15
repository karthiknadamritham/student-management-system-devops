import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      // In Docker Compose, backend will be available via relative path or env var,
      // but locally it's on localhost:8080.
      const response = await axios.get('http://localhost:8080/api/students')
      setStudents(response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching students:", err)
      setError("Failed to fetch students. Is the backend running?")
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Student Management System</h1>
        <p>CI/CD Automated Deployment Project</p>
      </header>
      
      <main className="main-content">
        <h2>Enrolled Students ({students.length})</h2>
        {loading && <p>Loading students...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
