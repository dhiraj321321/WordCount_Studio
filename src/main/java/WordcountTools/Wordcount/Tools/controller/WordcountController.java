package WordcountTools.Wordcount.Tools.controller;

import WordcountTools.Wordcount.Tools.dto.WordcountRequest;
import WordcountTools.Wordcount.Tools.dto.WordcountResponse;
import WordcountTools.Wordcount.Tools.model.Submission;
import WordcountTools.Wordcount.Tools.repository.SubmissionRepository;
import WordcountTools.Wordcount.Tools.service.WordcountService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wordcount")
@CrossOrigin(origins = "http://localhost:3000")
public class WordcountController {

    private final WordcountService service;
    private final SubmissionRepository repository;

    public WordcountController(WordcountService service,
                               SubmissionRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @PostMapping
    public WordcountResponse count(@Valid @RequestBody WordcountRequest request) {
        return service.process(request);
    }

    @GetMapping("/history")
    public List<Submission> history() {
        return repository.findAll();
    }
}
