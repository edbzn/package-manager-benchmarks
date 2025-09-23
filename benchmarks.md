# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _23 sept. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.8s | 10.2s | 9.6s | 2.7s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 659ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5s | 1.7s | 3.6s | 985ms | 432ms |
| install | ✔     |          |             | 8.6s | 6.2s | 5.1s | 2.4s | 416ms |
| install |       | ✔        |             | 7.7s | 5.1s | 3.6s | 991ms | 413ms |
| install | ✔     |          | ✔           | 1.5s | 1.6s | 2.6s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 750ms | 1.1s | n/a | 30ms |
| install |       |          | ✔           | 1.4s | 5.5s | 2.6s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 5.2s | 12.2s | 3.1s | 34ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18s | 7.8s | 5.7s | 2.2s | 978ms |
| install | ✔     | ✔        | ✔           | 944ms | 597ms | 1s | n/a | 26ms |
| install | ✔     | ✔        |             | 3.8s | 1.4s | 2.7s | 867ms | 344ms |
| install | ✔     |          |             | 6.5s | 5.7s | 4.1s | 1.9s | 340ms |
| install |       | ✔        |             | 5.8s | 4.1s | 2.8s | 859ms | 332ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 26ms |
| install |       | ✔        | ✔           | 948ms | 561ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 5.1s | 2.1s | n/a | 23ms |
| update  | n/a | n/a | n/a | 950ms | 3.7s | 8s | 2.9s | 26ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.1s | 9s | 10.6s | 2.8s | 1.6s |
| install | ✔     | ✔        | ✔           | 909ms | 688ms | 1.3s | n/a | 28ms |
| install | ✔     | ✔        |             | 7.8s | 1.8s | 5.2s | 1.2s | 832ms |
| install | ✔     |          |             | 11s | 5.5s | 6.6s | 2.4s | 801ms |
| install |       | ✔        |             | 9.9s | 4.8s | 5.2s | 1.2s | 816ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.6s | n/a | 27ms |
| install |       | ✔        | ✔           | 897ms | 668ms | 1.3s | n/a | 25ms |
| install |       |          | ✔           | 1s | 5.6s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 898ms | 4.3s | 10.4s | 2.9s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 22.1s | 9.2s | 7.6s | 2.9s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 653ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 6s | 1.8s | 4s | 1.1s | 468ms |
| install | ✔     |          |             | 9.2s | 5.7s | 5.5s | 2.4s | 466ms |
| install |       | ✔        |             | 8.5s | 4.9s | 4s | 1.1s | 451ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 2.7s | n/a | 30ms |
| install |       | ✔        | ✔           | 1.2s | 715ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.4s | 5.2s | 2.6s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.1s | 4.9s | 5.5s | 2.3s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.8s | 11.6s | 10.2s | 3.4s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.2s | 690ms | 1.5s | n/a | 39ms |
| install | ✔     | ✔        |             | 7.6s | 2.2s | 5.5s | 1.3s | 699ms |
| install | ✔     |          |             | 12s | 6.9s | 7.3s | 2.9s | 700ms |
| install |       | ✔        |             | 10.6s | 6.5s | 5.6s | 1.3s | 699ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 3.1s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.2s | 686ms | 1.5s | n/a | 34ms |
| install |       |          | ✔           | 1.5s | 6.9s | 3.1s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.2s | 5.6s | 5.4s | 2.9s | 85ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />