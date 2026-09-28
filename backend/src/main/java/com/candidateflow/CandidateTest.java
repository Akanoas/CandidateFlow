package com.candidateflow;

import com.candidateflow.entity.Candidate;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CandidateTest {

    @Test
    public void testCandidateDataIntegrity() {
        // Arrange
        Candidate testCandidate = new Candidate();

        // Act
        testCandidate.setFirstName("Abdoul");
        testCandidate.setLastName("Akano");
        testCandidate.setEmail("akano@test.com");

        // Assert
        assertEquals("Abdoul", testCandidate.getFirstName());
        assertEquals("Akano", testCandidate.getLastName());
        assertEquals("akano@test.com", testCandidate.getEmail());
    }
}