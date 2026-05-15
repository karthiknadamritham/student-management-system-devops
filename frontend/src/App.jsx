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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${id}`);
        setStudents(students.filter(s => s.studentId !== id));
      } catch (err) {
        alert('Failed to delete student.');
      }
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = Object.fromEntries(formData.entries());
    try {
      const res = await axios.post(`${API_BASE_URL}/students`, newStudent);
      setStudents([...students, res.data]);
      e.target.reset();
      alert('Student added successfully!');
    } catch (err) {
      alert('Failed to add student. Check if email is unique.');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API_BASE_URL}/courses/${id}`);
        setCourses(courses.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete course.');
      }
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCourse = Object.fromEntries(formData.entries());
    try {
      const res = await axios.post(`${API_BASE_URL}/courses`, newCourse);
      setCourses([...courses, res.data]);
      e.target.reset();
      alert('Course added successfully!');
    } catch (err) {
      alert('Failed to add course.');
    }
  };

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

            <div className="glass-card add-form-card">
              <h3>➕ Add New Student</h3>
              <form onSubmit={handleAddStudent} className="add-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="fullName" placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input name="department" placeholder="e.g. CS" required />
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <input name="semester" type="number" placeholder="1-8" required />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input name="dob" type="date" required />
                </div>
                <button type="submit" className="btn-add">Add Student</button>
              </form>
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
                      <th>Actions</th>
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
                          <button onClick={() => handleDelete(student.studentId)} className="btn-delete">
                            🗑️ Delete
                          </button>
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

            <div className="glass-card add-form-card">
              <h3>➕ Add New Course</h3>
              <form onSubmit={handleAddCourse} className="add-form">
                <div className="form-group">
                  <label>Course Code</label>
                  <input name="courseCode" placeholder="e.g. CS103" required />
                </div>
                <div className="form-group">
                  <label>Course Name</label>
                  <input name="courseName" placeholder="e.g. Algorithms" required />
                </div>
                <div className="form-group">
                  <label>Credits</label>
                  <input name="credits" type="number" placeholder="1-4" required />
                </div>
                <div className="form-group">
                  <label>Faculty</label>
                  <input name="facultyName" placeholder="Dr. XYZ" required />
                </div>
                <div className="form-group">
                  <label>Dept / Sem</label>
                  <div style={{display:'flex', gap: '10px'}}>
                    <input name="department" placeholder="Dept" required style={{flex:1}} />
                    <input name="semester" type="number" placeholder="Sem" required style={{flex:1}} />
                  </div>
                </div>
                <button type="submit" className="btn-add">Add Course</button>
              </form>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="td-id">{course.courseCode}</td>
                        <td className="td-name">{course.courseName}</td>
                        <td>{course.credits}</td>
                        <td>{course.facultyName}</td>
                        <td>
                          <button onClick={() => handleDeleteCourse(course.id)} className="btn-delete">
                            🗑️ Delete
                          </button>
                        </td>
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
