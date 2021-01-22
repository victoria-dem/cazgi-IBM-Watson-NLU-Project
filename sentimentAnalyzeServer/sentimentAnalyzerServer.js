const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();


function getAnalyzeParam (sourceType, analyzeType, data) {
    let analyzeParam = {};
    analyzeParam[sourceType] = data;
    analyzeParam.features = {}
    analyzeParam.features[analyzeType] = {};
    return analyzeParam;
}


function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    getNLUInstance().analyze(getAnalyzeParam('url','emotion', req.query.url))
        .then(analysisResults => {
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

app.get("/url/sentiment", (req,res) => {
    getNLUInstance().analyze(getAnalyzeParam('url','sentiment', req.query.url))
        .then(analysisResults => {
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

app.get("/text/emotion", (req,res) => {
    getNLUInstance().analyze(getAnalyzeParam('text','emotion', req.query.text))
        .then(analysisResults => {
          return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
          return res.send(err.toString());
        });
});

app.get("/text/sentiment", (req,res) => {
    getNLUInstance().analyze(getAnalyzeParam('text','sentiment', req.query.text))
        .then(analysisResults => {
            console.log(typeof JSON.stringify(analysisResults));
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

