# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _12 avr. 2024, 07:20_ (_daily_ updated).

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
| install |       |          |             | 23.4s | 6.4s | 10s | 2.8s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 24ms |
| install | ✔     | ✔        |             | 5.5s | 2s | 3.6s | 1s | 454ms |
| install | ✔     |          |             | 9.8s | 4.8s | 5.1s | 2.5s | 469ms |
| install |       | ✔        |             | 8.9s | 3.7s | 3.6s | 1s | 396ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.7s | n/a | 42ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 21ms |
| install |       |          | ✔           | 1.6s | 3.8s | 2.8s | n/a | 39ms |
| update  | n/a | n/a | n/a | 1.4s | 3.7s | 13.3s | 3.3s | 22ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24s | 5s | 6s | 2.4s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.1s | 931ms | 1.1s | n/a | 20ms |
| install | ✔     | ✔        |             | 4s | 1.7s | 2.8s | 969ms | 330ms |
| install | ✔     |          |             | 7.4s | 3.9s | 4s | 2s | 349ms |
| install |       | ✔        |             | 6.7s | 3.1s | 2.8s | 959ms | 317ms |
| install | ✔     |          | ✔           | 1.3s | 1.6s | 2.2s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.1s | 926ms | 1.1s | n/a | 17ms |
| install |       |          | ✔           | 1.3s | 3.1s | 2.2s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.1s | 2.9s | 11.2s | 3.5s | 19ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.5s | 6.6s | 11.1s | 2.9s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.5s | n/a | 19ms |
| install | ✔     | ✔        |             | 8s | 2.1s | 5.2s | 1.3s | 795ms |
| install | ✔     |          |             | 12.2s | 4.6s | 6.6s | 2.4s | 792ms |
| install |       | ✔        |             | 10.8s | 4.2s | 5.2s | 1.3s | 720ms |
| install | ✔     |          | ✔           | 1.2s | 1.9s | 2.7s | n/a | 34ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.5s | n/a | 17ms |
| install |       |          | ✔           | 1.2s | 4.3s | 2.6s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.1s | 3.6s | 8.4s | 2.6s | 21ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 25.2s | 6.2s | 7.8s | 3s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 21ms |
| install | ✔     | ✔        |             | 6.3s | 2.2s | 4.1s | 1.2s | 460ms |
| install | ✔     |          |             | 10.3s | 4.6s | 5.4s | 2.5s | 458ms |
| install |       | ✔        |             | 9.6s | 4.1s | 4.1s | 1.2s | 442ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.8s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 19ms |
| install |       |          | ✔           | 1.6s | 4.1s | 2.8s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.3s | 3.6s | 5.3s | 2.4s | 29ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 33.9s | 8s | 10.4s | 3.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.6s | 1.1s | 1.7s | n/a | 27ms |
| install | ✔     | ✔        |             | 8s | 2.6s | 5.6s | 1.4s | 646ms |
| install | ✔     |          |             | 13s | 5.7s | 7.3s | 2.9s | 667ms |
| install |       | ✔        |             | 11.8s | 5.4s | 5.7s | 1.4s | 645ms |
| install | ✔     |          | ✔           | 1.8s | 2.2s | 3.2s | n/a | 48ms |
| install |       | ✔        | ✔           | 1.5s | 1.1s | 1.7s | n/a | 24ms |
| install |       |          | ✔           | 1.8s | 5.5s | 3.2s | n/a | 44ms |
| update  | n/a | n/a | n/a | 1.5s | 4.6s | 4.8s | 3s | 73ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />