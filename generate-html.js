import fs from 'fs'

const courses = [
  { 
    id: 'bale', 
    title: 'Bale', 
    slug: 'bale-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de profesyonel eğitmenlerle Bale kursu. Zarafeti, esnekliği ve klasik müziğin ritmini bedeninizde hissedin."
  },
  { 
    id: 'salsa-bachata', 
    title: 'Salsa & Bachata', 
    slug: 'salsa-ve-bachata-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de Salsa ve Bachata dans kursu. Küba esintileri ve duygusal ritimlerle partnerli dansın keyfini çıkarın."
  },
  { 
    id: 'kpop', 
    title: 'K-Pop', 
    slug: 'k-pop-dans-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de K-Pop dans kursu. En sevdiğiniz idollerin enerjik ve popüler koreografilerini profesyonel eğitmenlerden öğrenin."
  },
  { 
    id: 'hiphop', 
    title: 'Hip Hop', 
    slug: 'hip-hop-dans-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de Hip Hop dans kursu. Sokağın ritmini hissedin, özgür koreografilerle bedeninizi müziğe bırakın."
  },
  { 
    id: 'piyano', 
    title: 'Piyano', 
    slug: 'piyano-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de Piyano dersi ve eğitimi. Piyano derslerimizle müziğin temelini atın ve tuşların büyüsünü keşfedin."
  },
  { 
    id: 'keman', 
    title: 'Keman', 
    slug: 'keman-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de Keman dersi ve eğitimi. Kemanın zarif ve duygusal tınısıyla kendi melodilerinizi yaratın."
  },
  { 
    id: 'gitar', 
    title: 'Gitar', 
    slug: 'gitar-kursu',
    metaDescription: "İstanbul Maltepe Cevizli'de Gitar dersi. Akustik, klasik veya elektro; gitarın ritmini profesyonel eğitmenlerimizle yakalayın."
  },
  { 
    id: 'san-dersi', 
    title: 'Şan Dersi', 
    slug: 'san-dersi',
    metaDescription: "İstanbul Maltepe Cevizli'de Şan Dersi ve Ses Eğitimi Kursu. Sesinizi profesyonelce kullanmayı öğrenin."
  }
];

const template = `<!doctype html>
<html lang="tr">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/icon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Meta Etiketleri -->
  <meta name="description"
    content="{{DESC}}" />
  <meta name="keywords"
    content="ekare, ekare sanat, ekare akademi, sanat akademi, {{TITLE}}, {{TITLE}} kursu, maltepe {{TITLE}} kursu, istanbul dans müzik" />
  <meta name="author" content="Ekare Sanat Akademi" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph (Facebook/Instagram/LinkedIn) -->
  <meta property="og:site_name" content="Ekare Sanat Akademi" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Ekare Sanat Akademi | {{TITLE}} Eğitimi" />
  <meta property="og:description"
    content="{{DESC}}" />
  <meta property="og:image" content="/images/banner.webp" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ekare Sanat Akademi | {{TITLE}} Eğitimi" />
  <meta name="twitter:description"
    content="{{DESC}}" />
  <meta name="twitter:image" content="/images/banner.webp" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Lora:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Lora:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Lora:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap">
  </noscript>
  <meta name="apple-mobile-web-app-title" content="Ekare Sanat Akademi">
  <link rel="manifest" href="/manifest.json">
  <title>Ekare Sanat Akademi | {{TITLE}} Eğitimi</title>

  <!-- Local Business Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ekare Sanat Akademi",
    "image": "https://ekaresanat.com/images/banner.webp",
    "url": "https://ekaresanat.com/{{SLUG}}",
    "telephone": "+905447111405",
    "email": "ekaresanat@gmail.com",
    "description": "{{DESC}}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maltepe",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    }
  }
  </script>
</head>

<body class="bg-[#fdfbf7] text-stone-800 font-sans antialiased">
  <div id="root">
    <style>
      .initial-loader {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fdfbf7;
      }
      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(146, 64, 14, 0.2);
        border-top-color: #92400e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
    <div class="initial-loader">
      <div class="spinner"></div>
    </div>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>`;

courses.forEach(c => {
  let content = template.replace(/{{TITLE}}/g, c.title).replace(/{{DESC}}/g, c.metaDescription).replace(/{{SLUG}}/g, c.slug);
  fs.writeFileSync(c.slug + '.html', content, 'utf8');
});
console.log('HTML files created.');
