package com.candidateflow;

import com.candidateflow.entity.JobOpening;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class JobOpeningTest {

    @Test
    public void testJobOpeningStatusUpdate() {
        // Arrange
        JobOpening testJob = new JobOpening();

        // Act
        testJob.setTitle("Software Engineer");
        testJob.setStatus("OPEN");

        // Assert
        assertEquals("Software Engineer", testJob.getTitle());
        assertEquals("OPEN", testJob.getStatus());
    }
}