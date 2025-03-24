package in.lms.lmsapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.lms.lmsapplication.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
	List<Company> findByCompanyNameContainingIgnoreCaseOrCompanyId(String name, Long id);
}
