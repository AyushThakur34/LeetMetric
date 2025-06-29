# LeetMetric

LeetMetric is a simple and interactive web application that allows users to view real-time LeetCode statistics by entering their LeetCode username. It visualizes problem-solving progress across Easy, Medium, and Hard difficulties using circular progress bars and displays additional stats like accuracy, rank, contribution points, and reputation.

## 🔍 Features

- ✅ Live LeetCode stats fetch using public API
- 🎯 Difficulty-wise progress (Easy, Medium, Hard)
- 📊 Stats cards for Accuracy, Rank, Contribution, Reputation
- 🚫 Input validation for LeetCode username
- ⚡ Clean and responsive UI

## 🛠️ Tech Stack

- **HTML5** for structure
- **CSS3** for styling (customizable with your own styles)
- **JavaScript** for DOM manipulation and API integration
- **[LeetCode Stats API](https://leetcode-stats-api.herokuapp.com/)** for data fetching

## 🚀 How to Use

1. Clone the repository or download the files.
2. Open `index.html` in your browser.
3. Enter a valid LeetCode username.
4. Click on **Search** to view the stats.

## 🧠 Username Validation

- Must begin with a letter
- Can contain alphanumeric characters, hyphens (`-`), and underscores (`_`)
- Max length: 16 characters
