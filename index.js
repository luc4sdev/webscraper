const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const { DownloaderHelper } = require('node-downloader-helper');
const app = express();


/* find the first url */

const url = 'https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss';
let urls;

axios.get(url)
.then(resp => {
    const html = resp.data;
   const $ = cheerio.load(html);
   

   $('.callout', html).each(function() {
        const url = $(this).find('a').attr('href');

       if(url == "https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss/padrao-tiss-2013-novembro-2021") {
        urls = url;
       }
       
   })

   /* find link */

axios.get(urls)
.then(resp => {
    const html = resp.data;
   const $ = cheerio.load(html);
   let link;

   $('a', html).each(function() {
    const urls = $(this).attr('href');

       if(urls == "https://www.gov.br/ans/pt-br/arquivos/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-tiss/padrao-tiss/padrao-tiss_componente-organizacional_202111.pdf") {
        link = urls;
       }
       
   })

   console.log(link);

   const d1 = new DownloaderHelper(link, __dirname);
   d1.on('end', () => console.log("Download Completed"));
   d1.start();
   
}).catch(err => console.log(err));

}).catch(err => console.log(err));




app.listen(8080);

