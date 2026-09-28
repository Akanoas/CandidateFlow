package com.candidateflow.report;

import com.candidateflow.entity.Candidate;
import java.util.List;

public class PipelineSummaryReportGenerator implements ReportGenerator {

    @Override
    public String generate(List<Candidate> candidates) {
        return "Summary Report: We have " + candidates.size() + " candidates.";
    }
}