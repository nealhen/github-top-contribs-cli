var argv = require('yargs').argv;
const fetch = require('node-fetch');

const owner = argv.owner;
const limit = argv.limit;
const concurrency = argv.concurrency;
const accessToken = argv.accesstoken;


const reposURL = `https://api.github.com/users/${owner}/repos`;
let contributors = [];

if (owner && limit && concurrency && accessToken){
    getData(reposURL).then((repos) => {
        getUsers(repos).then(() => {
            contributors.sort((a, b) => b.contribs - a.contribs);
            outputData(contributors.slice(0, limit));
        }).catch((e) => console.log("error: ", e));
    });
} else {
    console.log('Please enter the arguments in the following format "--owner awslabs --limit 10 --concurrency 5 --accesstoken 1234xyz"');
}

async function buildResults(users) {
    return Promise.all(
        users.map(user => {
            const contributor = {};
            if (!contributors.some((element) => element.login === user.login)) {
                // add contib to array with no.
                contributor.login = user.login;
                contributor.contribs = user.contributions;
                contributors.push(contributor);
            } else {
                const elementsIndex = contributors.findIndex(element => element.login === user.login);
                let newArray = [...contributors];
                newArray[elementsIndex] = { ...newArray[elementsIndex], contribs: newArray[elementsIndex].contribs + user.contributions };
                contributors = newArray;
            }
        })
    )
}

async function getUsers(repos) {
    return Promise.all(repos.map(repo => {
        return getData(`https://api.github.com/repos/${owner}/${repo.name}/contributors`).then((users) => {
            buildResults(users);
        });
    }));
}

async function getData(url = '', /* */) {
    const headers = {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cahce: 'default',
        headers: headers
    }).then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // if request limit hit return error
        // if more than one page call getData(nextLink); and concat response. Make this func. recursive
        return response;
    });
    const results = await response.json();
    return results;
}

function outputData(data) {
    data.forEach((row) => {
        console.log(`${row.login}, ${row.contribs}`);
    });
}
