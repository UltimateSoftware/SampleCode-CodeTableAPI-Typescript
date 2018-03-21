import * as accountData from '../accountSecretData.json';
import * as axios from 'axios';
import {CodeTableModel} from './model/codeTableModel';

//Get the username and password from the accountData file.
const userPass = accountData.userName + ':' + accountData.password;

//Used to convert username + password to base 64 encoded string for API Authorization
const buf = Buffer.from(userPass, 'ascii');
const base64BasicAuth = 'Basic ' + buf.toString('base64');

//Create headers
const headers = {
    'Authorization': base64BasicAuth,
    'US-Customer-Api-Key': accountData.customerAPIKey,
    'Content-Type': 'application/json'
};

//How long to wait in MS before timing out on the request (5000 = 5 seconds)
const timeout = 5000;

const instance = axios.create({
    baseURL: 'https://' + accountData.ultiProCoreURI + '/configuration/v1/code-tables',
    timeout: timeout,
    headers: headers
});

instance.get()
    .then(response => {
        //put entire response into an array.
        let codeTables: Array<CodeTableModel> = response.data;
        //console.log(codeTables);

        //get a specific code table from the array of code tables
        let codeTable: CodeTableModel = codeTables[20];

        console.log(codeTable);

        const instance2 = axios.create({
            baseURL: codeTable.url,
            timeout: timeout,
            headers: headers
        });

        instance2.get()
            .then(response2 => {
                console.log(response2.data);
            })
            .catch(error => {
                console.log(error);
            });


    })
    .catch(error => {
        console.log(error);
    });
