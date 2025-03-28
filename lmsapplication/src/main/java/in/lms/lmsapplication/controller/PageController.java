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
    
    @GetMapping("/superadmin-company-view")
    public String viewSuperadminCompany() {
    	return "view-superadmin-company";
    }

    @GetMapping("/superadmin-company-edit")
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
    
    @GetMapping("/superadmin-lead-view")
    public String viewSuperadminLead() {
    	return "view-superadmin-lead";
    }
    
    @GetMapping("/admin-lead-view")
    public String viewAdminLead() {
        return "view-admin-lead";
    }
    @GetMapping("/user-lead-view")
    public String viewUserLead() {
    	return "view-user-lead";
    }
    
    @GetMapping("/superadmin-lead-edit")
    public String editSuperadminLead() {
        return "edit-superadmin-lead";
    }
    
    @GetMapping("/admin-lead-edit")
    public String editAdminLead() {
        return "edit-admin-lead";
    }
    
    @GetMapping("/user-lead-edit")
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
    
    @GetMapping("/superadmin-comment-edit")
    public String editSuperadminComment() {
    	return "edit-superadmin-comment";
    }
    
    @GetMapping("/admin-comment-edit")
    public String editAdminComment() {
    	return "edit-admin-comment";
    }
    
    @GetMapping("/user-comment-edit")
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

    @GetMapping("/superadmin-comment-view")
    public String viewSuperadminComment() {
        return "view-superadmin-comment";
    }
    
    @GetMapping("/admin-comment-view")
    public String viewAdminComment() {
    	return "view-admin-comment";
    }

    @GetMapping("/user-comment-view")
    public String viewUserComment() {
        return "view-user-comment";
    }
}
