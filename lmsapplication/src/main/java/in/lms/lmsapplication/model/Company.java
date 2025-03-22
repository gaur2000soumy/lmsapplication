package in.lms.lmsapplication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long companyId;
	private String companyName;
	private String companyAddress;
	private String companyCinNumber;

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

	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public String getCompanyCinNumber() {
		return companyCinNumber;
	}

	public void setCompanyCinNumber(String companyCinNumber) {
		this.companyCinNumber = companyCinNumber;
	}

	public Company(long companyId, String companyName, String companyAddress, String companyCinNumber) {
		this.companyId = companyId;
		this.companyName = companyName;
		this.companyAddress = companyAddress;
		this.companyCinNumber = companyCinNumber;
	}

	public Company() {
	}

	public String toString() {
		return "Company [companyId=" + companyId + ", companyName=" + companyName + ", companyAddress=" + companyAddress
				+ ", companyCinNumber=" + companyCinNumber + "]";
	}

}
