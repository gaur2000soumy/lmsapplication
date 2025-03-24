package in.lms.lmsapplication.controller;

import in.lms.lmsapplication.model.Comment;
import in.lms.lmsapplication.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public String addComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
        return "redirect:/leads";  // Redirect to the lead page or other relevant page
    }

    @GetMapping("/{commentId}")
    public String getComment(@PathVariable Long commentId) {
        Comment comment = commentService.getById(commentId); 
        return "commentDetails";
    }
}
