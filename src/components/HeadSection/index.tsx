import React from 'react'
import Head  from 'next/head'
import db from '../../../db.json'

const HeadSection = () => {
    return (
        <div>
            <Head>
                <title>GOT - quiz</title>
                <meta name="title" content="GOT - quiz"></meta>
                <meta name="description" content="Desafie seus conhecimentos sobre Game of Thrones"></meta>

                <meta property="og:type" content="website"></meta>
                <meta property="og:url" content="https://gotquiz-alura.andysteel.vercel.app/"></meta>
                <meta property="og:title" content="GOT - quiz"></meta>
                <meta property="og:description" content="Desafie seus conhecimentos sobre Game of Thrones"></meta>
                <meta property="og:image" content={db.bg}></meta>

                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:url" content="https://gotquiz-alura.andysteel.vercel.app/"></meta>
                <meta property="twitter:title" content="GOT - quiz"></meta>
                <meta property="twitter:description" content="Desafie seus conhecimentos sobre Game of Thrones"></meta>
                <meta property="twitter:image" content={db.bg}></meta>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet"></link>
            </Head>
        </div>
    )
}

export default HeadSection;