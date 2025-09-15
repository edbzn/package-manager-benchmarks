# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _15 sept. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.8s | 7.4s | 9.7s | 2.6s | 2.2s |
| install | ✔     | ✔        | ✔           | 1.2s | 661ms | 1.2s | n/a | 35ms |
| install | ✔     | ✔        |             | 5.1s | 1.7s | 3.5s | 983ms | 452ms |
| install | ✔     |          |             | 8.8s | 4.7s | 5.1s | 2.3s | 425ms |
| install |       | ✔        |             | 7.8s | 3.5s | 3.6s | 978ms | 436ms |
| install | ✔     |          | ✔           | 1.5s | 1.4s | 2.6s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.2s | 659ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.4s | 4.8s | 2.6s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.6s | 11.8s | 3.1s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 19.1s | 5s | 5.5s | 2.3s | 1.4s |
| install | ✔     | ✔        | ✔           | 957ms | 589ms | 1s | n/a | 27ms |
| install | ✔     | ✔        |             | 3.9s | 1.4s | 2.7s | 866ms | 363ms |
| install | ✔     |          |             | 6.5s | 3.7s | 3.9s | 1.9s | 365ms |
| install |       | ✔        |             | 5.9s | 2.9s | 2.7s | 868ms | 349ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 29ms |
| install |       | ✔        | ✔           | 948ms | 552ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1.1s | 3.4s | 2.1s | n/a | 25ms |
| update  | n/a | n/a | n/a | 956ms | 2.6s | 7.8s | 2.8s | 28ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.7s | 7.6s | 10.6s | 2.8s | 1.6s |
| install | ✔     | ✔        | ✔           | 909ms | 701ms | 1.3s | n/a | 28ms |
| install | ✔     | ✔        |             | 7.8s | 1.8s | 5.1s | 1.2s | 853ms |
| install | ✔     |          |             | 11.1s | 4.6s | 6.6s | 2.3s | 836ms |
| install |       | ✔        |             | 10s | 3.8s | 5.2s | 1.2s | 821ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.5s | n/a | 29ms |
| install |       | ✔        | ✔           | 911ms | 664ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 5s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 903ms | 3.1s | 10.3s | 2.7s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.2s | 6.6s | 7.5s | 2.9s | 2.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 647ms | 1.3s | n/a | 35ms |
| install | ✔     | ✔        |             | 6.1s | 1.8s | 4s | 1.1s | 484ms |
| install | ✔     |          |             | 9.3s | 4.5s | 5.4s | 2.4s | 484ms |
| install |       | ✔        |             | 8.5s | 3.8s | 4.1s | 1.1s | 457ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.6s | n/a | 32ms |
| install |       | ✔        | ✔           | 1.2s | 623ms | 1.3s | n/a | 30ms |
| install |       |          | ✔           | 1.4s | 3.6s | 2.7s | n/a | 29ms |
| update  | n/a | n/a | n/a | 1.2s | 3.2s | 5.4s | 2.3s | 69ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.8s | 8.7s | 10s | 3.3s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.3s | 709ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.7s | 2.2s | 5.6s | 1.3s | 716ms |
| install | ✔     |          |             | 12.1s | 5.6s | 7.2s | 2.8s | 715ms |
| install |       | ✔        |             | 10.7s | 4.9s | 5.6s | 1.3s | 706ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 3s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.3s | 688ms | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.5s | 6.1s | 3s | n/a | 37ms |
| update  | n/a | n/a | n/a | 1.2s | 4.2s | 5.3s | 2.9s | 97ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />