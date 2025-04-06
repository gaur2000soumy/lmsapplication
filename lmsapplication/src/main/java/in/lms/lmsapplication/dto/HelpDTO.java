package in.lms.lmsapplication.dto;

public class HelpDTO {
    private String subject;
    private String description;
    private Long userId;

    public HelpDTO() {
    }

    public HelpDTO(String subject, String description, Long userId) {
        this.subject = subject;
        this.description = description;
        this.userId = userId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "HelpDTO [subject=" + subject + ", description=" + description + ", userId=" + userId + "]";
    }

}
