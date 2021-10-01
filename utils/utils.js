const request = require('request');
const fs = require('fs');
const textUrl = 'http://norvig.com/big.txt';
const {getFinalListOfWords} = require('../models/lookup')

const wordsExclude = ['while', 'which', 'their', 'would', 'there', 'could', 'about', 'other', 'should', 'after', 'those', 'before', 'first', 'these', 'being', 'where', 'shall', 'under', 'without', 'still', 'whole', 'began', 'little', 'himself', 'through',  'looked', 'thought', 'seemed', 'between', 'always'];

function getRepeatingWords(){
    return new Promise((resolve, reject)=>{
        let words = {};
        let bodyText = []
        request.get(textUrl, async (err, res, body)=>{
            if (err){
                console.log("Error fetching data: ", err);
            }
            console.log('res status: ', res.statusCode);

            bodyText.push(body.split('\n'));
            let currentLine = bodyText[0];
            bodyText1 = currentLine.filter(Boolean);
            for(let i=0; i < bodyText1.length; i++){
                // console.log('Body: ', bodyText1[i]);
                let lineText = bodyText1[i];
                for(let word of lineText.split(' ')){
                    if (word.length > 4 && !wordsExclude.includes(word)){
                        words[word] = words[word] + 1 || 1;
                    } 
                }
            }
            let sortedWords = sortProperties(words);
            const topOccurances = getTopOccuranceWords(sortedWords);

            const getFinalListWords = await getFinalListOfWords(topOccurances);
            // console.log('topOccurances: ', topOccurances);
            setTimeout(()=>{
                resolve(getFinalListWords)
            }, 1000)
            
        })
    })
}

function sortProperties(obj)
{
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(a, b)
	{
	  return b[1]-a[1]; // compare numbers
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function getTopOccuranceWords(sortedWords){
    let top10Words = [];
    for( let i=0; i<= 10; i++){
        top10Words.push(sortedWords[i])
    }

    return top10Words;
}

module.exports = {
    getRepeatingWords
}