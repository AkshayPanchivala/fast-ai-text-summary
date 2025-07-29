

# 🧠 Fast AI Text Summary

**Fast AI Text Summary** is a lightweight and blazing-fast Node.js package for efficient text summarization. It leverages basic Natural Language Processing (NLP) and frequency-based extractive techniques to distill large blocks of text into concise, meaningful sentences. This AI-powered text summarizer is ideal for applications like chatbots, content previews, and AI assistants, offering a fast and simple way to generate text summaries. It identifies important sentences based on word frequency. Please note that as an extractive summarizer, it does not account for semantic meaning or sentence position, and may not always capture the most contextually relevant information. Easy to use and customizable.

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

```javascript
const TextSummarizer = require("fast-ai-text-summary").default; // Note the .default for ES module export
const { FrequencyScorer } = require("fast-ai-text-summary"); // Import the default scorer

// --- Basic Usage (uses default FrequencyScorer) ---
const summarizer = new TextSummarizer();

const text = `
Mahatma Gandhi, born on October 2, 1869, in Porbandar, was a key leader in India’s struggle for independence
and is fondly known as the Father of the Nation.His full name was Mohandas Karamchand Gandhi. After studying
law in London, he worked in South Africa for 21 years, where he first began fighting against racial discrim-
ination and developed his principle of Satyagraha, or non-violentresistance. Upon returning to India in 1915,
he became a prominent figure in the Indian freedom movement. Gandhi led many peaceful protests against British
rule, starting with the Non-Cooperation Movement in 1920, urging Indians to boycott British goods and embrace
Khadi and self-reliance. He lived a simple life and believed in self-discipline, truth, and ahinsa(non-violence).
In 1930, he led the historic Salt March against the British salt tax,a significant act of civil disobedience.
Gandhi also worked to remove social evils like untouchability and called the marginalized people Harijans,
meaning "children of God." He launched the Quit India Movement in 1942, demanding an end to British rule, and
was jailed several times for his actions. Despite the hardships, he remained devoted to peaceful means of
protest.His efforts were crucial in India achieving independence in 1947. However, he was deeply saddened by
the partition of India and Pakistan. On January 30, 1948, he was tragically assassinated in New Delhi.Gandhi's
ideas inspired civil rights movements across the world, and his legacy of peace, tolerance, and justice continues
to guide generations. His teachings remain relevant and powerful even today.
`;

try {
  const summary = summarizer.summarize(text, 1); // '1' is number of lines/sentences in summary
  console.log("Basic Summary:", summary);
} catch (error) {
  console.error("Error summarizing text:", error.message);
}

// --- Usage with a custom scorer (e.g., the provided FrequencyScorer explicitly) ---
// You can pass an instance of a class that implements ISentenceScorer
const customFrequencyScorer = new FrequencyScorer(summarizer.wordTokenizer); // Pass the wordTokenizer
const customSummarizer = new TextSummarizer(customFrequencyScorer);

try {
  const customSummary = customSummarizer.summarize(text, 2);
  console.log("Custom Scorer Summary:", customSummary);
} catch (error) {
  console.error("Error with custom scorer:", error.message);
}

// --- Example of invalid input (will throw an an error) ---
try {
  summarizer.summarize(null, 1); // This will throw a TypeError
} catch (error) {
  console.error("Caught expected error for invalid input:", error.message);
}
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

