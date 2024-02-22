# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _22 févr. 2024, 07:16_ (_daily_ updated).

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
| install |       |          |             | 25.6s | 6.5s | 10.4s | 2.9s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 58ms |
| install | ✔     | ✔        |             | 4.9s | 2.1s | 3.2s | 1s | 446ms |
| install | ✔     |          |             | 9.7s | 5.1s | 4.9s | 2.6s | 457ms |
| install |       | ✔        |             | 9.2s | 3.6s | 3.3s | 1s | 422ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.9s | n/a | 81ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 60ms |
| install |       |          | ✔           | 1.6s | 4s | 2.9s | n/a | 71ms |
| update  | n/a | n/a | n/a | 1.4s | 4.2s | 13.8s | 3.4s | 55ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.5s | 6.2s | 6.4s | 2.5s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.1s | 932ms | 1.1s | n/a | 36ms |
| install | ✔     | ✔        |             | 3.7s | 1.7s | 2.6s | 940ms | 331ms |
| install | ✔     |          |             | 7.3s | 4.5s | 3.9s | 2.1s | 381ms |
| install |       | ✔        |             | 7.1s | 3.1s | 2.6s | 943ms | 335ms |
| install | ✔     |          | ✔           | 1.3s | 1.6s | 2.3s | n/a | 51ms |
| install |       | ✔        | ✔           | 1.1s | 933ms | 1.1s | n/a | 36ms |
| install |       |          | ✔           | 1.3s | 3.1s | 2.3s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1.1s | 3.6s | 9s | 3.4s | 43ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 25.1s | 6.8s | 11.5s | 3.1s | 2.1s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.4s | n/a | 35ms |
| install | ✔     | ✔        |             | 6.9s | 2.1s | 4.8s | 1.2s | 774ms |
| install | ✔     |          |             | 11.5s | 5s | 6.2s | 2.4s | 786ms |
| install |       | ✔        |             | 10.7s | 4.3s | 4.8s | 1.2s | 730ms |
| install | ✔     |          | ✔           | 1.2s | 2s | 2.8s | n/a | 56ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.4s | n/a | 32ms |
| install |       |          | ✔           | 1.2s | 4.2s | 2.8s | n/a | 48ms |
| update  | n/a | n/a | n/a | 1s | 3.6s | 9.5s | 2.7s | 43ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 26.3s | 6.5s | 7.9s | 3.2s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 46ms |
| install | ✔     | ✔        |             | 5.5s | 2.2s | 3.7s | 1.2s | 391ms |
| install | ✔     |          |             | 10s | 5s | 5.4s | 2.6s | 430ms |
| install |       | ✔        |             | 9.5s | 4.1s | 3.7s | 1.2s | 384ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 2.8s | n/a | 61ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.5s | 4.2s | 2.9s | n/a | 55ms |
| update  | n/a | n/a | n/a | 1.3s | 3.6s | 5.7s | 2.6s | 44ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 36.7s | 8.5s | 10.8s | 3.6s | 2.3s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 65ms |
| install | ✔     | ✔        |             | 7s | 2.6s | 5s | 1.4s | 689ms |
| install | ✔     |          |             | 12.4s | 5.9s | 7s | 3s | 687ms |
| install |       | ✔        |             | 11.7s | 5.5s | 5.1s | 1.4s | 679ms |
| install | ✔     |          | ✔           | 1.7s | 2.3s | 3.3s | n/a | 78ms |
| install |       | ✔        | ✔           | 1.4s | 1.1s | 1.6s | n/a | 56ms |
| install |       |          | ✔           | 1.7s | 5.5s | 3.3s | n/a | 76ms |
| update  | n/a | n/a | n/a | 1.4s | 5s | 4.9s | 3.3s | 103ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />