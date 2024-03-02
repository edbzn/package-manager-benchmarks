# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _2 mars 2024, 07:15_ (_daily_ updated).

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
| install |       |          |             | 27.9s | 6.2s | 10.3s | 2.8s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 52ms |
| install | ✔     | ✔        |             | 5.1s | 2s | 3.2s | 1s | 447ms |
| install | ✔     |          |             | 9.4s | 4.7s | 4.9s | 2.4s | 462ms |
| install |       | ✔        |             | 12.5s | 3.7s | 3.3s | 1s | 422ms |
| install | ✔     |          | ✔           | 1.6s | 1.8s | 2.8s | n/a | 73ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.3s | n/a | 52ms |
| install |       |          | ✔           | 1.6s | 3.7s | 2.8s | n/a | 72ms |
| update  | n/a | n/a | n/a | 1.3s | 3.8s | 13.5s | 3.3s | 54ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 26.1s | 5.2s | 6.2s | 2.4s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.1s | 905ms | 1.1s | n/a | 35ms |
| install | ✔     | ✔        |             | 3.9s | 1.7s | 2.6s | 940ms | 331ms |
| install | ✔     |          |             | 7s | 3.9s | 3.9s | 2.1s | 380ms |
| install |       | ✔        |             | 9.3s | 3.1s | 2.6s | 943ms | 332ms |
| install | ✔     |          | ✔           | 1.2s | 1.5s | 2.2s | n/a | 47ms |
| install |       | ✔        | ✔           | 1s | 898ms | 1.1s | n/a | 31ms |
| install |       |          | ✔           | 1.2s | 3.1s | 2.2s | n/a | 44ms |
| update  | n/a | n/a | n/a | 1.1s | 2.9s | 9s | 3.4s | 35ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 27.7s | 6.3s | 11.2s | 2.9s | 1.9s |
| install | ✔     | ✔        | ✔           | 1s | 991ms | 1.4s | n/a | 35ms |
| install | ✔     | ✔        |             | 7.7s | 2.1s | 4.8s | 1.2s | 749ms |
| install | ✔     |          |             | 11.6s | 4.5s | 6.2s | 2.4s | 769ms |
| install |       | ✔        |             | 13.2s | 4.1s | 4.8s | 1.2s | 708ms |
| install | ✔     |          | ✔           | 1.2s | 1.8s | 2.7s | n/a | 50ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.4s | n/a | 32ms |
| install |       |          | ✔           | 1.2s | 4.2s | 2.7s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1s | 3.6s | 8.6s | 2.6s | 38ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 29.2s | 6.1s | 7.8s | 3s | 1.1s |
| install | ✔     | ✔        | ✔           | 1.4s | 958ms | 1.5s | n/a | 42ms |
| install | ✔     | ✔        |             | 6s | 2.1s | 3.7s | 1.2s | 449ms |
| install | ✔     |          |             | 9.7s | 4.7s | 5.4s | 2.6s | 481ms |
| install |       | ✔        |             | 12.5s | 4.1s | 3.7s | 1.2s | 435ms |
| install | ✔     |          | ✔           | 1.5s | 1.8s | 2.8s | n/a | 51ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 4.1s | 2.8s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1.3s | 3.5s | 5.4s | 2.4s | 47ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 39.4s | 7.8s | 10.5s | 3.5s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 61ms |
| install | ✔     | ✔        |             | 7.6s | 2.5s | 5s | 1.4s | 658ms |
| install | ✔     |          |             | 12.3s | 5.7s | 7s | 3s | 677ms |
| install |       | ✔        |             | 15.7s | 5.3s | 5.1s | 1.4s | 666ms |
| install | ✔     |          | ✔           | 1.7s | 2.2s | 3.3s | n/a | 78ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.6s | n/a | 55ms |
| install |       |          | ✔           | 1.7s | 5.2s | 3.2s | n/a | 76ms |
| update  | n/a | n/a | n/a | 1.4s | 4.4s | 4.8s | 3.1s | 100ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />