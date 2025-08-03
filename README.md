

# 🧠 Fast AI Text Summary

**Fast AI Text Summary** is a lightweight and blazing-fast Node.js package for efficient text summarization. It leverages basic Natural Language Processing (NLP) and **frequency-based extractive techniques** to distill large blocks of text into concise, meaningful sentences. This AI-powered text summarizer is ideal for applications like chatbots, content previews, and AI assistants, offering a fast and simple way to generate text summaries. It identifies important sentences based on word frequency. **Please note that as an extractive summarizer, it directly extracts sentences from the original text and does not generate new content. It primarily focuses on word frequency and does not account for semantic meaning or sentence position, meaning it may not always capture the most contextually relevant information for all use cases.** Easy to use and customizable.

---

## ✨ Features

- 📜 Summarize large paragraphs in seconds.
- 🔢 Customize the number of summary lines.
- ⚡ Fast and lightweight.
- 🧠 Built on simple natural language processing (NLP) techniques.
- 🛠️ Easy to integrate with any Node.js project.

---

## 📦 Installation

[![NPM Version](https://img.shields.io/npm/v/fast-ai-text-summary.svg)](https://www.npmjs.com/package/fast-ai-text-summary)

```bash
npm install fast-ai-text-summary
```

---

## 🚀 Usage

To use **Fast AI Text Summary**, you need to import the `TextSummarizer` class. The package supports both CommonJS and ES Modules.

### ES Module (import)

```javascript
import { TextSummarizer } from 'fast-ai-text-summary';

const text = `
Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. The goal is a computer capable of "understanding" the contents of documents, including the contextual nuances of the language within them. The technology can then accurately extract information and insights contained in the documents as well as categorize and organize the documents themselves.

Challenges in natural language processing frequently involve speech recognition, natural language understanding, and natural language generation.
`;

const summarizer = new TextSummarizer();
const summary = summarizer.summarize(text, 3);
console.log('--- ESM Example ---');
console.log('Summary:', summary);
```

### CommonJS (require)

```javascript
const { TextSummarizer } = require('fast-ai-text-summary');

const text = `
Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. The goal is a computer capable of "understanding" the contents of documents, including the contextual nuances of the language within them. The technology can then accurately extract information and insights contained in the documents as well as categorize and organize the documents themselves.

Challenges in natural language processing frequently involve speech recognition, natural language understanding, and natural language generation.
`;

const summarizer = new TextSummarizer();
const summary = summarizer.summarize(text, 3);
console.log('--- CommonJS Example ---');
console.log('Summary:', summary);
```

### Custom Scorer

You can also provide your own custom scoring logic by implementing the `ISentenceScorer` interface.

```javascript
import { TextSummarizer, FrequencyScorer } from 'fast-ai-text-summary';

const summarizer = new TextSummarizer();
const customFrequencyScorer = new FrequencyScorer(summarizer.wordTokenizer); // Pass the wordTokenizer
const customSummarizer = new TextSummarizer(customFrequencyScorer);

const summary = customSummarizer.summarize(text, 2);
console.log("Custom Scorer Summary:", summary);
```


---

## 🧪 Example Output

Original text: ~1000 characters  
Summary (1 sentence):

```text
Mahatma Gandhi, born on October 2, 1869, in Porbandar, was a key leader in India’s
struggle for independence and is fondly known as the Father of the Nation.
```

![Alt text](https://github.com/AkshayPanchivala/fast-ai-text-summary/blob/main/assets/outputImage.png)


You can increase the number `n` to get a longer summary:

```javascript
summarytext.summarize(text, 3); // returns 3 most important sentences
```
---


## 🚀 Performance Considerations

This package is designed for speed and efficiency, especially for typical text summarization tasks. Performance scales with the length of the input text and the number of sentences requested in the summary. For very large texts (e.g., tens of thousands of words), while the package remains fast due to its frequency-based approach, it's advisable to benchmark performance within your specific application context to set accurate user expectations.

## 💡 Understanding Extractive Summarization

`fast-ai-text-summary` employs an **extractive summarization** method. This means it identifies and extracts the most important sentences directly from the original text based on word frequency. It does not generate new sentences or paraphrase content. This approach ensures that the summary is always grammatically correct and directly reflects the source material.

**Key characteristics of extractive summaries:**

*   **Directly from source:** Sentences are taken verbatim from the input text.
*   **No new content:** The summarizer does not create new sentences or rephrase information.
*   **Focus on frequency:** Importance is primarily determined by how frequently words appear, after filtering common stopwords.

While highly efficient and useful for many applications, extractive summarization may not always capture the nuanced semantic meaning or contextual relevance as effectively as abstractive methods (which generate new sentences). It's important to consider this when setting user expectations for the type of summary produced.

---

## 📚 API

### `summarize(text, n)`

| Parameter | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `text`    | `string` | The text to be summarized.                      |
| `n`       | `number` | Number of lines to include in the summary. |

Returns: `string` (summary of the text)

---

## 🌐 Keywords

> AI text summarizer, Node.js summarization tool, text summary generator, JavaScript NLP summarizer, natural language processing summarizer, fast text summarizer, extractive summarizer npm, sentence rank summarization.

---


## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a new branch
3. Make your changes
4. Open a pull request

See our [Code of Conduct](https://github.com/AkshayPanchivala/fast-ai-text-summary/blob/main/CODE_OF_CONDUCT.md) for guidelines.

---

## 📜 License

MIT License — see [LICENSE](https://github.com/AkshayPanchivala/fast-ai-text-summary/blob/main/LICENSE.txt) for details.

---

## 👤 Author

**Akshay Panchivala**  
[GitHub Profile](https://github.com/AkshayPanchivala/fast-ai-text-summary)

