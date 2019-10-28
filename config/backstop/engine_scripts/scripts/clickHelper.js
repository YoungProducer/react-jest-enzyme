/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// OnReady example (puppeteer engine)
module.exports = async (page, scenario) => {
	const clickSelector = scenario.clickSelectors || scenario.clickSelector;

	if (clickSelector) {
		for (const clickSelectorIndex of [].concat(clickSelector)) {
			await page.waitFor(clickSelectorIndex);
			await page.click(clickSelectorIndex);
			await page.waitFor(1500);
		}
	}
};
