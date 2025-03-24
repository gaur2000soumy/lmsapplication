package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.Lead;
import in.lms.lmsapplication.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
