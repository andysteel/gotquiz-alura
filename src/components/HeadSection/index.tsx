import React from 'react';
import Head from 'next/head';
import db from '../../../db.json';

const HeadSection = () => (
  <div>
    <Head>
      <title>GOT - quiz</title>
      <meta name="title" content="GOT - quiz" />
      <meta name="description" content="Desafie seus conhecimentos sobre Game of Thrones" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gotquiz-alura.andysteel.vercel.app/" />
      <meta property="og:title" content="GOT - quiz" />
      <meta property="og:description" content="Desafie seus conhecimentos sobre Game of Thrones" />
      <meta property="og:image" content={db.bg} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://gotquiz-alura.andysteel.vercel.app/" />
      <meta property="twitter:title" content="GOT - quiz" />
      <meta property="twitter:description" content="Desafie seus conhecimentos sobre Game of Thrones" />
      <meta property="twitter:image" content={db.bg} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet" />
    </Head>
  </div>
);

export default HeadSection;
