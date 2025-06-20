# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _20 juin 2025, 07:08_ (_daily_ updated).

This benchmark compares the performance of npm, pnpm, Yarn Classic, Yarn PnP, and Bun (check [Yarn's benchmarks](https://yarnpkg.com/benchmarks) for any other Yarn modes that are not included here).

Here's a quick explanation of how these tests could apply to the real world:

- `clean install`: How long it takes to run a totally fresh install: no lockfile present, no packages in the cache, no `node_modules` folder.
- `with cache`, `with lockfile`, `with node_modules`: After the first install is done, the install command is run again.
- `with cache`, `with lockfile`: When a repo is fetched by a developer and installation is first run.
- `with cache`: Same as the one above, but the package manager doesn't have a lockfile to work from.
- `with lockfile`: When an installation runs on a CI server.
- `with cache`, `with node_modules`: The lockfile is deleted and the install command is run again.
- `with node_modules`, `with lockfile`: The package cache is deleted and the install command is run again.
- `with node_modules`: The package cache and the lockfile is deleted and the install command is run again.
- `update`: Updating your dependencies by changing the version in the `package.json` and running the install command again.

## React App

The app's `package.json` [here](./fixtures/react-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 19.6s | 6s | 9.7s | 2.6s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 785ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5s | 1.8s | 3.6s | 982ms | 437ms |
| install | ✔     |          |             | 8.3s | 4.5s | 5s | 2.3s | 431ms |
| install |       | ✔        |             | 7.4s | 3.5s | 3.6s | 973ms | 429ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 2.6s | n/a | 34ms |
| install |       | ✔        | ✔           | 1.2s | 794ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.5s | 3.4s | 2.6s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.5s | 11.8s | 3s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 19.6s | 4.6s | 5.6s | 2.3s | 1.2s |
| install | ✔     | ✔        | ✔           | 955ms | 698ms | 1s | n/a | 27ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.7s | 865ms | 354ms |
| install | ✔     |          |             | 6.2s | 3.5s | 3.8s | 1.9s | 349ms |
| install |       | ✔        |             | 5.6s | 2.7s | 2.7s | 867ms | 346ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 27ms |
| install |       | ✔        | ✔           | 944ms | 674ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 2.7s | 2s | n/a | 24ms |
| update  | n/a | n/a | n/a | 948ms | 2.6s | 7.8s | 2.7s | 27ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.4s | 6.1s | 10.7s | 2.7s | 1.8s |
| install | ✔     | ✔        | ✔           | 916ms | 774ms | 1.3s | n/a | 29ms |
| install | ✔     | ✔        |             | 7.7s | 1.8s | 5.2s | 1.2s | 860ms |
| install | ✔     |          |             | 10.8s | 4.3s | 6.5s | 2.3s | 827ms |
| install |       | ✔        |             | 9.7s | 3.8s | 5.2s | 1.2s | 832ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.5s | n/a | 29ms |
| install |       | ✔        | ✔           | 914ms | 750ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 3.7s | 2.4s | n/a | 26ms |
| update  | n/a | n/a | n/a | 910ms | 3.2s | 9.1s | 2.5s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24s | 5.8s | 7.4s | 2.8s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 754ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 5.9s | 1.9s | 4s | 1.1s | 479ms |
| install | ✔     |          |             | 9s | 4.3s | 5.4s | 2.4s | 481ms |
| install |       | ✔        |             | 8.1s | 3.7s | 4.1s | 1.1s | 461ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.7s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.2s | 742ms | 1.3s | n/a | 28ms |
| install |       |          | ✔           | 1.4s | 3.6s | 2.6s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.2s | 3.1s | 5.5s | 2.3s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 31.2s | 7.4s | 9.9s | 3.4s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.2s | 812ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.6s | 2.3s | 5.6s | 1.3s | 717ms |
| install | ✔     |          |             | 11.5s | 5.3s | 7.2s | 2.8s | 711ms |
| install |       | ✔        |             | 10.2s | 4.7s | 5.6s | 1.3s | 717ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 3s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.3s | 803ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 4.7s | 3s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 5.3s | 2.8s | 85ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />