# Main notes

## manually run tests

Look in file: ```package.json:scripts```

For unit testing
```shell
karma start test/unit/karma.conf.js --single-run
```

For e2e testing
```shell
node test/e2e/runner.js
```

## Test style
**Before:** make doc *.md about module realization plan. Like as ```docs/tests/top-menu.md```
**Many times:**
1. make test, run, look red color answer
2. make realization until test has been green
_...repeat it!_

## What may doing component (entire points)?
1.  Do something on start
2.  Do something on events
