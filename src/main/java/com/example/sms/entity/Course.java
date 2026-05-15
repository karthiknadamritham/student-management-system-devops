package com.example.sms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String courseCode;

    @Column(nullable = false, length = 100)
    private String courseName;

    @Column(nullable = false)
    private Integer credits;

    @Column(length = 100)
    private String facultyName;

    @Column(nullable = false, length = 50)
    private String department;

    @Column(nullable = false)
    private Integer semester;

    @Column(length = 255)
    private String syllabusReference;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }
    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public String getSyllabusReference() { return syllabusReference; }
    public void setSyllabusReference(String syllabusReference) { this.syllabusReference = syllabusReference; }
}
