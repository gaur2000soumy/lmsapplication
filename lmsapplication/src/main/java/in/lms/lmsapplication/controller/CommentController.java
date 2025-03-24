package in.lms.lmsapplication.controller;

import in.lms.lmsapplication.model.Comment;
import in.lms.lmsapplication.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping("/lead/{leadId}")
    public List<Comment> getCommentsByLeadId(@PathVariable Long leadId) {
        return commentService.getCommentsByLeadId(leadId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
