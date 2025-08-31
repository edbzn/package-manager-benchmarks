# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _31 août 2025, 07:06_ (_daily_ updated).

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
| install |       |          |             | 21.1s | 6.5s | 9.8s | 2.7s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 644ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5s | 1.7s | 3.5s | 983ms | 449ms |
| install | ✔     |          |             | 8.3s | 4.6s | 5.1s | 2.3s | 420ms |
| install |       | ✔        |             | 7.4s | 3.5s | 3.6s | 978ms | 419ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.6s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 651ms | 1.2s | n/a | 30ms |
| install |       |          | ✔           | 1.5s | 3.4s | 2.6s | n/a | 29ms |
| update  | n/a | n/a | n/a | 1.2s | 3.5s | 11.8s | 3.1s | 34ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18.6s | 5s | 5.5s | 2.3s | 1.1s |
| install | ✔     | ✔        | ✔           | 942ms | 581ms | 1s | n/a | 26ms |
| install | ✔     | ✔        |             | 3.7s | 1.4s | 2.7s | 866ms | 323ms |
| install | ✔     |          |             | 6.2s | 3.7s | 3.9s | 1.9s | 325ms |
| install |       | ✔        |             | 5.6s | 2.8s | 2.7s | 868ms | 329ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 26ms |
| install |       | ✔        | ✔           | 944ms | 558ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 2.6s | 2.1s | n/a | 24ms |
| update  | n/a | n/a | n/a | 941ms | 2.7s | 7.8s | 2.9s | 26ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 6.5s | 10.8s | 2.8s | 1.6s |
| install | ✔     | ✔        | ✔           | 902ms | 680ms | 1.3s | n/a | 28ms |
| install | ✔     | ✔        |             | 7.6s | 1.8s | 5.2s | 1.2s | 822ms |
| install | ✔     |          |             | 10.8s | 4.5s | 6.6s | 2.3s | 809ms |
| install |       | ✔        |             | 9.7s | 4s | 5.3s | 1.2s | 803ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 894ms | 660ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 4s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 895ms | 3.2s | 10.3s | 2.7s | 32ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.5s | 6.2s | 7.7s | 3s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 623ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 6s | 1.8s | 4s | 1.1s | 466ms |
| install | ✔     |          |             | 9s | 4.5s | 5.6s | 2.4s | 464ms |
| install |       | ✔        |             | 8.2s | 3.8s | 4.1s | 1.1s | 450ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.7s | n/a | 30ms |
| install |       | ✔        | ✔           | 1.1s | 605ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.4s | 3.7s | 2.7s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.2s | 3.2s | 5.5s | 2.3s | 37ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 32.7s | 8.1s | 10.1s | 3.4s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.2s | 688ms | 1.5s | n/a | 39ms |
| install | ✔     | ✔        |             | 7.5s | 2.2s | 5.6s | 1.3s | 702ms |
| install | ✔     |          |             | 11.6s | 5.5s | 7.2s | 2.8s | 700ms |
| install |       | ✔        |             | 10.2s | 4.8s | 5.7s | 1.3s | 697ms |
| install | ✔     |          | ✔           | 1.5s | 1.8s | 3s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.2s | 675ms | 1.5s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 4.9s | 3s | n/a | 35ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 5.3s | 2.9s | 94ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />