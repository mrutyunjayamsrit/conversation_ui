const { json } = require('body-parser');
const { response } = require('express');
const request = require('request');

const key = 'dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9';
const lang = 'en-en';


function getFinalListOfWords(topOccurances){
    return new Promise((resolve, reject)=>{
        let finalResult = [];
        for(let word of topOccurances){
            console.log('Word occurance: ', word);

            const url = getFormattedUrl(key, lang, word[0])
            request.get(url, (err, res, body)=>{
                // console.log(' lookup res status: ', res.statusCode);
                // console.log('Lookup response: ', JSON.parse(body));
                body = JSON.parse(body);
                let synonym = '';
                let pos = ''
                if(body && body.def && body.def[0] && body.def[0].tr && body.def[0].tr[0] && body.def[0].tr[0].syn){

                    synonym = body?.def[0]?.tr[0]?.syn;
                    // console.log('synonyms: ', synonym);
                }
                if(body && body.def && body.def[0] && body.def[0].pos){
                    pos = body.def[0].pos;
                    // console.log('POS: ', pos);
                }
                let occuranceOut = {
                    "Word": word[0],
                    "Output": {
                        "count_of_occurance": word[1],
                        "Synonyms": JSON.stringify(synonym) || {}, 
                        "Pos": JSON.stringify(pos) || ''
                    }
                }
    
                finalResult.push(occuranceOut);
            })
            
        }
        setTimeout(()=>{
            console.log('Final Output', finalResult);
            resolve(finalResult)
        }, 2000)
        
    })
}


function getFormattedUrl(key, lang, text) {
    return `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`
}

module.exports = {
    getFinalListOfWords
}