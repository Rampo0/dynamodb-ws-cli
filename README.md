# dynamodb-ws-cli

A workspace to work with dynamodb

**Installation**

```npm install -g dynamodb-ws-cli```

**How to use :** <br>

1. Go to workspace parent directory and create config.js

```
module.exports = {
    awsConfig: {
        region: 'ap-southeast-1' 
    },
    dynamoConfig: {
        region: 'ap-southeast-1' 
    },
    workdir: 'scripts'
};
```

2. Create directory with name according to the config and add file js <br> {workdir}/filename.js : 

```
const { readXlsx ,getAllDataFromDynamo, toExcel, getData } = require('dynamodb-ws-cli')

module.exports = async (dynamodb) => {
    console.log('running scripts');
};
```

3. Run script with command below on the same directory with config.js

```
dynamodb-ws-cli run <filename>
```
