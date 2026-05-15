import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Sidebar from './components/Sidebar';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'students') {
        const res = await axios.get(`${API_BASE_URL}/students`);
        setStudents(res.data);
      } else if (activeTab === 'courses') {
        const res = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(res.data);
      } else if (activeTab === 'attendance') {
        const res = await axios.get(`${API_BASE_URL}/attendance`);
        setAttendance(res.data);
      } else if (activeTab === 'marks') {
        const res = await axios.get(`${API_BASE_URL}/marks`);
        setMarks(res.data);
      }
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch ${activeTab}. Make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toString().includes(searchTerm)
  );

  const renderContent = () => {
    if (loading) return <div className="loading-state"><div className="loader"></div><p>Loading {activeTab}...</p></div>;
    if (error) return <div className="error-state"><h3>⚠️ Error</h3><p>{error}</p></div>;

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-grid">
            <div className="glass-card stat-card">
              <h3>Total Enrolled</h3>
              <p className="stat-value">{students.length}</p>
            </div>
            <div className="glass-card stat-card">
              <h3>Active Courses</h3>
              <p className="stat-value">{courses.length}</p>
            </div>
            <div className="glass-card stat-card">
              <h3>Avg Attendance</h3>
              <p className="stat-value">92%</p>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="module-view">
            <div className="dashboard-controls">
              <h2>🎓 Student Module <span className="badge">{filteredStudents.length}</span></h2>
              <input 
                type="text" 
                placeholder="Search students..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-glass">
              <div className="table-inner">
                <table>
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Full Name</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.studentId}>
                        <td className="td-id">#{student.studentId}</td>
                        <td className="td-name">{student.fullName}</td>
                        <td><span className="dept-pill">{student.department}</span></td>
                        <td>Sem {student.semester}</td>
                        <td>
                          <span className={`status-pill ${student.isActive ? 'active' : 'inactive'}`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="module-view">
            <div className="dashboard-controls">
              <h2>📚 Course Catalog <span className="badge">{courses.length}</span></h2>
            </div>
            <div className="table-glass">
              <div className="table-inner">
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                      <th>Faculty</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="td-id">{course.courseCode}</td>
                        <td className="td-name">{course.courseName}</td>
                        <td>{course.credits}</td>
                        <td>{course.facultyName}</td>
                        <td>Sem {course.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="module-view">
            <div className="dashboard-controls">
              <h2>✅ Attendance Module <span className="badge">{attendance.length}</span></h2>
            </div>
            <div className="table-glass">
              <div className="table-inner">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Student ID</th>
                      <th>Course</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map(record => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td className="td-id">#{record.studentId}</td>
                        <td>Course {record.courseId}</td>
                        <td>
                          <span className={`status-pill ${record.status.toLowerCase()}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'marks':
        return (
          <div className="module-view">
            <div className="dashboard-controls">
              <h2>📝 Marks & Examination <span className="badge">{marks.length}</span></h2>
            </div>
            <div className="table-glass">
              <div className="table-inner">
                <table>
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Course</th>
                      <th>Internal</th>
                      <th>Mid Term</th>
                      <th>End Term</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map(mark => (
                      <tr key={mark.id}>
                        <td className="td-id">#{mark.studentId}</td>
                        <td>Course {mark.courseId}</td>
                        <td>{mark.internalMarks}</td>
                        <td>{mark.midTermMarks}</td>
                        <td>{mark.endTermMarks}</td>
                        <td><span className="grade-badge">{mark.finalGrade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
