# DeepCheckExtension: AI-Powered URL & Image Security 🛡️

**DeepCheckExtension** is a comprehensive security suite designed to provide real-time protection against malicious URLs and AI-generated deepfakes. It combines a high-performance **PWA (Progressive Web App)** for image analysis with an **AI-powered URL scanner** backed by machine learning models.

---

## 🚀 Key Features

### 1. AI Malicious URL Scanner
DeepCheck leverages a specialized machine learning model hosted on Hugging Face to analyze URLs for potential threats:
- **Real-time Classification**: Detects Phishing, Malware, Defacement, and Safe URLs.
- **Detailed Metrics**: Provides risk scores, protocol analysis (HTTPS verification), and domain reputation checks.
- **Smart Heuristics**: Identifies suspicious TLDs, IP-based domains, and abnormal subdomain counts.

### 2. Deepfake Image Detection
A privacy-first tool for identifying AI-generated content:
- **Local Analysis**: Image forensic analysis is performed on-device to ensure user privacy.
- **Intuitive UI**: Drag-and-drop interface with real-time scanning visualizations.

### 3. Native-Grade PWA Experience
- **Optimized Layout**: Uses `100svh` for stability on mobile devices.
- **Smooth Transitions**: "Card Stacking" engine for a fluid, app-like feel.
- **Cross-Platform**: Works seamlessly on Android, iOS, and Desktop.

---

## 🏗️ Technical Architecture

- **Frontend**: Built with **React 19**, **TypeScript**, and **Tailwind CSS** for a modern, responsive UI.
- **Extension Logic**: Designed for background monitoring and universal link interception.
- **AI Backend**: Integrates with Hugging Face via the **Gradio Client**, utilizing high-performance text classification models.
- **Deployment**: Configured for **Cloudflare Pages** (via `wrangler`) and **Netlify Functions**.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Gradio Client](https://www.gradio.app/docs/client), [Transformers.js](https://huggingface.co/docs/transformers.js)
- **Utilities**: `jspdf` & `html2canvas` for forensic reports.

---

## 📥 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JasonHan888/DeepCheckExtension.git
   cd DeepCheckExtension
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Launch the development server:
```bash
npm run dev
```

### Build & Deploy
Generate a production-ready build:
```bash
npm run build
```

---

## 🛡️ Privacy & Security
- **Privacy First**: DeepCheck is designed to minimize data transmission. Forensic image analysis is kept local to the user's browser.
- **Transparent Analysis**: All URL risk metrics are clearly presented to the user, providing full visibility into why a site was flagged.

---

## 🚧 Roadmap
- **Browser Extension**: Full integration as a Chrome/Firefox extension for background protection.
- **Real-time Video Analysis**: Expanding deepfake detection to video streams.
- **Advanced Forensic Reports**: Enhanced PDF exports for security researchers.

---

**DeepCheck: Trust, Verified.**  
Developed by [Jason Han](https://github.com/JasonHan888)
