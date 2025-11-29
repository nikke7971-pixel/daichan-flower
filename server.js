const express = require('express');
const app = express();

const flowers = [
  {flower:"🌸 桜", meaning:"優美な女性・純潔"},
  {flower:"🌹 赤い薔薇", meaning:"あなたを愛しています"},
  {flower:"🌻 向日葵", meaning:"あなただけを想う"},
  {flower:"💠 紫陽花", meaning:"辛抱強い愛情"},
  {flower:"🪻 すみれ", meaning:"小さな幸せ"},
  {flower:"🌷 ピンクトューリップ", meaning:"愛の告白"},
  {flower:"🤍 かすみ草", meaning:"感謝の気持ち"},
  {flower:"🌿 ラベンダー", meaning:"あなたを待っています"},
  {flower:"🌼 デイジー", meaning:"希望"},
  {flower:"🌺 ハイビスカス", meaning:"新しい恋"},
  {flower:"🪷 蓮の花", meaning:"清らかな心"},
  {flower:"🌺 カトレア", meaning:"成熟した大人の魅力"}
];

app.get('/', (req, res) => {
  const today = new Date().toLocaleDateString('ja-JP');
  const shuffled = [...flowers].sort(() => Math.random() - 0.5);
  const top5 = shuffled.slice(0, 5);

  res.send(`








  
✿ だいちゃんの今日の花言葉ランキング ✿
  
${today} の運命の花たち♡
  ${top5.map((f,i)=>`
  
    
${i+1}位
    
${f.flower}
    
${f.meaning}
  `).join('')}
  
リロードするたびにランキングが変わるよ～♡


  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('だいちゃんボット起動中♡'));
