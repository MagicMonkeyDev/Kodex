#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';

program
  .version('1.0.0')
  .description('Kodex CLI tool');

program
  .command('start')
  .description('Start Kodex')
  .action(() => {
    console.log(chalk.green('Starting Kodex...'));
    // Add your start logic here
  });

program
  .command('install')
  .description('Install Kodex dependencies')
  .action(() => {
    console.log(chalk.blue('Installing Kodex dependencies...'));
    // Add installation logic here
  });

program.parse(process.argv); 