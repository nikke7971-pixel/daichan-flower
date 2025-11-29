const express = require('express');
const app = express();

const flowers = [
  {flower:"🌸 桜", meaning:"優美な女性・純潔", color:"#FFB7C5"},
  {flower:"🌹 赤い薔薇", meaning:"あなたを愛しています", color:"#FF69B4"},
  {flower:"🌻 向日葵", meaning:"あなただけを想う", color:"#FFD700"},
  {flower:"💠 紫陽花", meaning:"辛抱強い愛情", color:"#9370DB"},
  {flower:"🪻 すみれ", meaning:"小さな幸せ", color:"#DA70D6"},
  {flower:"🌷 チューリップ", meaning:"愛の告白", color:"#FF1493"},
  {flower:"🤍 かすみ草", meaning:"感謝の気持ち", color:"#F0E68C"},
  {flower:"🌿 ラベンダー", meaning:"あなたを待っています", color:"#E6E6FA"},
  {flower:"🌼 デイジー", meaning:"希望", color:"#FFFFE0"},
  {flower:"🌺 ハイビスカス", meaning:"新しい恋", color:"#FF6B9D"},
  {flower:"🪷 蓮の花", meaning:"清らかな心", color:"#FFB6C1"},
  {flower:"🌺 カトレア", meaning:"成熟した大人の魅力", color:"#DDA0DD"}
];

app.get('/', (req, res) => {
  const today = new Date().toLocaleDateString('ja-JP', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'});
  const shuffled = [...flowers].sort(() => Math.random() - 0.5);
  const top5 = shuffled.slice(0, 5);

  res.send(`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>花言葉ランキング - Today's Flower Meanings</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans JP', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      position: relative;
      overflow-x: hidden;
    }
    
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
      animation: float 20s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    
    header {
      text-align: center;
      padding: 60px 20px 40px;
      animation: fadeInDown 1s ease;
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5em;
      color: white;
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
    
    .subtitle {
      font-size: 1.2em;
      color: rgba(255,255,255,0.9);
      margin-bottom: 10px;
    }
    
    .date {
      font-size: 1em;
      color: rgba(255,255,255,0.8);
      font-weight: 300;
    }
    
    .ranking-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 40px 20px;
      animation: fadeInUp 1s ease 0.3s backwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .flower-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      padding: 40px 30px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    
    .flower-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 100%);
      opacity: 0;
      transition: opacity 0.4s;
    }
    
    .flower-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 30px 80px rgba(0,0,0,0.4);
    }
    
    .flower-card:hover::before {
      opacity: 1;
    }
    
    .rank-badge {
      position: absolute;
      top: -10px;
      right: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      font-weight: bold;
      box-shadow: 0 8px 20px rgba(245, 87, 108, 0.4);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    
    .flower-icon {
      font-size: 5em;
      text-align: center;
      margin: 20px 0;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .flower-name {
      font-size: 1.8em;
      font-weight: bold;
      color: #333;
      text-align: center;
      margin-bottom: 15px;
    }
    
    .flower-meaning {
      font-size: 1.1em;
      color: #666;
      text-align: center;
      line-height: 1.6;
      padding: 15px;
      background: rgba(0,0,0,0.03);
      border-radius: 12px;
    }
    
    .reload-notice {
      text-align: center;
      padding: 40px 20px;
      color: white;
      font-size: 1.2em;
      animation: fadeIn 2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .reload-btn {
      display: inline-block;
      margin-top: 20px;
      padding: 15px 40px;
      background: white;
      color: #667eea;
      border-radius: 50px;
      text-decoration: none;
      font-weight: bold;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: all 0.3s;
      cursor: pointer;
      border: none;
      font-size: 1em;
    }
    
    .reload-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
      background: #f5f5f5;
    }
    
    footer {
      text-align: center;
      padding: 40px 20px;
      color: rgba(255,255,255,0.8);
      font-size: 0.9em;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5em;
      }
      
      .ranking-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .flower-card {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>✿ 今日の花言葉ランキング ✿</h1>
      <p class="subtitle">Today's Flower Language Rankings</p>
      <p class="date">${today}</p>
    </header>
    
    <div class="ranking-grid">
      ${top5.map((f, i) => `
        <div class="flower-card" style="animation-delay: ${i * 0.1}s">
          <div class="rank-badge">${i + 1}</div>
          <div class="flower-icon">${f.flower.split(' ')[0]}</div>
          <div class="flower-name">${f.flower}</div>
          <div class="flower-meaning">${f.meaning}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="reload-notice">
      <p>✨ ページをリロードすると新しいランキングが見られます ✨</p>
      <button class="reload-btn" onclick="location.reload()">🔄 新しいランキングを見る</button>
    </div>
    
    <footer>
      <p>© 2025 Flower Language Rankings | Made with 💕</p>
    </footer>
  </div>
</body>
</html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
