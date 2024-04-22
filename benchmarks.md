# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _22 avr. 2024, 07:06_ (_daily_ updated).

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
| install |       |          |             | 22.5s | 8s | 10s | 2.8s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.4s | 984ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.4s | 2s | 3.6s | 1s | 417ms |
| install | ✔     |          |             | 9.7s | 5.3s | 5.1s | 2.5s | 467ms |
| install |       | ✔        |             | 8.8s | 4.3s | 3.6s | 1s | 388ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.7s | n/a | 48ms |
| install |       | ✔        | ✔           | 1.4s | 994ms | 1.3s | n/a | 30ms |
| install |       |          | ✔           | 1.6s | 4.7s | 2.8s | n/a | 46ms |
| update  | n/a | n/a | n/a | 1.3s | 4.4s | 13.3s | 3.3s | 32ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 6.3s | 6s | 2.4s | 1.2s |
| install | ✔     | ✔        | ✔           | 1.1s | 891ms | 1.1s | n/a | 26ms |
| install | ✔     | ✔        |             | 4s | 1.7s | 2.8s | 969ms | 339ms |
| install | ✔     |          |             | 7.3s | 4.2s | 4s | 2s | 347ms |
| install |       | ✔        |             | 6.6s | 3.7s | 2.8s | 959ms | 308ms |
| install | ✔     |          | ✔           | 1.2s | 1.5s | 2.2s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.1s | 901ms | 1.1s | n/a | 24ms |
| install |       |          | ✔           | 1.3s | 3.8s | 2.2s | n/a | 37ms |
| update  | n/a | n/a | n/a | 1.1s | 3.4s | 11.2s | 3.5s | 26ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.4s | 7.9s | 11.1s | 2.9s | 1.7s |
| install | ✔     | ✔        | ✔           | 1s | 977ms | 1.5s | n/a | 26ms |
| install | ✔     | ✔        |             | 7.8s | 2.1s | 5.2s | 1.3s | 788ms |
| install | ✔     |          |             | 12.2s | 5s | 6.6s | 2.4s | 763ms |
| install |       | ✔        |             | 10.7s | 4.5s | 5.2s | 1.3s | 717ms |
| install | ✔     |          | ✔           | 1.2s | 1.9s | 2.7s | n/a | 39ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.5s | n/a | 23ms |
| install |       |          | ✔           | 1.2s | 5s | 2.6s | n/a | 38ms |
| update  | n/a | n/a | n/a | 1s | 4s | 8.4s | 2.6s | 26ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.5s | 7.8s | 7.8s | 3s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 29ms |
| install | ✔     | ✔        |             | 6.2s | 2.1s | 4.1s | 1.2s | 499ms |
| install | ✔     |          |             | 10.2s | 5.1s | 5.4s | 2.5s | 459ms |
| install |       | ✔        |             | 9.4s | 4.5s | 4.1s | 1.2s | 449ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.8s | n/a | 43ms |
| install |       | ✔        | ✔           | 1.3s | 999ms | 1.5s | n/a | 26ms |
| install |       |          | ✔           | 1.6s | 4.8s | 2.8s | n/a | 41ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 5.3s | 2.4s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 33s | 11.8s | 10.4s | 3.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.7s | n/a | 37ms |
| install | ✔     | ✔        |             | 7.9s | 2.5s | 5.6s | 1.4s | 650ms |
| install | ✔     |          |             | 13s | 6.2s | 7.3s | 2.9s | 670ms |
| install |       | ✔        |             | 11.7s | 5.8s | 5.7s | 1.4s | 648ms |
| install | ✔     |          | ✔           | 1.7s | 2.4s | 3.2s | n/a | 56ms |
| install |       | ✔        | ✔           | 1.5s | 1s | 1.7s | n/a | 33ms |
| install |       |          | ✔           | 1.7s | 6.3s | 3.2s | n/a | 53ms |
| update  | n/a | n/a | n/a | 1.4s | 5.2s | 4.8s | 3s | 87ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />