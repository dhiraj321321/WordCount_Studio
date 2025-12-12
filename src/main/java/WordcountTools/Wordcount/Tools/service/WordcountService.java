package WordcountTools.Wordcount.Tools.service;

import WordcountTools.Wordcount.Tools.dto.WordcountRequest;
import WordcountTools.Wordcount.Tools.dto.WordcountResponse;
import WordcountTools.Wordcount.Tools.model.Submission;
import WordcountTools.Wordcount.Tools.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class WordcountService {

    private final SubmissionRepository repository;

    public WordcountService(SubmissionRepository repository) {
        this.repository = repository;
    }

    public WordcountResponse process(WordcountRequest request) {
        String content = request.getContent().trim();

        int wordCount = countWords(content);
        int charCount = content.length();
        int sentenceCount = countSentences(content);
        int paragraphCount = countParagraphs(content);

        Submission submission = new Submission();
        submission.setContent(content);
        submission.setTheme(request.getTheme());
        submission.setWordCount(wordCount);
        submission.setCharCount(charCount);
        submission.setSentenceCount(sentenceCount);
        submission.setParagraphCount(paragraphCount);

        Submission saved = repository.save(submission);

        saveToFile(saved.getId(), content);

        return new WordcountResponse(
                saved.getId(),
                wordCount,
                charCount,
                sentenceCount,
                paragraphCount
        );
    }

    private int countWords(String content) {
        if (content.isBlank()) return 0;
        String[] parts = content.trim().split("\\s+");
        return parts.length;
    }

    private int countSentences(String content) {
        if (content.isBlank()) return 0;
        String[] parts = content.split("[.!?]+");
        int count = 0;
        for (String s : parts) {
            if (!s.trim().isEmpty()) count++;
        }
        return count;
    }

    private int countParagraphs(String content) {
        if (content.isBlank()) return 0;
        String[] parts = content.split("(\\r?\\n){2,}");
        int count = 0;
        for (String p : parts) {
            if (!p.trim().isEmpty()) count++;
        }
        return count;
    }

    private void saveToFile(Long id, String content) {
        try {
            Path dir = Path.of("uploads");
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }
            Path file = dir.resolve("submission-" + id + ".txt");
            Files.writeString(file, content);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
