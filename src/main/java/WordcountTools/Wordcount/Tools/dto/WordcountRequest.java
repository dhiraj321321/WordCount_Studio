package WordcountTools.Wordcount.Tools.dto;

import jakarta.validation.constraints.NotBlank;

public class WordcountRequest {

    @NotBlank
    private String content;

    private String theme;

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
}
