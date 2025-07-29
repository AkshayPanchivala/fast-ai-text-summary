import * as natural from "natural";
import { ISentenceScorer, FrequencyScorer, SentenceScore } from "./scorers";

class TextSummarizer {
  private wordTokenizer: natural.WordTokenizer;
  private scorer: ISentenceScorer;

  constructor(scorer?: ISentenceScorer) {
    this.wordTokenizer = new natural.WordTokenizer();
    this.scorer = scorer || new FrequencyScorer(this.wordTokenizer);
  }

  // Split text into sentences
  protected splitIntoSentences(text: string): string[] {
    const sentenceTokenizer = new natural.SentenceTokenizer([], []);
    const sentences = sentenceTokenizer.tokenize(text);
    return sentences.map((sentence: string) => sentence.trim());
  }

  // Generate a frequency map of words
  protected calculateWordFrequency(text: string): { [key: string]: number } {
    const stopwords: string[] = natural.stopwords;
    const words: string[] = this.wordTokenizer.tokenize(text.toLowerCase())
      .filter((word: string) => !stopwords.includes(word));
    const freqMap: { [key: string]: number } = {};
    words.forEach((word: string) => {
      if (!freqMap[word]) {
        freqMap[word] = 0;
      }
      freqMap[word]++;
    });
    return freqMap;
  }

  

  // Summarize text
  public summarize(text: string, maxSentences: number = 3): string {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new TypeError('Input text must be a non-empty string.');
    }
    if (typeof maxSentences !== 'number' || !Number.isInteger(maxSentences) || maxSentences <= 0) {
      throw new TypeError('maxSentences must be a positive integer.');
    }

    const sentences = this.splitIntoSentences(text);
    const freqMap = this.calculateWordFrequency(text);
    const scoredSentences = this.scorer.scoreSentences(sentences, freqMap);

    // Sort sentences by score in descending order
    scoredSentences.sort((a: SentenceScore, b: SentenceScore) => b.score - a.score);

    // Extract top N sentences
    return scoredSentences.slice(0, maxSentences).map((item: SentenceScore) => item.sentence).join(" ");
  }
}

export default TextSummarizer;
