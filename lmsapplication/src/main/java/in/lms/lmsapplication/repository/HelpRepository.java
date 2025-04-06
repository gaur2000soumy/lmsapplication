package in.lms.lmsapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.lms.lmsapplication.model.Help;

public interface HelpRepository extends JpaRepository<Help, Long> {
    List<Help> findByUserId(Long userId);
}
