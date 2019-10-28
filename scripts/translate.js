// /translate.js
// Translation Script

// To run the script successfully, the following must be true:
// 1. environment variable GOOGLE_APPLICATION_CREDENTIALS=/path/to/gcp/key/file.json
// 2. the language you want to convert is listed in /src/constants/languages
// 3. a json file corresponding to the language key (e.g. es.json for es) exists in /src/translations, and this contains all they keys that en.json contains.

// © Copyright 2019 InferStat All or parts of this software may not be distributed, copied or re-used without the express,
// written permission of either the CEO of InferStat or an authorised representative.
// Created by: Nazar Vovk
// Creation date: 13 May 2019

/* eslint-env node */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
// Do this as the first thing so that any code reading it knows the right env.
console.log('starting translation script');
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});

// Ensure environment variables are read.
require('../config/env');
const fs = require('fs-extra');
// Imports the Google Cloud client library
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;

const googleCredentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Instantiates a client
const translate = new TranslationServiceClient(googleCredentials); // {projectId});

const languages = require('../src/constants/languages');

const translations = languages.reduce((prev, language) => {
	return {
		...prev,
		// eslint-disable-next-line global-require
		[language.code]: require(`../src/translations/${language.code}.json`),
	};
}, {});
const baseLanguage = translations.en;
const location = 'global';
const projectId = googleCredentials.project_id;

async function translateString(text, targetLanguageCode) {
	console.debug(`translating ${text} to language code ${targetLanguageCode}`);
	// TODO: handling errors where google key is not set properly would be nice - inform runner
	const request = {
		parent: translate.locationPath(projectId, location),
		sourceLanguageCode: 'en-US',
		contents: [text],
		targetLanguageCode,
		mimeType: 'text/plain',
	};
	const [response] = await translate.translateText(request);
	const [{ translatedText }] = response.translations;
	console.log(`translated ${text} to ${translatedText}`);
	return translatedText;
}
async function recursiveTranslation(
	translationElement,
	referenceElement = baseLanguage,
	targetLanguage
) {
	if (referenceElement instanceof Object) {
		const elementKeys = Object.keys(referenceElement);
		return elementKeys.reduce(async (previousPromise, key) => {
			const prev = await previousPromise;
			return {
				...prev,
				[key]: await recursiveTranslation(
					translationElement ? translationElement[key] : undefined,
					referenceElement[key],
					targetLanguage
				),
			};
		}, Promise.resolve({}));
	}
	if (typeof referenceElement === 'string' && !translationElement) {
		const translated = await translateString(
			referenceElement,
			targetLanguage
		);
		return Promise.resolve(translated);
	}
	return translationElement;
}
async function translateAll() {
	const languageKeys = Object.keys(translations);
	const newTranslations = await languageKeys.reduce(
		async (previousPromise, languageKey) => {
			const prev = await previousPromise;
			console.log(`translating to ${languageKey}`);
			const translatedLanguage = await recursiveTranslation(
				translations[languageKey],
				undefined,
				languageKey
			);
			return {
				...prev,
				[languageKey]: translatedLanguage,
			};
		},
		Promise.resolve({})
	);
	return Promise.resolve(newTranslations);
}
translateAll().then(fullTranslations => {
	Object.keys(fullTranslations).forEach(langCode => {
		if (langCode === 'en') return;
		fs.outputJson(
			`src/translations/${langCode}.json`,
			fullTranslations[langCode],
			{
				encoding: 'utf8',
				spaces: '\t',
			},
			err => {
				if (err) console.error(err);
			}
		);
	});
});
