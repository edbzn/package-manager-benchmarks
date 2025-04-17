# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _17 avr. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.6s | 6.2s | 9.4s | 4.4s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 774ms | 1.1s | n/a | 35ms |
| install | ✔     | ✔        |             | 4.9s | 1.7s | 3.4s | 975ms | 457ms |
| install | ✔     |          |             | 8.2s | 4.4s | 6.7s | 4.1s | 440ms |
| install |       | ✔        |             | 7.2s | 3.4s | 3.5s | 981ms | 425ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.5s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 743ms | 1.1s | n/a | 31ms |
| install |       |          | ✔           | 1.4s | 3.6s | 4.4s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.2s | 3.5s | 12.9s | 6.3s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 4.6s | 6.3s | 3.6s | 1.3s |
| install | ✔     | ✔        | ✔           | 909ms | 686ms | 962ms | n/a | 27ms |
| install | ✔     | ✔        |             | 3.6s | 1.5s | 2.6s | 846ms | 354ms |
| install | ✔     |          |             | 6.1s | 3.5s | 5.2s | 3.2s | 368ms |
| install |       | ✔        |             | 5.4s | 2.9s | 2.7s | 837ms | 344ms |
| install | ✔     |          | ✔           | 1s | 1.2s | 3.4s | n/a | 32ms |
| install |       | ✔        | ✔           | 909ms | 669ms | 957ms | n/a | 26ms |
| install |       |          | ✔           | 1s | 2.7s | 3.4s | n/a | 27ms |
| update  | n/a | n/a | n/a | 899ms | 2.6s | 8.9s | 4.6s | 31ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6.3s | 11.6s | 4.4s | 1.6s |
| install | ✔     | ✔        | ✔           | 871ms | 760ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 7.5s | 1.8s | 5.1s | 1.1s | 846ms |
| install | ✔     |          |             | 10.2s | 4.3s | 7.9s | 4s | 795ms |
| install |       | ✔        |             | 9.2s | 3.8s | 5s | 1.1s | 817ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.1s | n/a | 28ms |
| install |       | ✔        | ✔           | 862ms | 697ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 3.9s | 4.1s | n/a | 25ms |
| update  | n/a | n/a | n/a | 867ms | 3.2s | 10.4s | 4.2s | 31ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 5.8s | 8.7s | 4.6s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.1s | 726ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.7s | 1.8s | 3.9s | 1.1s | 498ms |
| install | ✔     |          |             | 8.7s | 4.3s | 7s | 4.1s | 445ms |
| install |       | ✔        |             | 7.9s | 3.7s | 3.9s | 1.1s | 461ms |
| install | ✔     |          | ✔           | 1.3s | 1.5s | 4.3s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.1s | 708ms | 1.3s | n/a | 28ms |
| install |       |          | ✔           | 1.4s | 3.5s | 4.3s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 6.8s | 4.2s | 40ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.2s | 7.6s | 11.5s | 5.4s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.2s | 780ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.2s | 2.2s | 5.4s | 1.3s | 707ms |
| install | ✔     |          |             | 11s | 5.2s | 9.1s | 4.9s | 705ms |
| install |       | ✔        |             | 9.7s | 4.8s | 5.4s | 1.3s | 709ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 5.1s | n/a | 40ms |
| install |       | ✔        | ✔           | 1.2s | 778ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 4.8s | 5.1s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.2s | 3.9s | 6.3s | 5s | 96ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />