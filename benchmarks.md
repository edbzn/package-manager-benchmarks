# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _10 oct. 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 22.5s | 6.5s | 9.6s | 2.7s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 640ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.7s | 1.7s | 3.5s | 992ms | 433ms |
| install | ✔     |          |             | 9.3s | 4.5s | 5.1s | 2.3s | 419ms |
| install |       | ✔        |             | 8.4s | 3.4s | 3.6s | 984ms | 416ms |
| install | ✔     |          | ✔           | 1.7s | 1.5s | 2.6s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 645ms | 1.2s | n/a | 30ms |
| install |       |          | ✔           | 1.6s | 3.5s | 2.6s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 3.6s | 12.1s | 3.1s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.5s | 5s | 5.7s | 2.3s | 1s |
| install | ✔     | ✔        | ✔           | 961ms | 589ms | 1s | n/a | 26ms |
| install | ✔     | ✔        |             | 4.2s | 1.4s | 2.7s | 860ms | 332ms |
| install | ✔     |          |             | 6.9s | 3.6s | 3.9s | 2s | 329ms |
| install |       | ✔        |             | 6.4s | 2.8s | 2.7s | 861ms | 332ms |
| install | ✔     |          | ✔           | 1.2s | 1.2s | 2.1s | n/a | 26ms |
| install |       | ✔        | ✔           | 951ms | 564ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.3s | 2.7s | 2.1s | n/a | 23ms |
| update  | n/a | n/a | n/a | 958ms | 2.9s | 7.9s | 2.8s | 26ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.6s | 6.6s | 10.7s | 2.9s | 1.7s |
| install | ✔     | ✔        | ✔           | 905ms | 681ms | 1.3s | n/a | 29ms |
| install | ✔     | ✔        |             | 9.5s | 1.8s | 5.2s | 1.2s | 827ms |
| install | ✔     |          |             | 12.7s | 4.5s | 6.5s | 2.3s | 804ms |
| install |       | ✔        |             | 11.9s | 3.9s | 5.2s | 1.2s | 821ms |
| install | ✔     |          | ✔           | 1.8s | 1.5s | 2.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 910ms | 661ms | 1.3s | n/a | 25ms |
| install |       |          | ✔           | 1.7s | 4.3s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 912ms | 3.2s | 10.2s | 2.7s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.4s | 6.1s | 7.5s | 3s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 644ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 7.3s | 1.8s | 4s | 1.1s | 469ms |
| install | ✔     |          |             | 10.6s | 4.5s | 5.5s | 2.5s | 462ms |
| install |       | ✔        |             | 9.8s | 3.9s | 4.1s | 1.1s | 455ms |
| install | ✔     |          | ✔           | 1.6s | 1.5s | 2.7s | n/a | 30ms |
| install |       | ✔        | ✔           | 1.2s | 678ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.6s | 3.6s | 2.7s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.2s | 3.3s | 5.4s | 2.4s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 35.7s | 8.2s | 10.1s | 3.4s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.3s | 707ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 8.6s | 2.2s | 5.5s | 1.3s | 696ms |
| install | ✔     |          |             | 12.9s | 5.5s | 7.3s | 2.8s | 696ms |
| install |       | ✔        |             | 11.6s | 4.9s | 5.6s | 1.3s | 700ms |
| install | ✔     |          | ✔           | 1.8s | 1.8s | 3.1s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.3s | 866ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.8s | 5.1s | 3s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 5.4s | 2.9s | 86ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />