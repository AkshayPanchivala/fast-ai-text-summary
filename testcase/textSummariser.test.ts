import TextSummarizer from "../src/TextSummarizer";

describe("TextSummarizer", () => {
  let summarizer: TextSummarizer;

  beforeEach(() => {
    summarizer = new TextSummarizer();
  });

  

  test("should summarize text correctly by selecting top sentences", () => {
    const text =
      "Natural language processing is a field of AI. It helps computers understand human language. Many applications use NLP.";
    
    const summary = summarizer.summarize(text, 2);

    expect(summary).toContain("Natural language processing is a field of AI.");
    expect(summary).toContain("It helps computers understand human language.");
  });

  test("should throw TypeError if given an empty text", () => {
    expect(() => summarizer.summarize("", 2)).toThrow(TypeError);
  });

  test("should not return more sentences than available", () => {
    const text = "This is a single sentence.";
    const summary = summarizer.summarize(text, 3);

    expect(summary).toBe("This is a single sentence.");
  });

  describe("Error Handling", () => {
    test("should throw TypeError for null text input", () => {
      expect(() => summarizer.summarize(null as any, 2)).toThrow(TypeError);
    });

    test("should throw TypeError for undefined text input", () => {
      expect(() => summarizer.summarize(undefined as any, 2)).toThrow(TypeError);
    });

    test("should throw TypeError for non-string text input", () => {
      expect(() => summarizer.summarize(123 as any, 2)).toThrow(TypeError);
      expect(() => summarizer.summarize({} as any, 2)).toThrow(TypeError);
    });

    test("should throw TypeError for null maxSentences input", () => {
      expect(() => summarizer.summarize("some text", null as any)).toThrow(TypeError);
    });

    

    test("should throw TypeError for non-number maxSentences input", () => {
      expect(() => summarizer.summarize("some text", "abc" as any)).toThrow(TypeError);
      expect(() => summarizer.summarize("some text", {} as any)).toThrow(TypeError);
    });

    test("should throw TypeError for zero maxSentences input", () => {
      expect(() => summarizer.summarize("some text", 0 as any)).toThrow(TypeError);
    });

    test("should throw TypeError for negative maxSentences input", () => {
      expect(() => summarizer.summarize("some text", -5 as any)).toThrow(TypeError);
    });

    test("should throw TypeError for non-integer maxSentences input", () => {
      expect(() => summarizer.summarize("some text", 2.5 as any)).toThrow(TypeError);
    });
  });

  describe("Sentence Splitting Edge Cases", () => {
    test("should handle text with no sentence-ending punctuation", () => {
      const text = "This is a sentence without a period This is another one";
      const summary = summarizer.summarize(text, 1);
      expect(summary).toBe("This is a sentence without a period This is another one");
    });

    test("should handle text with excessive whitespace", () => {
      const text = "Sentence one.  Sentence two.   Sentence three.";
      const summary = summarizer.summarize(text, 3);
      expect(summary).toBe("Sentence one. Sentence two. Sentence three.");
    });

    test("should handle text with leading/trailing whitespace", () => {
      const text = "  Hello world. This is a test.   ";
      const summary = summarizer.summarize(text, 2);
      expect(summary).toBe("Hello world. This is a test.");
    });
  });
});
