package WordcountTools.Wordcount.Tools.repository;

import WordcountTools.Wordcount.Tools.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
