#!/usr/bin/env node

const program = require('commander');
const { runAction } = require('./actions');

program.version('1.0.0').description('Postgres and MongoDB workspace');

program
    .command('run <filename>')
    .alias('r')
    .description('running a script by filename')
    .action(runAction);

program.parse(process.argv);
