const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });
const xlsx = require('xlsx');

AWS.config.update({ region: 'ap-southeast-1' });

export const readXlsx = async (file, sheetName) => {
    const sheets = xlsx.readFile(file).Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheets, { raw: true });
    return data;
};

export const getAllDataFromDynamo = async (TableName, primary, query) => {
    let LastEvaluatedKey = 'start';
    let transactionData = [];

    while (LastEvaluatedKey === 'start' || (LastEvaluatedKey && LastEvaluatedKey[primary])) {
        let dynamoParam = {
            TableName: TableName,
            ...query
        };

        if (LastEvaluatedKey !== 'start') {
            dynamoParam = {
                ...dynamoParam,
                ExclusiveStartKey: LastEvaluatedKey
            };
        }

        const data = await dynamodb.scan(dynamoParam).promise();
        console.log('Get Data Done');
        transactionData = [...transactionData, ...data.Items];

        LastEvaluatedKey = data.LastEvaluatedKey;
    }

    return transactionData;
};

export const toExcel = async (fileName, sheetName, data) => {
    const sheets = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheets, sheetName);
    xlsx.writeFile(workbook, `./${fileName}.xlsx`);
    console.log(`To Excel Done, Saved in ${fileName}`);
};

export const getData = async (table, primary, trxQuery) => {
    const tempData = await getAllDataFromDynamo(table, primary, trxQuery);
    console.log('Get Data Done, Stored in tempData');
    return tempData;
};
