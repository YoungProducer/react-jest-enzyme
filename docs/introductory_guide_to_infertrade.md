## INFERTRADE USAGE INTRODUCTION

This document explains the basics of using the InferTrade tool.

### Login

The first step to using the tool is to login.

To do so go to https://www.infertrade.com and enter your referral code. If you do not have a referral code please contact support@infertrade.com to request one.

### Data retrieval

Once inside the tool you will see a set of tabs to the left and a graphing area in the middle.

You can click on the example data to load some pre-created data.

To add some custom data there are two approaches: quandl import or drag and drop.

### Get data from `Quandl`

Click on the graphing tab (has an up arrow symbol)

Then click the plus arrow to the right of Data Sources.

Then click `Quandl`.

When the menu pops up search for a code in quandl link or use this E.g. `"EURONEXT/ADYEN"`, add specific columns and/or select the data range if you want, and click `"SUBMIT"`.

A notification should pop up in bottom right corner saying that the data is being retrieved, followed by another saying the retrieval was successful added.

### Drag and drop files into the graphing area

You can drag and drop files in empty graphing space or drag and drop files in same space of another graphing to compare those,
It is also possible to modify the size of the graphs to add graphs next to each other.

### Graphing

Once you have loaded some data go to specific `Data Source` then click in `Manipulate data` and `View Series`, or click on the graphing tab (has a little graph symbol).

You will see several button-like 'chips' in categories on the left.

To plot these time series drag the chips into the graphing area.

You can edit, duplicate or delete the time series under the triple dots on the top-right of the graph. Edit mode allows you to remove series or drag-and-drop them to other graphs and Add new Tab.

When time series are loaded they are auto-classified, but if the classifications are wrong you can drag and drop the time series chip into the correct category. It is also possible to change graphs names.

Data can be exported into csv using `"Export"` under the triple dot menu.

You can click on the '+' sign to add an empty graph area and plot time-series on it.

## Creating trading rules

To add a trading rule, click on the trading rule tab, with a `F(x)` symbol.

You click the plus next to the title then pick the rule called `"ExponentialOne"`.

Once a rule is created you need to tell it which time series to use. To do so, click on the `"Time series"` accordian then click on the `Research series` and select. Then select a `"Price to use"` dropdown and select a `Price series`.
you should see bottom right corner `"New time series ExponentialOne added"`.

After you have selected the necessary data two extra time series chips will appear:

-   the position series
-   the performance series

The former calculates the trading rule's recommended portfolio allocation into the trading security as a fraction of the overall portfolio. So 0.5 means put 50% into the traded assset.
The latter calculates the performance of carrying out the strategy - a value of 1 means the portfolio is at the starting value, 1.5 means the portfolio has gained 50% in value.

The trading rule originally uses default settings, but you can adjust these by clicking on the `"Parameters"` accordian entry and moving the sliders or just click in `"TRY NEW"` for randon settings or go back in `"RESTORE DEFAULT"`.

## Optimising trading rules

To optimize a trading rule, click on the trading rule tab in `Optimizer` option.

For a New `Optimisation` you can give a `Name`, and at one `Price Series`, one `Research Series`, one `Rule` and select `Portfolio Restrictions` that you previously created (and populated with Time series choices), or click the triple dot icon in the top right and select the `"Optimise rule"` option. after click you should see an bottom right corner `Rule optimisation starting`.

A new trading rule should be created with a spinner showing it is calculating.

After calculation has finished the trading rule will show updated parameter settings, matching the best that could be found, and offering position and performance chips that can be plotted.

## Optimisation panel

TODO - needs some info on how to use the optimiser panel search.

## Account Creation

Click on the `Save my work` tab (with a floppy/save symbol)and fill in the details for a new user.
Minimum requirements for passwords are twelve characters.
Once done, click on the `CREATE MY ACCOUNT` button. You should be receiving a new account creation email on the registered email address.
