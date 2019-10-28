/* eslint-env node */
// Figure out where the static server is hosted
const HOST = process.env.CI
	? 'http://127.0.0.1:8080'
	: 'http://host.docker.internal:8080';

// Defaults for tests
const TEST_DEFAULTS = {
	delay: 2500,
	postInteractionWait: 2500,
	selectorExpansion: true,
	expect: 0,
	misMatchThreshold: 0,
	requireSameDimensions: true,
};

const LANDING_PAGE_TEST = {
	label: 'landing page',
	url: `${HOST}/`,
	...TEST_DEFAULTS,
};
const LOGIN_PAGE_TEST = {
	label: 'login page',
	url: `${HOST}/login`,
	...TEST_DEFAULTS,
};
const WELCOME_HELP_MODAL_TEST = {
	label: 'welcome help modal',
	url: `${HOST}/`,
	clickSelectors: ['[data-test="help-icon"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const RESET_PASSWORD_PAGE_TEST = {
	label: 'reset password page',
	url: `${HOST}/reset-password`,
	...TEST_DEFAULTS,
};
const RESET_PASSWORD_CONFIRM_PAGE_TEST = {
	label: 'reset password confirm page',
	url: `${HOST}/reset-password/confirm`,
	...TEST_DEFAULTS,
};
const PRIVACY_POLICY_PAGE_TEST = {
	label: 'privacy policy',
	url: `${HOST}/privacy-policy`,
	...TEST_DEFAULTS,
};
const DASHBOARD_PAGE_TEST = {
	label: 'dashboard page',
	url: `${HOST}/dashboard`,
	...TEST_DEFAULTS,
	onReadyScript: 'scripts/dashboard.js',
};
const DASHBOARD_TOGGLE_TABS_TEST = {
	label: 'dashboard toggle left tabs labels',
	url: `${HOST}/dashboard`,
	clickSelectors: ['[data-test="open-button"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const ACCOUNT_CREATION_MODAL_TEST = {
	label: 'account creation modal',
	url: `${HOST}/dashboard`,
	clickSelectors: ['[data-test="CreateAccountModalButton"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const ACCOUNT_CREATION_HELP_MODAL_TEST = {
	label: 'account creation help modal',
	url: `${HOST}/dashboard`,
	clickSelectors: [
		'[data-test="CreateAccountModalButton"]',
		'[data-test="CreateAccountHelpButton"]',
	],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const DASHBOARD_HELP_MODAL_TEST = {
	label: 'dashboard help modal',
	url: `${HOST}/dashboard`,
	clickSelectors: ['[data-test="HelpModalButton"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const ACCOUNT_UPDATE_PAGE_TEST = {
	label: 'account update page',
	url: `${HOST}/dashboard/account`,
	...TEST_DEFAULTS,
};
const ACCOUNT_RESET_PASSWORD_MODAL_TEST = {
	label: 'account reset password modal',
	url: `${HOST}/dashboard/account`,
	clickSelectors: ['[data-test="open-reset-password"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const ACCOUNT_DELETE_ACCOUNT_MODAL_TEST = {
	label: 'account delete account modal',
	url: `${HOST}/dashboard/account`,
	clickSelectors: ['[data-test="open-delete-user"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const DATA_SOURCES_PANEL_TEST = {
	label: 'data sources panel',
	url: `${HOST}/dashboard/data-sources`,
	...TEST_DEFAULTS,
};
const NEW_DATA_SOURCE_MODAL_TEST = {
	label: 'new data source modal',
	url: `${HOST}/dashboard/data-sources`,
	clickSelectors: ['[data-test="open-dialogue-button"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const NEW_LOCAL_DATA_SOURCE_MODAL_TEST = {
	label: 'new local data source modal',
	url: `${HOST}/dashboard/data-sources`,
	clickSelectors: [
		'[data-test="open-dialogue-button"]',
		'[data-test="LOCAL_DATA_SOURCE-list-item"]',
	],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const NEW_QUANDL_DATA_SOURCE_MODAL_TEST = {
	label: 'new quandl data source modal',
	url: `${HOST}/dashboard/data-sources`,
	clickSelectors: [
		'[data-test="open-dialogue-button"]',
		'[data-test="QUANDL_DATA_SOURCE-list-item"]',
	],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const NEW_ALPHA_DATA_SOURCE_MODAL_TEST = {
	label: 'new alpha data source modal',
	url: `${HOST}/dashboard/data-sources`,
	clickSelectors: [
		'[data-test="open-dialogue-button"]',
		'[data-test="ALPHA_DATA_SOURCE-list-item"]',
	],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const NEW_IEX_DATA_SOURCE_MODAL_TEST = {
	label: 'new iex data source modal',
	url: `${HOST}/dashboard/data-sources`,
	clickSelectors: [
		'[data-test="open-dialogue-button"]',
		'[data-test="IEX_DATA_SOURCE-list-item"]',
	],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const GRAPH_PANEL_TEST = {
	label: 'graph sources panel',
	url: `${HOST}/dashboard/graphing`,
	...TEST_DEFAULTS,
};
const TRADING_RULES_PANEL_TEST = {
	label: 'trading rules panel',
	url: `${HOST}/dashboard/trading-rules`,
	...TEST_DEFAULTS,
};
const NEW_TRADING_RULE_MODAL_TEST = {
	label: 'new trading rule modal',
	url: `${HOST}/dashboard/trading-rules`,
	clickSelectors: ['[data-test="open-dialogue-button"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};
const SHARING_PAGE_TEST = {
	label: 'sharing page',
	url: `${HOST}/dashboard/sharing`,
	...TEST_DEFAULTS,
};
const OPTIMISATION_PAGE_TEST = {
	label: 'optimisation page',
	url: `${HOST}/dashboard/optimisation`,
	...TEST_DEFAULTS,
};
const NEW_OPTIMISATION_MODAL_TEST = {
	label: 'new optimisation modal',
	url: `${HOST}/dashboard/optimisation`,
	clickSelectors: ['[data-test="newOptimisationButton"]'],
	onReadyScript: 'scripts/clickHelper.js',
	...TEST_DEFAULTS,
};

module.exports = [
	LANDING_PAGE_TEST,
	LOGIN_PAGE_TEST,
	WELCOME_HELP_MODAL_TEST,
	RESET_PASSWORD_PAGE_TEST,
	RESET_PASSWORD_CONFIRM_PAGE_TEST,
	PRIVACY_POLICY_PAGE_TEST,
	DASHBOARD_PAGE_TEST,
	DASHBOARD_TOGGLE_TABS_TEST,
	ACCOUNT_CREATION_MODAL_TEST,
	ACCOUNT_CREATION_HELP_MODAL_TEST,
	DASHBOARD_HELP_MODAL_TEST,
	ACCOUNT_UPDATE_PAGE_TEST,
	ACCOUNT_RESET_PASSWORD_MODAL_TEST,
	ACCOUNT_DELETE_ACCOUNT_MODAL_TEST,
	DATA_SOURCES_PANEL_TEST,
	NEW_DATA_SOURCE_MODAL_TEST,
	NEW_LOCAL_DATA_SOURCE_MODAL_TEST,
	NEW_QUANDL_DATA_SOURCE_MODAL_TEST,
	NEW_ALPHA_DATA_SOURCE_MODAL_TEST,
	NEW_IEX_DATA_SOURCE_MODAL_TEST,
	GRAPH_PANEL_TEST,
	TRADING_RULES_PANEL_TEST,
	NEW_TRADING_RULE_MODAL_TEST,
	SHARING_PAGE_TEST,
	OPTIMISATION_PAGE_TEST,
	NEW_OPTIMISATION_MODAL_TEST,
];
