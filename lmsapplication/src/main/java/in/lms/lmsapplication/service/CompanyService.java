package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.Company;
import in.lms.lmsapplication.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(Long id, Company companyDetails) {
        return companyRepository.findById(id).map(company -> {
            company.setCompanyName(companyDetails.getCompanyName());
            company.setCompanyAddress(companyDetails.getCompanyAddress());
            company.setCompanyCinNumber(companyDetails.getCompanyCinNumber());
            company.setCompanyContactPersonName(companyDetails.getCompanyContactPersonName());
            company.setCompanyContactPersonEmail(companyDetails.getCompanyContactPersonEmail());
            company.setCompanyContactPersonPhone(companyDetails.getCompanyContactPersonPhone());
            return companyRepository.save(company);
        }).orElseThrow(() -> new RuntimeException("Company not found"));
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}
