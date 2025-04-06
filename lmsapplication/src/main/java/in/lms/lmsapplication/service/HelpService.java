package in.lms.lmsapplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.model.Help;
import in.lms.lmsapplication.repository.HelpRepository;

@Service
public class HelpService {

    @Autowired
    private HelpRepository helpRepository;

    public Help saveHelp(Help help) {
        return helpRepository.save(help);
    }

    public List<Help> getAllHelps() {
        return helpRepository.findAll();
    }

    public List<Help> getHelpByUserId(Long userId) {
        return helpRepository.findByUserId(userId);
    }

    public Help getHelpById(Long id) {
        return helpRepository.findById(id).orElse(null);
    }

    public void deleteHelp(Long id) {
        helpRepository.deleteById(id);
    }
}
