package in.lms.lmsapplication.dto;

public class LeadDTO {

	private long leadId;

	public LeadDTO() {

	}

	public LeadDTO(long leadId, String status) {
		this.leadId = leadId;
	}

	public long getLeadId() {
		return leadId;
	}

	public void setLeadId(long leadId) {
		this.leadId = leadId;
	}
}