package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.Lead;
import in.lms.lmsapplication.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    public Lead saveLead(Lead lead) {
        return leadRepository.save(lead);
    }

	public Lead findById(Long leadId) {
		return leadRepository.getById(leadId);
	}

    // Additional methods for fetching leads
}
