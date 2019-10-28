/* eslint-env node */
// backstop.config.js
// This is the configuration file for BackstopJS.
// BackstopJS automates visual regression testing of our responsive web UI by comparing DOM screenshots over time.
// https://github.com/garris/BackstopJS

// © Copyright 2019 InferStat All or parts of this software may not be distributed, copied or re-used without the express,
// written permission of either the CEO of InferStat or an authorised representative.
// Created by: William Haynes
// Creation date: 09 April 2019

// InferStat imports
const scenarios = require('./testScenarios');

// Optionally set docker environment to CI based on the machines CI environment variable - multi platform
const environmentConfig = process.env.CI ? '-e CI=$CI' : '';

// Docker command to run backstop tests
const dockerCommandTemplate = `docker run --rm -i --network="host" ${environmentConfig} --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}`;

module.exports = {
	id: 'infertrade',
	viewports: [
		{
			label: 'tablet',
			width: 1024,
			height: 768,
		},
		{
			label: 'desktop',
			width: 1920,
			height: 1080,
		},
	],
	scenarios,
	paths: {
		bitmaps_reference: 'config/backstop/bitmaps_reference',
		bitmaps_test: 'config/backstop/bitmaps_test',
		engine_scripts: 'config/backstop/engine_scripts',
		html_report: 'config/backstop/html_report',
		ci_report: 'config/backstop/ci_report',
	},
	report: ['browser'],
	engine: 'puppeteer',
	engineOptions: {
		args: ['--no-sandbox'],
	},
	asyncCaptureLimit: 1,
	asyncCompareLimit: 10,
	debug: false,
	debugWindow: false,
	dockerCommandTemplate,
};
