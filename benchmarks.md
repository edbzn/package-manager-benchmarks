# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _27 août 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 21.1s | 6.5s | 10.3s | 2.8s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 649ms | 1.2s | n/a | 36ms |
| install | ✔     | ✔        |             | 5s | 1.7s | 3.6s | 983ms | 449ms |
| install | ✔     |          |             | 8.4s | 4.6s | 5.5s | 2.4s | 420ms |
| install |       | ✔        |             | 7.4s | 3.6s | 3.7s | 982ms | 419ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.6s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 663ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.5s | 3.5s | 2.7s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.6s | 12.2s | 3.2s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18.6s | 5.2s | 5.7s | 2.4s | 1.4s |
| install | ✔     | ✔        | ✔           | 949ms | 586ms | 1s | n/a | 26ms |
| install | ✔     | ✔        |             | 3.7s | 1.4s | 2.7s | 887ms | 323ms |
| install | ✔     |          |             | 6.2s | 3.7s | 4s | 2s | 325ms |
| install |       | ✔        |             | 5.6s | 2.9s | 2.8s | 872ms | 329ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.3s | n/a | 26ms |
| install |       | ✔        | ✔           | 944ms | 558ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 2.8s | 2.2s | n/a | 24ms |
| update  | n/a | n/a | n/a | 941ms | 2.9s | 7.8s | 2.9s | 28ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 6.5s | 10.9s | 2.8s | 1.8s |
| install | ✔     | ✔        | ✔           | 902ms | 682ms | 1.3s | n/a | 28ms |
| install | ✔     | ✔        |             | 7.6s | 1.8s | 5.2s | 1.2s | 822ms |
| install | ✔     |          |             | 10.8s | 4.6s | 6.6s | 2.3s | 818ms |
| install |       | ✔        |             | 9.7s | 4.1s | 5.3s | 1.2s | 830ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.7s | n/a | 28ms |
| install |       | ✔        | ✔           | 894ms | 672ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 4s | 2.5s | n/a | 26ms |
| update  | n/a | n/a | n/a | 895ms | 3.2s | 10.8s | 2.8s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 22.6s | 6.2s | 7.8s | 3s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 641ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 6s | 1.8s | 4.1s | 1.1s | 466ms |
| install | ✔     |          |             | 9s | 4.7s | 5.6s | 2.5s | 469ms |
| install |       | ✔        |             | 8.2s | 3.8s | 4.1s | 1.1s | 451ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.7s | n/a | 30ms |
| install |       | ✔        | ✔           | 1.1s | 623ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.4s | 3.7s | 2.8s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.2s | 3.3s | 5.5s | 2.3s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 32.7s | 8.2s | 10.2s | 3.7s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.2s | 699ms | 1.5s | n/a | 39ms |
| install | ✔     | ✔        |             | 7.5s | 2.2s | 5.6s | 1.3s | 709ms |
| install | ✔     |          |             | 11.6s | 5.6s | 7.3s | 2.9s | 700ms |
| install |       | ✔        |             | 10.2s | 4.9s | 5.7s | 1.3s | 697ms |
| install | ✔     |          | ✔           | 1.5s | 1.8s | 3.2s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.2s | 691ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 5s | 3.4s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 5.5s | 3s | 118ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />