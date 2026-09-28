package com.candidateflow.report;

import com.candidateflow.entity.Candidate;
import java.util.List;

public class DetailedCandidateReportGenerator implements ReportGenerator {

    @Override
    public String generate(List<Candidate> candidates) {
        return "Detailed Report: Getting full locations and emails for all candidates.";
    }
}