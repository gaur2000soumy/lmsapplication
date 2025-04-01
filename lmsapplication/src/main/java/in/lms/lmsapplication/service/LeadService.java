package in.lms.lmsapplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.model.Lead;
import in.lms.lmsapplication.repository.LeadRepository;

@Service
public class LeadService {
    
    @Autowired
    private LeadRepository leadRepository;

    public Lead addLead(Lead lead) {
        return leadRepository.save(lead);
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Optional<Lead> getLeadById(Long id) {
        return leadRepository.findById(id);
    }

    public Lead updateLead(Long id, Lead leadDetails) {
        return leadRepository.findById(id).map(lead -> {
            lead.setFullName(leadDetails.getFullName());
            lead.setEmail(leadDetails.getEmail());
            lead.setPhoneNo(leadDetails.getPhoneNo());
            lead.setAltPhone(leadDetails.getAltPhone());
            lead.setAddress(leadDetails.getAddress());
            lead.setStatus(leadDetails.getStatus());
            lead.setNote(leadDetails.getNote());
            return leadRepository.save(lead);
        }).orElseThrow(() -> new RuntimeException("Lead not found"));
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
    
    public List<Lead> searchLeads(String query) {
		try {
			Long id = Long.parseLong(query);
			return leadRepository.findByFullNameContainingIgnoreCaseOrLeadId(query, id);
		} catch (NumberFormatException e) {
			return leadRepository.findByFullNameContainingIgnoreCaseOrLeadId(query, null);
		}
    }
}
