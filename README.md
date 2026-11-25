# HElkady-egypt-quiz

Arabic quiz game PWA: categories, easy / medium / hard levels, questions shown in random order without repeats until the pool is used up. Works offline.

## بالعربي
لعبة أسئلة وأجوبة بالعربي: أقسام، ومستويات سهل ومتوسط وصعب، والأسئلة بتتعرض راندم ومن غير تكرار لحد ما تخلص الأسئلة. شغالة بدون نت.

## Run
No build step. It is a static web app (PWA) that works on phones and desktop.

```
npm start        # serves the folder, open the printed URL
npm test         # logic tests (Node 18+, no dependencies)
```

Deploy: upload the folder to any static host (GitHub Pages, Netlify, Cloudflare Pages). On a phone, open the site and choose "Add to Home Screen" to install it like an app. To get an APK later, wrap the folder with Capacitor (`npx cap add android`).

## التشغيل
مفيش بناء. افتح `index.html` من خلال أي سيرفر ساكن (`npm start`) أو ارفع المجلد على GitHub Pages أو Netlify، وعلى الموبايل اختار "إضافة إلى الشاشة الرئيسية".

## Question bank
| Category | Questions |
|---|---|
| ثقافة مصرية | 378 (easy 19, medium 196, hard 163) |
| الجغرافيا | 1004 (easy 172, medium 661, hard 171) |
| العناصر الكيميائية | 1040 (easy 180, medium 329, hard 531) |
| الرياضيات | 1000 (easy 334, medium 333, hard 333) |
| الوحدات والتحويلات | 1000 (easy 334, medium 333, hard 333) |

Math, units and chemistry are generated from data and verified by `npm test`. Geography comes from a country and capital table (sources: standard country and capital lists). Egyptian culture is a short hand-written starter set.

## Add questions
Each category is one file in `data/` with rows `[question, correct answer, [3 wrong answers], level]`, level is `easy`, `medium` or `hard`. To add a category, create `data/<id>.js` the same way, add it to `data/index.js` and to the cache list in `sw.js`. `npm test` checks that every question has 4 different options and that no question is repeated.

## License
MIT
