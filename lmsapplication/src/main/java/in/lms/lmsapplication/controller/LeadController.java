package in.lms.lmsapplication.controller;

import in.lms.lmsapplication.model.Lead;
import in.lms.lmsapplication.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping("/add")
    public String addLead(@RequestBody Lead lead) {
        leadService.saveLead(lead);
        return "redirect:/dashboard";  // Redirect to dashboard or other page
    }

    @GetMapping("/{leadId}")
    public String getLead(@PathVariable Long leadId) {
        Lead lead = leadService.findById(leadId); 
        return "leadDetails"; 
    }
}
