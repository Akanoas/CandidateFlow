package com.candidateflow.report;

import com.candidateflow.entity.Candidate;
import java.util.List;

public interface ReportGenerator {
    String generate(List<Candidate> candidates);
}