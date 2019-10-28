# Bottlenecks

A typically financial market time series used for analysis may be ~10 years long. There are ~252 business days in a year. Correspondingly there are likely to be around ~2.5k rows used in an analysis.

A large file may contain 1000 time series, so equivalent to 2.5m rows or ~1m rows of date, price and research series.

## Network

Average network upload speed for fixed connections as of May 2019 was 28.68MB/s according to speedtest.net/global-index

The UK lags behind the international average at about 13.77

At the upper end this is 3.585 Mb per second, so at 10 seconds that's 35.85 Mb of data.

For the UK that's 1.72125 Mb per second, so 17 Mb in 10 seconds.

|                      | Upload Speed MB | Upload Speed Mb | Mb/10 seconds |
| -------------------- | --------------- | --------------- | ------------- |
| Internationl Average | 28.68           | 3.59            | 36Mb          |
| UK Average           | 13.77           | 1.72            | 17Mb          |

## State size

1 Million rows of csv data with price & valuation in it measured out at 46Mb, 1 Million is somewhat absurd though.

100k rows of csv data with index, price & valuation in it measured out at 4.6Mb.

A few variations:

| Rows | Columns | Size  |
| ---- | ------- | ----- |
| 100  | 3       | 4.7Kb |
| 1k   | 3       | 47Kb  |
| 10k  | 3       | 464Kb |
| 100k | 3       | 4.6Mb |
| 100k | 5       | 8Mb   |
| 1mil | 3       | 46Mb  |
| 1mil | 5       | 80Mb  |

Based on 1000 times series for 10 years of data we therefore expect size of files to be approximately 50MB at most.

## State size & network speed

Setting our save state threshold at 10 seconds renders the current cases, expanded to include multiple data sources (1, 2, & 5)

| Rows | Columns | Size  | # of datasources | Total size | Upload time at international average | Upload time at UK average |
| ---- | ------- | ----- | ---------------- | ---------- | ------------------------------------ | ------------------------- |
| 100  | 3       | 4.7Kb | 1                | 4.7Kb      | ✔️ < 1 second                        | ✔️ < 1 second             |
| 1k   | 3       | 47Kb  | 1                | 47Kb       | ✔️ < 1 second                        | ✔️ < 1 second             |
| 10k  | 3       | 464Kb | 1                | 464Kb      | ✔️ < 1 second                        | ✔️ < 1 second             |
| 100k | 3       | 4.6Mb | 1                | 4.6Mb      | ✔️ 1 second                          | ✔️ 2 seconds              |
| 100k | 5       | 8Mb   | 1                | 8Mb        | ✔️ 2 seconds                         | ✔️ 4 seconds              |
| 1mil | 3       | 46Mb  | 1                | 46Mb       | ❌ 13 seconds                        | ❌ 28 seconds             |
| 1mil | 5       | 80Mb  | 1                | 80Mb       | ❌ 23 seconds                        | ❌ 48 seconds             |
| 100  | 3       | 4.7Kb | 2                | 9.4Kb      | ✔️ < 1 second                        | ✔️ < 1 second             |
| 1k   | 3       | 47Kb  | 2                | 94Kb       | ✔️ < 1 second                        | ✔️ < 1 second             |
| 10k  | 3       | 464Kb | 2                | 928Kb      | ✔️ < 1 second                        | ✔️ < 1 second             |
| 100k | 3       | 4.6Mb | 2                | 9.2Mb      | ✔️ 2 seconds                         | ✔️ 5                      |
| 100k | 5       | 8Mb   | 2                | 16Mb       | ✔️ 4 seconds                         | ✔️ 9 seconds              |
| 1mil | 3       | 46Mb  | 2                | 92Mb       | ❌ 26 seconds                        | ❌ 56 seconds             |
| 1mil | 5       | 80Mb  | 2                | 160Mb      | ❌ 46 seconds                        | ❌ 1 min 37 seconds       |
| 100  | 3       | 4.7Kb | 5                | 23.5Kb     | ✔️ < 1 second                        | ✔️ < 1 second             |
| 1k   | 3       | 47Kb  | 5                | 235Kb      | ✔️ < 1 second                        | ✔️ < 1 second             |
| 10k  | 3       | 464Kb | 5                | 2.32Mb     | ✔️ < 1 second                        | ✔️ 1 seconds              |
| 100k | 3       | 4.6Mb | 5                | 23Mb       | ✔️ 6 seconds                         | ❌ 14 seconds             |
| 100k | 5       | 8Mb   | 5                | 40Mb       | ❌ 11 seconds                        | ❌ 24 seconds             |
| 1mil | 3       | 46Mb  | 5                | 230Mb      | ❌ 1 min 7 seconds                   | ❌ 2 min 20 seconds       |
| 1mil | 5       | 80Mb  | 5                | 400Mb      | ❌ 1 min 56 seconds                  | ❌ 4 min 3 seconds        |

Our limit seems to be around 2 100k 5 column csv data sources. To put things into perspective that is potentially 8 time series spanning across 274 years worth of days!

## Rendering

On rendering this data to the front end ceased to be responsive and the graphing library nivo ran out of stack when trying to
render 1 million rows, we can potentially avert this by subsampling the dataset to do less graphical computations on the client.

100k rows of 3 column data didn't run out of stack, but was noticably laggy to the point of being unusable. 100k rows being
roughly 8Mb of data so is far below the save state timeout threshold of 10 seconds.

## HTTP 413 Request entity too large Threshold

Based on the above it seems reasonable to set our JSON payload thresholds at 50Mb for both publicApi, infertrade-backend, & any load balancers managing traffic to these services. Our current bottleneck is the nivo line rendering which would be breached
far before any state saving network limitation would be reached at about ~18Mb. However we may want to enable larger upload than can be displayed, as the user may use the graphing only for sampling subsets of data at a time.
