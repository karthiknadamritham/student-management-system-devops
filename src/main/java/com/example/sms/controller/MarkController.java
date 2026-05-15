package com.example.sms.controller;

import com.example.sms.entity.Mark;
import com.example.sms.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*")
public class MarkController {

    @Autowired
    private MarkRepository markRepository;

    @GetMapping
    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    @GetMapping("/student/{studentId}")
    public List<Mark> getMarksByStudent(@PathVariable Long studentId) {
        return markRepository.findByStudentId(studentId);
    }

    @PostMapping
    public Mark enterMarks(@RequestBody Mark mark) {
        // Simple grade calculation logic
        double total = (mark.getInternalMarks() != null ? mark.getInternalMarks() : 0) +
                       (mark.getMidTermMarks() != null ? mark.getMidTermMarks() : 0) +
                       (mark.getEndTermMarks() != null ? mark.getEndTermMarks() : 0);
        
        if (total >= 90) mark.setFinalGrade("A+");
        else if (total >= 80) mark.setFinalGrade("A");
        else if (total >= 70) mark.setFinalGrade("B");
        else if (total >= 60) mark.setFinalGrade("C");
        else if (total >= 50) mark.setFinalGrade("D");
        else mark.setFinalGrade("F");
        
        return markRepository.save(mark);
    }
}
