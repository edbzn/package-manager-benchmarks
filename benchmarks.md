# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _29 avr. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.4s | 6.6s | 9.4s | 4.4s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 832ms | 1.1s | n/a | 39ms |
| install | ✔     | ✔        |             | 4.9s | 1.9s | 3.4s | 975ms | 519ms |
| install | ✔     |          |             | 8.2s | 4.8s | 6.7s | 4.1s | 471ms |
| install |       | ✔        |             | 7.2s | 3.8s | 3.5s | 969ms | 469ms |
| install | ✔     |          | ✔           | 1.4s | 1.7s | 4.4s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.2s | 882ms | 1.1s | n/a | 36ms |
| install |       |          | ✔           | 1.4s | 3.9s | 4.4s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.2s | 3.7s | 12.9s | 6.3s | 38ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 5s | 6.3s | 3.6s | 1.3s |
| install | ✔     | ✔        | ✔           | 909ms | 696ms | 962ms | n/a | 33ms |
| install | ✔     | ✔        |             | 3.6s | 1.5s | 2.6s | 846ms | 412ms |
| install | ✔     |          |             | 6.1s | 3.6s | 5.2s | 3.2s | 427ms |
| install |       | ✔        |             | 5.4s | 2.9s | 2.7s | 837ms | 394ms |
| install | ✔     |          | ✔           | 1s | 1.3s | 3.4s | n/a | 31ms |
| install |       | ✔        | ✔           | 909ms | 707ms | 957ms | n/a | 29ms |
| install |       |          | ✔           | 1s | 2.8s | 3.4s | n/a | 28ms |
| update  | n/a | n/a | n/a | 899ms | 2.9s | 8.9s | 4.6s | 31ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6.8s | 11.6s | 4.4s | 2s |
| install | ✔     | ✔        | ✔           | 871ms | 785ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 7.5s | 1.9s | 5.1s | 1.1s | 924ms |
| install | ✔     |          |             | 10.2s | 4.6s | 7.9s | 4s | 910ms |
| install |       | ✔        |             | 9.2s | 3.9s | 5s | 1.1s | 899ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.1s | n/a | 31ms |
| install |       | ✔        | ✔           | 862ms | 773ms | 1.3s | n/a | 29ms |
| install |       |          | ✔           | 1s | 4.4s | 4.1s | n/a | 29ms |
| update  | n/a | n/a | n/a | 867ms | 3.3s | 10.4s | 4.2s | 37ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 6.3s | 8.7s | 4.6s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.1s | 768ms | 1.3s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.7s | 1.9s | 3.9s | 1.1s | 513ms |
| install | ✔     |          |             | 8.7s | 4.4s | 7s | 4.1s | 521ms |
| install |       | ✔        |             | 7.9s | 3.8s | 3.9s | 1.1s | 492ms |
| install | ✔     |          | ✔           | 1.3s | 1.7s | 4.3s | n/a | 34ms |
| install |       | ✔        | ✔           | 1.1s | 765ms | 1.3s | n/a | 33ms |
| install |       |          | ✔           | 1.4s | 3.7s | 4.3s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.1s | 3.5s | 6.8s | 4.2s | 42ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.2s | 8.2s | 11.5s | 5.4s | 2s |
| install | ✔     | ✔        | ✔           | 1.2s | 816ms | 1.5s | n/a | 44ms |
| install | ✔     | ✔        |             | 7.2s | 2.4s | 5.4s | 1.3s | 762ms |
| install | ✔     |          |             | 11s | 5.3s | 9.1s | 4.9s | 777ms |
| install |       | ✔        |             | 9.7s | 4.9s | 5.4s | 1.3s | 765ms |
| install | ✔     |          | ✔           | 1.5s | 2s | 5.1s | n/a | 43ms |
| install |       | ✔        | ✔           | 1.2s | 830ms | 1.5s | n/a | 39ms |
| install |       |          | ✔           | 1.5s | 5.3s | 5.1s | n/a | 41ms |
| update  | n/a | n/a | n/a | 1.2s | 4.1s | 6.3s | 5s | 119ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />