const natural = require("natural");

class TextSummarizer {
  constructor() {
    this.wordTokenizer = new natural.WordTokenizer();
  }

  // Split text into sentences
  splitIntoSentences(text) {
    const sentenceTokenizer = new natural.SentenceTokenizer();
    const sentences = sentenceTokenizer.tokenize(text);
    return sentences.map(sentence => sentence.trim());
  }

  // Generate a frequency map of words
  calculateWordFrequency(text) {
    const stopwords = natural.stopwords;
    const words = this.wordTokenizer.tokenize(text.toLowerCase())
      .filter(word => !stopwords.includes(word));
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

module.exports = TextSummarizer;
