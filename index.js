const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://theguardian.com/uk'

// returns a promise
axios(url)
    .then(response => {
        const html = response.data
        // when using $ grab all html
        const $ = cheerio.load(html)
        const articles = []

        $('.dcr-12ilguo', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT'))