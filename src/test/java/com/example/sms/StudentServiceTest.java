package com.example.sms;

import com.example.sms.entity.Student;
import com.example.sms.repository.StudentRepository;
import com.example.sms.service.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    public void testGetStudentById() {
        Student mockStudent = new Student();
        mockStudent.setStudentId(1L);
        mockStudent.setFullName("Test Student");
        mockStudent.setEmail("test@example.com");
        mockStudent.setDob(LocalDate.of(2000, 1, 1));
        mockStudent.setDepartment("Computer Science");
        mockStudent.setSemester(1);
        mockStudent.setEnrollmentDate(LocalDate.now());

        when(studentRepository.findById(1L)).thenReturn(Optional.of(mockStudent));

        Student result = studentService.getStudentById(1L);

        assertNotNull(result);
        assertEquals("Test Student", result.getFullName());
    }
}
