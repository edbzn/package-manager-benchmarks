# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _7 avr. 2024, 07:15_ (_daily_ updated).

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
| install |       |          |             | 23.6s | 6.4s | 10s | 2.8s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 68ms |
| install | ✔     | ✔        |             | 5.4s | 2.1s | 3.6s | 1s | 508ms |
| install | ✔     |          |             | 9.9s | 4.8s | 5.1s | 2.5s | 541ms |
| install |       | ✔        |             | 9s | 3.7s | 3.6s | 1s | 434ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.7s | n/a | 72ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 55ms |
| install |       |          | ✔           | 1.6s | 3.8s | 2.8s | n/a | 81ms |
| update  | n/a | n/a | n/a | 1.4s | 3.8s | 13.3s | 3.3s | 59ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 25.1s | 5s | 6s | 2.4s | 1.2s |
| install | ✔     | ✔        | ✔           | 1.1s | 931ms | 1.1s | n/a | 41ms |
| install | ✔     | ✔        |             | 4s | 1.7s | 2.8s | 969ms | 362ms |
| install | ✔     |          |             | 7.4s | 3.9s | 4s | 2s | 386ms |
| install |       | ✔        |             | 6.7s | 3.1s | 2.8s | 959ms | 331ms |
| install | ✔     |          | ✔           | 1.2s | 1.6s | 2.2s | n/a | 62ms |
| install |       | ✔        | ✔           | 1.1s | 926ms | 1.1s | n/a | 39ms |
| install |       |          | ✔           | 1.3s | 3.1s | 2.2s | n/a | 48ms |
| update  | n/a | n/a | n/a | 1.1s | 2.9s | 11.2s | 3.5s | 35ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.2s | 6.6s | 11.1s | 2.9s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 8s | 2.2s | 5.2s | 1.3s | 799ms |
| install | ✔     |          |             | 12.2s | 4.7s | 6.6s | 2.4s | 805ms |
| install |       | ✔        |             | 10.7s | 4.3s | 5.2s | 1.3s | 756ms |
| install | ✔     |          | ✔           | 1.2s | 1.9s | 2.7s | n/a | 53ms |
| install |       | ✔        | ✔           | 1.1s | 1s | 1.5s | n/a | 34ms |
| install |       |          | ✔           | 1.2s | 4.4s | 2.6s | n/a | 53ms |
| update  | n/a | n/a | n/a | 1.1s | 3.6s | 8.4s | 2.6s | 40ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.4s | 6.3s | 7.8s | 3s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 6.4s | 2.2s | 4.1s | 1.2s | 505ms |
| install | ✔     |          |             | 10.3s | 4.6s | 5.4s | 2.5s | 496ms |
| install |       | ✔        |             | 9.6s | 4.1s | 4.1s | 1.2s | 474ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.8s | n/a | 60ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 39ms |
| install |       |          | ✔           | 1.6s | 4.1s | 2.8s | n/a | 57ms |
| update  | n/a | n/a | n/a | 1.3s | 3.6s | 5.3s | 2.4s | 52ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 34.6s | 8s | 10.4s | 3.5s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.5s | 1.1s | 1.7s | n/a | 56ms |
| install | ✔     | ✔        |             | 8.1s | 2.6s | 5.6s | 1.4s | 663ms |
| install | ✔     |          |             | 13.1s | 5.7s | 7.3s | 2.9s | 716ms |
| install |       | ✔        |             | 12s | 5.4s | 5.7s | 1.4s | 696ms |
| install | ✔     |          | ✔           | 1.8s | 2.3s | 3.2s | n/a | 91ms |
| install |       | ✔        | ✔           | 1.5s | 1.1s | 1.7s | n/a | 59ms |
| install |       |          | ✔           | 1.8s | 5.5s | 3.2s | n/a | 85ms |
| update  | n/a | n/a | n/a | 1.5s | 4.6s | 4.8s | 3s | 125ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />