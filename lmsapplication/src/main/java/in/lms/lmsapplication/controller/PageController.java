package in.lms.lmsapplication.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String welcome() {
        return "welcome";
    }
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/superadmin-dashboard")
    public String superadminDashboard() {
        return "superadmin-dashboard";
    }
    
    @GetMapping("/admin-dashboard")
    public String adminDashboard() {
        return "admin-dashboard";
    }
    
    @GetMapping("/user-dashboard")
    public String dashboard() {
        return "user-dashboard";
    }
    
    @GetMapping("/superadmin-companies")
    public String company() {
        return "superadmin-companies";
    }
    
    @GetMapping("/view-superadmin-company")
    public String viewSuperadminCompany() {
    	return "view-superadmin-company";
    }

    @GetMapping("/edit-superadmin-company")
    public String editSuperadminCompany() {
        return "edit-superadmin-company";
    }

    @GetMapping("/superadmin-profile")
    public String superadminProfile() {
        return "superadmin-profile";
    }
    @GetMapping("/admin-profile")
    public String adminProfile() {
        return "admin-profile";
    }
    
    @GetMapping("/user-profile")
    public String userProfile() {
    	return "user-profile";
    }
    
    @GetMapping("/superadmin-admins")
    public String superadminAdmins() {
    	return "superadmin-admins";
    }
    
    @GetMapping("/superadmin-leads")
    public String superadminLeads() {
    	return "superadmin-leads";
    }
    
    @GetMapping("/admin-leads")
    public String adminLeads() {
    	return "admin-leads";
    }
    
    @GetMapping("/user-leads")
    public String userLeads() {
    	return "user-leads";
    }
    
    @GetMapping("/superadmin-assigned-leads")
    public String superadminAssignedLeads() {
    	return "superadmin-assigned-leads";
    }
    
    @GetMapping("/admin-assigned-leads")
    public String adminAssignedLeads() {
    	return "admin-assigned-leads";
    }

    @GetMapping("/user-assigned-leads")
    public String userAssignedLeads() {
        return "user-assigned-leads";
    }
 
    @GetMapping("/superadmin-owned-leads")
    public String superadminOwnedLeads() {
        return "superadmin-owned-leads";
    }

    @GetMapping("/admin-owned-leads")
    public String adminOwnedLeads() {
        return "admin-owned-leads";
    }

    @GetMapping("/user-owned-leads")
    public String userOwnedLeads() {
        return "user-owned-leads";
    }
    
    @GetMapping("/view-superadmin-lead")
    public String viewSuperadminLead() {
    	return "view-superadmin-lead";
    }
    
    @GetMapping("/view-admin-lead")
    public String viewAdminLead() {
        return "view-admin-lead";
    }
    @GetMapping("/view-user-lead")
    public String viewUserLead() {
    	return "view-user-lead";
    }
    
    @GetMapping("/edit-superadmin-lead")
    public String editSuperadminLead() {
        return "edit-superadmin-lead";
    }
    
    @GetMapping("/edit-admin-lead")
    public String editAdminLead() {
        return "edit-admin-lead";
    }
    
    @GetMapping("/edit-user-lead")
    public String editUserLead() {
        return "edit-user-lead";
    }
    
    @GetMapping("/superadmin-comments")
    public String superadminComments() {
    	return "superadmin-comments";
    }
    
    @GetMapping("/admin-comments")
    public String adminComments() {
    	return "admin-comments";
    }
    
    @GetMapping("/user-comments")
    public String userComments() {
    	return "user-comments";
    }
    
    @GetMapping("/edit-superadmin-comment")
    public String editSuperadminComment() {
    	return "edit-superadmin-comment";
    }
    
    @GetMapping("/edit-admin-comment")
    public String editAdminComment() {
    	return "edit-admin-comment";
    }
    
    @GetMapping("/edit-user-comment")
    public String editUserComment() {
    	return "edit-user-comment";
    }
    

    @GetMapping("/superadmin-help")
    public String superadminHelp() {
        return "superadmin-help";
    }

    @GetMapping("/admin-help")
    public String adminHelp() {
        return "admin-help";
    }
    
    @GetMapping("/user-help")
    public String userHelp() {
        return "user-help";
    }

    @GetMapping("/view-superadmin-comment")
    public String viewSuperadminComment() {
        return "view-superadmin-comment";
    }
    
    @GetMapping("/view-admin-comment")
    public String viewAdminComment() {
    	return "view-admin-comment";
    }

    @GetMapping("/view-user-comment")
    public String viewUserComment() {
        return "view-user-comment";
    }
}
