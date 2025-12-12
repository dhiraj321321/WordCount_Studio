package WordcountTools.Wordcount.Tools.dto;

public class WordcountResponse {

    private Long id;
    private int wordCount;
    private int charCount;
    private int sentenceCount;
    private int paragraphCount;

    public WordcountResponse(Long id, int wordCount, int charCount,
                             int sentenceCount, int paragraphCount) {
        this.id = id;
        this.wordCount = wordCount;
        this.charCount = charCount;
        this.sentenceCount = sentenceCount;
        this.paragraphCount = paragraphCount;
    }

    public Long getId() { return id; }
    public int getWordCount() { return wordCount; }
    public int getCharCount() { return charCount; }
    public int getSentenceCount() { return sentenceCount; }
    public int getParagraphCount() { return paragraphCount; }
}
