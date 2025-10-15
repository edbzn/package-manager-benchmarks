# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _15 oct. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 21.6s | 6.3s | 9.6s | 2.7s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 650ms | 1.1s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.6s | 1.7s | 3.5s | 990ms | 436ms |
| install | ✔     |          |             | 9.3s | 4.6s | 5.1s | 2.3s | 418ms |
| install |       | ✔        |             | 8.3s | 3.4s | 3.6s | 984ms | 413ms |
| install | ✔     |          | ✔           | 1.7s | 1.4s | 2.6s | n/a | 34ms |
| install |       | ✔        | ✔           | 1.2s | 667ms | 1.2s | n/a | 30ms |
| install |       |          | ✔           | 1.6s | 3.4s | 2.6s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 3.4s | 12.1s | 3.1s | 34ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.5s | 4.9s | 5.7s | 2.3s | 981ms |
| install | ✔     | ✔        | ✔           | 958ms | 583ms | 1s | n/a | 26ms |
| install | ✔     | ✔        |             | 4.2s | 1.4s | 2.7s | 860ms | 326ms |
| install | ✔     |          |             | 6.9s | 3.6s | 3.9s | 2s | 333ms |
| install |       | ✔        |             | 6.4s | 2.7s | 2.7s | 861ms | 335ms |
| install | ✔     |          | ✔           | 1.2s | 1.2s | 2.1s | n/a | 28ms |
| install |       | ✔        | ✔           | 951ms | 551ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.2s | 2.7s | 2.1s | n/a | 24ms |
| update  | n/a | n/a | n/a | 947ms | 2.6s | 7.9s | 2.8s | 26ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.6s | 6.5s | 10.7s | 2.8s | 1.6s |
| install | ✔     | ✔        | ✔           | 900ms | 681ms | 1.3s | n/a | 28ms |
| install | ✔     | ✔        |             | 9.4s | 1.8s | 5.2s | 1.2s | 847ms |
| install | ✔     |          |             | 12.7s | 4.6s | 6.5s | 2.3s | 807ms |
| install |       | ✔        |             | 11.7s | 3.9s | 5.2s | 1.2s | 815ms |
| install | ✔     |          | ✔           | 1.8s | 1.5s | 2.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 905ms | 660ms | 1.3s | n/a | 25ms |
| install |       |          | ✔           | 1.7s | 4.2s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 903ms | 3.1s | 10s | 2.7s | 32ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.4s | 6.1s | 7.5s | 2.9s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.2s | 633ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 7.3s | 1.8s | 4s | 1.1s | 467ms |
| install | ✔     |          |             | 10.6s | 4.4s | 5.5s | 2.5s | 481ms |
| install |       | ✔        |             | 9.8s | 3.8s | 4.1s | 1.1s | 460ms |
| install | ✔     |          | ✔           | 1.6s | 1.5s | 2.7s | n/a | 30ms |
| install |       | ✔        | ✔           | 1.1s | 650ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.6s | 13s | 2.7s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.2s | 3.2s | 5.4s | 2.4s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 35.7s | 8.5s | 10.1s | 3.4s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.3s | 699ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 8.6s | 2.3s | 5.5s | 1.3s | 705ms |
| install | ✔     |          |             | 12.9s | 5.5s | 7.2s | 2.8s | 703ms |
| install |       | ✔        |             | 11.6s | 5s | 5.6s | 1.3s | 704ms |
| install | ✔     |          | ✔           | 1.7s | 1.8s | 3s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.2s | 812ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.7s | 5.2s | 3s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 5.3s | 2.9s | 96ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />