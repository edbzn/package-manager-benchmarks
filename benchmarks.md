# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _11 avr. 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 20.6s | 6.2s | 9.9s | 4.6s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 800ms | 1.2s | n/a | 36ms |
| install | ✔     | ✔        |             | 5s | 1.8s | 3.5s | 997ms | 455ms |
| install | ✔     |          |             | 8.5s | 4.4s | 6.9s | 4.3s | 443ms |
| install |       | ✔        |             | 7.6s | 3.5s | 3.5s | 1s | 429ms |
| install | ✔     |          | ✔           | 1.5s | 1.6s | 4.5s | n/a | 35ms |
| install |       | ✔        | ✔           | 1.2s | 765ms | 1.2s | n/a | 32ms |
| install |       |          | ✔           | 1.4s | 3.4s | 4.6s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.2s | 3.6s | 13.1s | 6.6s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 4.7s | 6.7s | 3.7s | 1s |
| install | ✔     | ✔        | ✔           | 969ms | 703ms | 1s | n/a | 29ms |
| install | ✔     | ✔        |             | 3.8s | 1.5s | 2.7s | 894ms | 362ms |
| install | ✔     |          |             | 6.2s | 3.6s | 5.3s | 3.4s | 373ms |
| install |       | ✔        |             | 5.6s | 2.7s | 2.7s | 885ms | 347ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 3.6s | n/a | 27ms |
| install |       | ✔        | ✔           | 959ms | 672ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1.1s | 2.7s | 3.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 955ms | 2.6s | 9.4s | 4.8s | 29ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6s | 11.8s | 4.6s | 1.7s |
| install | ✔     | ✔        | ✔           | 935ms | 767ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 7.9s | 1.8s | 5.2s | 1.2s | 895ms |
| install | ✔     |          |             | 10.9s | 4.2s | 8.3s | 4.2s | 863ms |
| install |       | ✔        |             | 9.9s | 3.8s | 5.2s | 1.2s | 858ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.3s | n/a | 29ms |
| install |       | ✔        | ✔           | 928ms | 739ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1s | 3.8s | 4.3s | n/a | 27ms |
| update  | n/a | n/a | n/a | 923ms | 3.2s | 10.6s | 4.5s | 34ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 22.7s | 5.8s | 8.9s | 4.8s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 752ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.9s | 1.9s | 3.9s | 1.2s | 511ms |
| install | ✔     |          |             | 9s | 4.3s | 7.2s | 4.3s | 477ms |
| install |       | ✔        |             | 8.1s | 3.7s | 4s | 1.2s | 479ms |
| install | ✔     |          | ✔           | 1.4s | 1.4s | 4.5s | n/a | 32ms |
| install |       | ✔        | ✔           | 1.2s | 724ms | 1.3s | n/a | 29ms |
| install |       |          | ✔           | 1.4s | 3.7s | 4.5s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 7.1s | 4.4s | 40ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.5s | 7.4s | 11.6s | 5.7s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.3s | 795ms | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 7.5s | 2.3s | 5.3s | 1.3s | 723ms |
| install | ✔     |          |             | 11.9s | 5.2s | 9.2s | 5.2s | 718ms |
| install |       | ✔        |             | 10.5s | 4.7s | 5.4s | 1.3s | 728ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 5.3s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.3s | 799ms | 1.5s | n/a | 37ms |
| install |       |          | ✔           | 1.6s | 4.9s | 5.3s | n/a | 37ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 6.4s | 5.2s | 92ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />