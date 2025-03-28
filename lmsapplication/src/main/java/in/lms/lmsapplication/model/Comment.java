package in.lms.lmsapplication.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "lead_id", nullable = false)
    @JsonIgnoreProperties({"fullName", "email","phone", "altPhone","address","status","updationDate","creationDate","company","assignedUser","ownerUser","note"})
    private Lead lead;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"phoneNumber", "fullName","role", "password"})
    private LoginUser user;

    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updationDate;

    public Comment() {}

    public Comment(Lead lead, LoginUser user, String description) {
        this.lead = lead;
        this.user = user;
        this.description = description;
        this.creationDate = new Date();
        this.updationDate = new Date();
    }

    // Getters and Setters
    public Long getCommentId() { return commentId; }
    public void setCommentId(Long commentId) { this.commentId = commentId; }

    public Lead getLead() { return lead; }
    public void setLead(Lead lead) { this.lead = lead; }

    public LoginUser getUser() { return user; }
    public void setUser(LoginUser user) { this.user = user; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getCreationDate() { return creationDate; }
    public void setCreationDate(Date creationDate) { this.creationDate = creationDate; }

    public Date getUpdationDate() { return updationDate; }
    public void setUpdationDate(Date updationDate) { this.updationDate = updationDate; }
}
