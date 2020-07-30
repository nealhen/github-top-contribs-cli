GitHub Top Contributors CLI

Description - Comand line interface that queries the GitHub API and returns the top N contributors per account.

Requirements - node.js

Installation - run `npm install` to install dependancies

Usage  - use the following command 
`node index.js --owner awslabs --limit 10 --concurrency 5 --accesstoken 123xtz` 

Limititations - This app does not acocunt for pagination. There is no maximum number of concurrent requests. I did not encounter a limit on concurrent requests when testing and I could not find any mention of a conurrent request limit in the GitHub API documentation.