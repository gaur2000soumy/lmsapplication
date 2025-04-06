package in.lms.lmsapplication.controller;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import in.lms.lmsapplication.dto.HelpDTO;
import in.lms.lmsapplication.model.Help;
import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.service.HelpService;
import in.lms.lmsapplication.service.LoginService;

@RestController
@RequestMapping("/help")
public class HelpController {

    @Autowired
    private HelpService helpService;

    @Autowired
    private LoginService loginService;

    @PostMapping("/create")
    public Help createHelp(@RequestBody HelpDTO helpDTO) {
        LoginUser user = loginService.findById(helpDTO.getUserId()).get();

        Help help = new Help();
        help.setSubject(helpDTO.getSubject());
        help.setMessage(helpDTO.getDescription());
        help.setUser(user);
        help.setCreationDate(new Date());
        help.setStatus("Open");

        return helpService.saveHelp(help);
    }

    @GetMapping("/all")
    public List<Help> getAllHelps() {
        return helpService.getAllHelps();
    }

    @GetMapping("/user/{userId}")
    public List<Help> getUserHelps(@PathVariable Long userId) {
        return helpService.getHelpByUserId(userId);
    }

    @GetMapping("/{id}")
    public Help getHelpById(@PathVariable Long id) {
        return helpService.getHelpById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteHelp(@PathVariable Long id) {
        helpService.deleteHelp(id);
    }
}
