const natural = require("natural");

class TextSummarizer {
  constructor() {
    this.wordTokenizer = new natural.WordTokenizer();
  }

  // Split text into sentences
  splitIntoSentences(text) {
    // Split text into sentences using regex
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.map(sentence => sentence.trim());
  }

  // Generate a frequency map of words
  calculateWordFrequency(text) {
    const words = this.wordTokenizer.tokenize(text.toLowerCase());
    const freqMap = {};
    words.forEach((word) => {
      if (!freqMap[word]) {
        freqMap[word] = 0;
      }
      freqMap[word]++;
    });
    return freqMap;
  }

  // Score sentences based on word frequencies
  scoreSentences(sentences, freqMap) {
    return sentences.map((sentence) => {
      const words = this.wordTokenizer.tokenize(sentence.toLowerCase());
      const score = words.reduce((total, word) => total + (freqMap[word] || 0), 0);
      return { sentence, score };
    });
  }

  // Summarize text
  summarize(text, maxSentences = 3) {
    const sentences = this.splitIntoSentences(text);
    const freqMap = this.calculateWordFrequency(text);
    const scoredSentences = this.scoreSentences(sentences, freqMap);

    // Sort sentences by score in descending order
    scoredSentences.sort((a, b) => b.score - a.score);

    // Extract top N sentences
    return scoredSentences.slice(0, maxSentences).map((item) => item.sentence).join(" ");
  }
}

module.exports = TextSummarizer;
