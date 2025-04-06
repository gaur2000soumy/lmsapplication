package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.Comment;
import in.lms.lmsapplication.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByLeadId(Long leadId) {
        return commentRepository.findByLead_LeadId(leadId);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}
}
