
const runAction = async (filename) => {
    try {
        const { awsConfig, dynamoConfig, workdir } = require(`${process.cwd()}\\config`);
        const scriptFunc = require(`${process.cwd()}\\${workdir}\\${filename}`);
        const clientBootstrap = require('./src/bootstrap');

        await clientBootstrap(awsConfig, dynamoConfig, scriptFunc);

        console.log('Script running successfully!!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    runAction
};
