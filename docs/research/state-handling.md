# Suggestions

-   Add directory with the functions changing state version, first one would be adding version property to the current state (see this issue). The current version can be obtainedffrom [here](https://github.com/ProjectOPTimize/infertrade-frontend/releases).

-   `index.js` for this directory would be function that takes state, reads version property and upgrades/downgrades state shape to match version from `STATE_VERSION` env var. For example: given state version is 1.0.0, current is 1.0.3, run it through three handlers (1.0.0 -> 1.0.1 -> 1.0.2 -> 1.0.3).

-   Not to release new version for every state change and have an ability to upgrade state during development, create special function for upgrading state from current to beta version when `STATE_VERSION` = beta. Add this handler when passed state have -beta at the end of version prop.

-   Implement above logic in retrieveState handler.

During development, we should automatically set `STATE_VERSION=beta` and set it to `production` in prod.

Relevant old issues:

https://github.com/ProjectOPTimize/infertrade-frontend/issues/903
https://github.com/ProjectOPTimize/infertrade-backend/issues/182
https://github.com/ProjectOPTimize/infertrade-backend/issues/120
https://github.com/ProjectOPTimize/infertrade-frontend/issues/184
