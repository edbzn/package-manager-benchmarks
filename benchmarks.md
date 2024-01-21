# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _21 janv. 2024, 07:16_ (_daily_ updated).

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
| install |       |          |             | 19.6s | 6.9s | 10.9s | 2.9s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 66ms |
| install | ✔     | ✔        |             | 4.9s | 2s | 3.3s | 1s | 454ms |
| install | ✔     |          |             | 8.3s | 5.1s | 5s | 2.5s | 463ms |
| install |       | ✔        |             | 9.5s | 3.7s | 3.3s | 1s | 416ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.8s | n/a | 93ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 64ms |
| install |       |          | ✔           | 1.6s | 3.7s | 2.9s | n/a | 72ms |
| update  | n/a | n/a | n/a | 1.4s | 4.1s | 13.8s | 3.5s | 59ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 16.5s | 5.5s | 6.5s | 2.5s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.1s | 931ms | 1.1s | n/a | 44ms |
| install | ✔     | ✔        |             | 3.7s | 1.7s | 2.6s | 971ms | 349ms |
| install | ✔     |          |             | 6.3s | 4.1s | 4.1s | 2.2s | 385ms |
| install |       | ✔        |             | 6.9s | 3.1s | 2.6s | 954ms | 323ms |
| install | ✔     |          | ✔           | 1.3s | 1.6s | 2.4s | n/a | 53ms |
| install |       | ✔        | ✔           | 1.1s | 925ms | 1.1s | n/a | 39ms |
| install |       |          | ✔           | 1.2s | 3.1s | 2.3s | n/a | 47ms |
| update  | n/a | n/a | n/a | 1.1s | 3.3s | 9.3s | 3.4s | 43ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18.1s | 7s | 11.4s | 3.1s | 2.1s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.5s | n/a | 42ms |
| install | ✔     | ✔        |             | 6.9s | 2.1s | 4.7s | 1.3s | 780ms |
| install | ✔     |          |             | 10s | 5s | 6.3s | 2.6s | 771ms |
| install |       | ✔        |             | 10.6s | 4.3s | 4.8s | 1.2s | 736ms |
| install | ✔     |          | ✔           | 1.2s | 2s | 2.8s | n/a | 66ms |
| install |       | ✔        | ✔           | 1.1s | 1s | 1.4s | n/a | 44ms |
| install |       |          | ✔           | 1.2s | 4.2s | 2.7s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1.1s | 3.9s | 9.6s | 2.7s | 45ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.4s | 6.8s | 8.1s | 3.1s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 51ms |
| install | ✔     | ✔        |             | 5.8s | 2.2s | 3.7s | 1.2s | 387ms |
| install | ✔     |          |             | 8.7s | 5s | 5.3s | 2.6s | 417ms |
| install |       | ✔        |             | 9.6s | 4.1s | 3.8s | 1.2s | 376ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 2.9s | n/a | 63ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.6s | 4.2s | 3s | n/a | 56ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 6.9s | 2.5s | 50ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 26.7s | 8.5s | 10.9s | 3.6s | 2s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 69ms |
| install | ✔     | ✔        |             | 7.1s | 2.6s | 5.1s | 1.4s | 659ms |
| install | ✔     |          |             | 11s | 6.1s | 7.1s | 3s | 674ms |
| install |       | ✔        |             | 11.9s | 5.4s | 5.1s | 1.4s | 659ms |
| install | ✔     |          | ✔           | 1.8s | 2.2s | 3.4s | n/a | 83ms |
| install |       | ✔        | ✔           | 1.5s | 1.1s | 1.6s | n/a | 60ms |
| install |       |          | ✔           | 1.8s | 5.3s | 3.5s | n/a | 76ms |
| update  | n/a | n/a | n/a | 1.5s | 5s | 5.2s | 3.3s | 127ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />