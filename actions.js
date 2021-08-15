
const runAction = async (filename) => {
    try {
        const { mongodb, pg, workdir } = require(`${process.cwd()}\\config`);
        const scriptFunc = require(`${process.cwd()}\\${workdir}\\${filename}`);
        const clientBootstrap = require('./src/bootstrap');

        await clientBootstrap(pg, mongodb, scriptFunc);

        console.log('Script running successfully!!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    runAction
};
