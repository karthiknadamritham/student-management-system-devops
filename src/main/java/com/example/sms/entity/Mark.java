package com.example.sms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "marks")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private Long courseId;

    private Double internalMarks;
    private Double midTermMarks;
    private Double endTermMarks;
    
    @Column(length = 2)
    private String finalGrade;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public Double getInternalMarks() { return internalMarks; }
    public void setInternalMarks(Double internalMarks) { this.internalMarks = internalMarks; }
    public Double getMidTermMarks() { return midTermMarks; }
    public void setMidTermMarks(Double midTermMarks) { this.midTermMarks = midTermMarks; }
    public Double getEndTermMarks() { return endTermMarks; }
    public void setEndTermMarks(Double endTermMarks) { this.endTermMarks = endTermMarks; }
    public String getFinalGrade() { return finalGrade; }
    public void setFinalGrade(String finalGrade) { this.finalGrade = finalGrade; }
}
