import { checker } from './checker.js'
// set global variable
let newObject

async function handleSubmit(event) {
    // halt refress
    event.preventDefault();
    // grab submitted url text
    let formText = document.getElementById('url').value
    // run url general expression check
    const check = checker(formText)
    // if check is good, run post and get calls. then post outcome to ui
    if(check) {
        await postData('http://localhost:8081/api', {url: formText});
        await fetch('http://localhost:8081/api')
        .then(response => response.json())
        .then(json => newObject = json);
        setHtml(newObject)
    // if check is bad alert and populate default failed output
    } else {
        alert('not a valid URL.');
        const errorOutcome = { 
            status: 'NA',
            model: 'NA',
            score_tag: 'NONE',
            agreement: "NA",
            subjectivity: "NA",
            confidence: "NA",
            irony: "NA"
        } 
        setHtml(errorOutcome)
    }
}
// post meaningCloud api results to endpoint
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        return response;
    } catch (error) {
        console.log('error', error);
    }
};
// set positive and negative results to ui
const setHtml = (newObject) => {
    document.getElementById('polarity').innerHTML = 'Polarity: '+polarity(newObject.score_tag);
    document.getElementById("agreement").innerHTML = `Agreement: ${newObject.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${newObject.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${newObject.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${newObject.irony}`;
}
// handle polarity outcome from meaningCloud Api
const polarity = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEU':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}
// export function handle
export { handleSubmit }