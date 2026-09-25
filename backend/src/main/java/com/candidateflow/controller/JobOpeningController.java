package com.candidateflow.controller;

import com.candidateflow.entity.JobOpening;
import com.candidateflow.repository.JobOpeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs")
public class JobOpeningController {

    @Autowired
    JobOpeningRepository jobOpeningRepository;

    @GetMapping
    public List<JobOpening> getAllJobs() {
        return jobOpeningRepository.findAll();
    }

    @PostMapping
    public JobOpening createJob(@RequestBody JobOpening jobOpening) {
        return jobOpeningRepository.save(jobOpening);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobOpening> updateJob(@PathVariable UUID id, @RequestBody JobOpening jobDetails) {
        JobOpening jobOpening = jobOpeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobOpening.setTitle(jobDetails.getTitle());
        jobOpening.setDepartment(jobDetails.getDepartment());
        jobOpening.setStatus(jobDetails.getStatus());

        JobOpening updatedJob = jobOpeningRepository.save(jobOpening);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable UUID id) {
        JobOpening jobOpening = jobOpeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobOpeningRepository.delete(jobOpening);
        return ResponseEntity.ok().build();
    }
}