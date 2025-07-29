import * as natural from "natural";

export interface SentenceScore {
  sentence: string;
  score: number;
}

export interface ISentenceScorer {
  scoreSentences(sentences: string[], freqMap: { [key: string]: number }): SentenceScore[];
}

export class FrequencyScorer implements ISentenceScorer {
  private wordTokenizer: natural.WordTokenizer;

  constructor(wordTokenizer: natural.WordTokenizer) {
    this.wordTokenizer = wordTokenizer;
  }

  public scoreSentences(sentences: string[], freqMap: { [key: string]: number }): SentenceScore[] {
    return sentences.map((sentence: string) => {
      const words: string[] = this.wordTokenizer.tokenize(sentence.toLowerCase());
      const score: number = words.reduce((total: number, word: string) => total + (freqMap[word] || 0), 0);
      return { sentence, score };
    });
  }
}