const TextSummarizer = require("../src/TextSummarizer");

describe("TextSummarizer", () => {
  let summarizer;

  beforeEach(() => {
    summarizer = new TextSummarizer();
  });

  test("should split text into sentences correctly", () => {
    const text = "Hello world. This is a test. Summarization works!";
    const sentences = summarizer.splitIntoSentences(text);
    
    expect(sentences).toEqual([
      "Hello world.",
      "This is a test.",
      "Summarization works!",
    ]);
  });

  test("should calculate word frequency correctly", () => {
    const text = "Hello world. Hello again!";
    const freqMap = summarizer.calculateWordFrequency(text);

    expect(freqMap).toEqual({
      hello: 2,
      world: 1,
      again: 1,
    });
  });

  test("should score sentences correctly based on word frequencies", () => {
    const sentences = ["Hello world.", "Hello again!"];
    const freqMap = { hello: 2, world: 1, again: 1 };

    const scoredSentences = summarizer.scoreSentences(sentences, freqMap);

    expect(scoredSentences).toEqual([
      { sentence: "Hello world.", score: 3 },
      { sentence: "Hello again!", score: 3 },
    ]);
  });

  test("should summarize text correctly by selecting top sentences", () => {
    const text =
      "Natural language processing is a field of AI. It helps computers understand human language. Many applications use NLP.";
    
    const summary = summarizer.summarize(text, 2);

    expect(summary).toContain("Natural language processing is a field of AI.");
    expect(summary).toContain("It helps computers understand human language.");
  });

  test("should return an empty string if given an empty text", () => {
    const summary = summarizer.summarize("", 2);
    expect(summary).toBe("");
  });

  test("should not return more sentences than available", () => {
    const text = "This is a single sentence.";
    const summary = summarizer.summarize(text, 3);

    expect(summary).toBe("This is a single sentence.");
  });
});
