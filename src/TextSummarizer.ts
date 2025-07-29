import * as natural from "natural";

interface SentenceScore {
  sentence: string;
  score: number;
}

class TextSummarizer {
  private wordTokenizer: natural.WordTokenizer;

  constructor() {
    this.wordTokenizer = new natural.WordTokenizer();
  }

  // Split text into sentences
  protected splitIntoSentences(text: string): string[] {
    const sentenceTokenizer = new natural.SentenceTokenizer([], []);
    const sentences = sentenceTokenizer.tokenize(text);
    return sentences.map(sentence => sentence.trim());
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

  // Score sentences based on word frequencies
  protected scoreSentences(sentences: string[], freqMap: { [key: string]: number }): SentenceScore[] {
    return sentences.map((sentence: string) => {
      const words: string[] = this.wordTokenizer.tokenize(sentence.toLowerCase());
      const score: number = words.reduce((total: number, word: string) => total + (freqMap[word] || 0), 0);
      return { sentence, score };
    });
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
    const scoredSentences = this.scoreSentences(sentences, freqMap);

    // Sort sentences by score in descending order
    scoredSentences.sort((a, b) => b.score - a.score);

    // Extract top N sentences
    return scoredSentences.slice(0, maxSentences).map((item) => item.sentence).join(" ");
  }
}

export default TextSummarizer;
