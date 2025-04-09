package in.lms.lmsapplication.repository;

import in.lms.lmsapplication.model.Lead;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
	List<Lead> findByFullNameContainingIgnoreCaseOrLeadId(String name, Long id);

	// find all leads by userId -> # superadmin/admin or user
	List<Lead> findAllLeadsByOwnerUserId(Long id);

	// find all assigned leads by assigned userId -> # superadmin/admin or user
	List<Lead> findByAssignedUserId(Long assignedUserId);
}
