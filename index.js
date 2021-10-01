const express = require('express');
const bodyParser = require('body-parser');
const {getRepeatingWords} = require('./utils/utils')
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', async (req, res)=>{
    res.send('Get Top Occurance List at path /getTopOccurance')
})

app.get('/getTopOccurance', async (req, res)=>{

    let repeatingWords = await getRepeatingWords();
    res.send(repeatingWords)
})


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})