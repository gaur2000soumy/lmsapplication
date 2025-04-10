package in.lms.lmsapplication.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leadId;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String phoneNo;
    private String altPhone;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String status;
    private String note;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnoreProperties({"phoneNumber", "fullName","role", "password"})
    private LoginUser ownerUser;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    @JsonIgnoreProperties({"phoneNumber", "fullName","role", "password"})
    private LoginUser assignedUser;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updationDate;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({"companyAddress", "companyCinNumber","companyContactPersonName", "companyContactPersonEmail","companyContactPersonPhone"})
    private Company company;

    public Lead() {}

    public Lead(String fullName, String email, String phoneNo, String altPhone, String address, String status, String note, LoginUser ownerUser, LoginUser assignedUser, Company company) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.altPhone = altPhone;
        this.address = address;
        this.status = status;
        this.note = note;
        this.ownerUser = ownerUser;
        this.assignedUser = assignedUser;
        this.company = company;
        this.creationDate = new Date();
        this.updationDate = new Date();
    }

    // Getters and Setters
    public Long getLeadId() { return leadId; }
    public void setLeadId(Long leadId) { this.leadId = leadId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public String getAltPhone() { return altPhone; }
    public void setAltPhone(String altPhone) { this.altPhone = altPhone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LoginUser getOwnerUser() { return ownerUser; }
    public void setOwnerUser(LoginUser ownerUser) { this.ownerUser = ownerUser; }

    public LoginUser getAssignedUser() { return assignedUser; }
    public void setAssignedUser(LoginUser assignedUser) { this.assignedUser = assignedUser; }

    public Date getCreationDate() { return creationDate; }
    public void setCreationDate(Date creationDate) { this.creationDate = creationDate; }

    public Date getUpdationDate() { return updationDate; }
    public void setUpdationDate(Date updationDate) { this.updationDate = updationDate; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

	@Override
	public String toString() {
		return "Lead [leadId=" + leadId + ", fullName=" + fullName + ", email=" + email + ", phoneNo=" + phoneNo
				+ ", altPhone=" + altPhone + ", address=" + address + ", status=" + status + ", note=" + note
				+ ", ownerUser=" + ownerUser + ", assignedUser=" + assignedUser + ", creationDate=" + creationDate
				+ ", updationDate=" + updationDate + ", company=" + company + "]";
	}
    
    
}
