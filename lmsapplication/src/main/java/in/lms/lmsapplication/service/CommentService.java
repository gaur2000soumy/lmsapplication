package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.Comment;
import in.lms.lmsapplication.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

	public Comment getById(Long commentId) {
		return commentRepository.getById(commentId);
	}

    // Additional methods can be added
}
 	