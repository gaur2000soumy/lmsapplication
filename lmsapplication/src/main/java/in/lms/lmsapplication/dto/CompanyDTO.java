package in.lms.lmsapplication.dto;

public class CompanyDTO {
	
	private long companyId;
	private String companyName;
	
	public CompanyDTO() {
		
	}
	public CompanyDTO(long companyId, String companyName) {
		this.companyId = companyId;
		this.companyName = companyName;
	}
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

}
