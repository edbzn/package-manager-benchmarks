# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _4 mars 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 19.1s | 6.1s | 9.6s | 4.6s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.2s | 782ms | 1.2s | n/a | 37ms |
| install | ✔     | ✔        |             | 4.9s | 1.8s | 3.6s | 967ms | 461ms |
| install | ✔     |          |             | 8.3s | 4.5s | 6.9s | 4.2s | 447ms |
| install |       | ✔        |             | 7.2s | 3.4s | 3.6s | 957ms | 432ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.4s | n/a | 36ms |
| install |       | ✔        | ✔           | 1.2s | 781ms | 1.1s | n/a | 33ms |
| install |       |          | ✔           | 1.4s | 3.4s | 4.5s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.1s | 3.4s | 13s | 6.4s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 17.9s | 4.8s | 6.6s | 3.6s | 1.1s |
| install | ✔     | ✔        | ✔           | 981ms | 702ms | 992ms | n/a | 28ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.7s | 860ms | 352ms |
| install | ✔     |          |             | 6.1s | 3.5s | 5.2s | 3.2s | 367ms |
| install |       | ✔        |             | 5.5s | 2.9s | 2.7s | 852ms | 339ms |
| install | ✔     |          | ✔           | 1s | 1.2s | 3.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 938ms | 680ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1s | 2.7s | 3.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 939ms | 2.6s | 9s | 4.6s | 29ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 6.3s | 12s | 4.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 910ms | 780ms | 1.3s | n/a | 31ms |
| install | ✔     | ✔        |             | 7.7s | 1.8s | 5.2s | 1.2s | 870ms |
| install | ✔     |          |             | 10.7s | 4.3s | 8.3s | 4.1s | 844ms |
| install |       | ✔        |             | 9.6s | 3.9s | 5.3s | 1.2s | 838ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.2s | n/a | 29ms |
| install |       | ✔        | ✔           | 893ms | 763ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1s | 3.9s | 4.3s | n/a | 26ms |
| update  | n/a | n/a | n/a | 891ms | 3.2s | 10.4s | 4.3s | 34ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6s | 8.9s | 4.6s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.2s | 758ms | 1.3s | n/a | 33ms |
| install | ✔     | ✔        |             | 5.8s | 1.9s | 4s | 1.1s | 492ms |
| install | ✔     |          |             | 8.9s | 4.3s | 7.2s | 4.2s | 470ms |
| install |       | ✔        |             | 8s | 3.8s | 4s | 1.1s | 471ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 4.4s | n/a | 32ms |
| install |       | ✔        | ✔           | 1.1s | 736ms | 1.3s | n/a | 29ms |
| install |       |          | ✔           | 1.4s | 3.8s | 4.3s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 7s | 4.3s | 40ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 28.5s | 7.8s | 11.7s | 5.5s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.3s | 799ms | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 7.4s | 2.2s | 5.6s | 1.3s | 724ms |
| install | ✔     |          |             | 11.3s | 5.2s | 9.4s | 4.9s | 719ms |
| install |       | ✔        |             | 10.1s | 4.9s | 5.6s | 1.3s | 712ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 5.2s | n/a | 40ms |
| install |       | ✔        | ✔           | 1.2s | 809ms | 1.5s | n/a | 37ms |
| install |       |          | ✔           | 1.5s | 5.1s | 5.2s | n/a | 37ms |
| update  | n/a | n/a | n/a | 1.2s | 4.2s | 6.1s | 5s | 96ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />