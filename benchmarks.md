# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _15 avr. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.6s | 6.3s | 9.5s | 4.5s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 788ms | 1.2s | n/a | 36ms |
| install | ✔     | ✔        |             | 4.9s | 1.8s | 3.5s | 985ms | 427ms |
| install | ✔     |          |             | 8.2s | 4.4s | 6.8s | 4.2s | 428ms |
| install |       | ✔        |             | 7.2s | 3.4s | 3.5s | 991ms | 427ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.6s | n/a | 34ms |
| install |       | ✔        | ✔           | 1.2s | 781ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.4s | 3.7s | 4.5s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 3.5s | 13s | 6.3s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 4.6s | 6.5s | 3.6s | 1s |
| install | ✔     | ✔        | ✔           | 956ms | 696ms | 1s | n/a | 27ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.7s | 865ms | 357ms |
| install | ✔     |          |             | 6.2s | 3.5s | 5.2s | 3.3s | 354ms |
| install |       | ✔        |             | 5.5s | 3.7s | 2.7s | 860ms | 334ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 3.5s | n/a | 26ms |
| install |       | ✔        | ✔           | 943ms | 677ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 2.9s | 3.4s | n/a | 24ms |
| update  | n/a | n/a | n/a | 942ms | 2.7s | 9.1s | 4.6s | 27ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6.3s | 11.7s | 4.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 897ms | 772ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 7.6s | 1.8s | 5.2s | 1.2s | 859ms |
| install | ✔     |          |             | 10.6s | 4.3s | 8.2s | 4s | 844ms |
| install |       | ✔        |             | 9.6s | 3.8s | 5.2s | 1.2s | 850ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.2s | n/a | 29ms |
| install |       | ✔        | ✔           | 902ms | 746ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1s | 4.4s | 4.2s | n/a | 26ms |
| update  | n/a | n/a | n/a | 907ms | 3.2s | 10.6s | 4.3s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 5.8s | 8.8s | 4.7s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.1s | 740ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.9s | 1.9s | 3.9s | 1.1s | 508ms |
| install | ✔     |          |             | 8.9s | 4.3s | 7.2s | 4.2s | 471ms |
| install |       | ✔        |             | 8.1s | 3.7s | 4s | 1.1s | 475ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 4.3s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.1s | 730ms | 1.3s | n/a | 28ms |
| install |       |          | ✔           | 1.4s | 3.5s | 4.4s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 7s | 4.2s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.2s | 7.6s | 11.7s | 5.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 810ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.5s | 2.3s | 5.4s | 1.3s | 722ms |
| install | ✔     |          |             | 11.4s | 5.2s | 9.2s | 4.9s | 718ms |
| install |       | ✔        |             | 10.1s | 4.8s | 5.4s | 1.3s | 719ms |
| install | ✔     |          | ✔           | 1.5s | 2s | 5.1s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.2s | 803ms | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.5s | 5s | 5.2s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.2s | 3.9s | 6.4s | 5.1s | 90ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />