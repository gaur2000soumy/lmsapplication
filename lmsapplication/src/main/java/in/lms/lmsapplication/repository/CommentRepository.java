package in.lms.lmsapplication.repository;

import in.lms.lmsapplication.model.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByLead_LeadId(Long leadId);
	List<Comment> findByUserId(Long userId);
}

