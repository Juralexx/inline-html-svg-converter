import React from 'react'
import { Helmet } from 'react-helmet-async'

const Head = ({ title, description, image }) => {

    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

    const metadatas = {
        site_name: 'Inline HTML SVG converter',
        title: 'Inline HTML SVG converter - Convert inline HTML SVG to PNG, JPG and SVG images.' || title,
        description: 'Convert inline HTML SVG to PNG, JPG and SVG images.' || description,
        image: `${process.env.REACT_APP_URL}img/html-svg-converter.png` || image,
        url: `${process.env.REACT_APP_URL}${pathname}`
    }

    return (
        <Helmet title={metadatas.title} defaultTitle={metadatas.title} titleTemplate={`%s | ${metadatas.site_name}`}>
            <link rel="icon" href="/img/favicon.ico" />
            <meta name="description" content={metadatas.description} />
            <meta name="image" content={metadatas.image} />

            <meta property="og:site_name" content={metadatas.site_name} />
            <meta property="og:title" content={metadatas.title} />
            <meta property="og:description" content={metadatas.description} />
            <meta property="og:image" content={metadatas.image} />
            <meta property="og:url" content={metadatas.url} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadatas.title} />
            <meta name="twitter:description" content={metadatas.description} />
            <meta name="twitter:image" content={metadatas.image} />
            <meta name="twitter:site" content={metadatas.site_name} />

            {/* <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" /> */}
        </Helmet>
    )
}

export default Head;