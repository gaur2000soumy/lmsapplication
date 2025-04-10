package in.lms.lmsapplication.dto;

import in.lms.lmsapplication.model.Company;

public class CompanyDTO {

	private long companyId;
	private String companyName;

	public CompanyDTO() {

	}

	public CompanyDTO(Company company) {
		this.companyId = company.getCompanyId();
		this.companyName = company.getCompanyName();
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
