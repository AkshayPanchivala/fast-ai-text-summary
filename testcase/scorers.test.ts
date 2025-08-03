import { FrequencyScorer } from '../src/scorers';
import * as natural from 'natural';

describe('FrequencyScorer', () => {
  let scorer: FrequencyScorer;
  let wordTokenizer: natural.WordTokenizer;

  beforeEach(() => {
    wordTokenizer = new natural.WordTokenizer();
    scorer = new FrequencyScorer(wordTokenizer);
  });

  test('should score sentences based on word frequency', () => {
    const sentences = ['This is a test.', 'This is another test.'];
    const freqMap = { this: 2, is: 2, a: 1, another: 1, test: 2 };
    const scoredSentences = scorer.scoreSentences(sentences, freqMap);

    expect(scoredSentences).toEqual([
      { sentence: 'This is a test.', score: 7 },
      { sentence: 'This is another test.', score: 7 },
    ]);
  });
});
