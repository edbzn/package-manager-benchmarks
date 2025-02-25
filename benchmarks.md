# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _25 févr. 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 19.1s | 6.2s | 9.5s | 4.4s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.2s | 792ms | 1.1s | n/a | 37ms |
| install | ✔     | ✔        |             | 4.9s | 1.8s | 3.4s | 962ms | 450ms |
| install | ✔     |          |             | 8.3s | 4.4s | 6.7s | 4.1s | 434ms |
| install |       | ✔        |             | 7.2s | 3.4s | 3.5s | 957ms | 419ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.4s | n/a | 35ms |
| install |       | ✔        | ✔           | 1.2s | 765ms | 1.1s | n/a | 32ms |
| install |       |          | ✔           | 1.4s | 3.3s | 4.4s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.2s | 3.4s | 12.7s | 6.2s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 17.9s | 4.7s | 6.4s | 3.6s | 1.3s |
| install | ✔     | ✔        | ✔           | 984ms | 706ms | 989ms | n/a | 30ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.6s | 848ms | 355ms |
| install | ✔     |          |             | 6.1s | 3.5s | 5.1s | 3.2s | 339ms |
| install |       | ✔        |             | 5.5s | 2.8s | 2.7s | 854ms | 334ms |
| install | ✔     |          | ✔           | 1s | 1.2s | 3.4s | n/a | 27ms |
| install |       | ✔        | ✔           | 946ms | 674ms | 993ms | n/a | 26ms |
| install |       |          | ✔           | 1s | 2.6s | 3.4s | n/a | 25ms |
| update  | n/a | n/a | n/a | 941ms | 2.7s | 8.8s | 4.5s | 29ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.1s | 6.3s | 11.8s | 4.5s | 1.9s |
| install | ✔     | ✔        | ✔           | 910ms | 773ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 7.7s | 1.8s | 5.2s | 1.2s | 877ms |
| install | ✔     |          |             | 10.7s | 4.3s | 8.1s | 4s | 840ms |
| install |       | ✔        |             | 9.7s | 3.7s | 5.2s | 1.1s | 851ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.1s | n/a | 31ms |
| install |       | ✔        | ✔           | 895ms | 763ms | 1.3s | n/a | 28ms |
| install |       |          | ✔           | 1s | 3.8s | 4.2s | n/a | 28ms |
| update  | n/a | n/a | n/a | 895ms | 3.1s | 9.8s | 4.2s | 34ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.6s | 6s | 8.8s | 4.5s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.2s | 755ms | 1.3s | n/a | 33ms |
| install | ✔     | ✔        |             | 5.9s | 1.9s | 4s | 1.1s | 489ms |
| install | ✔     |          |             | 8.9s | 4.3s | 7.1s | 4.1s | 486ms |
| install |       | ✔        |             | 8s | 3.7s | 4s | 1.1s | 462ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 4.3s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.1s | 725ms | 1.3s | n/a | 30ms |
| install |       |          | ✔           | 1.4s | 3.6s | 4.3s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.1s | 3.2s | 6.8s | 4.1s | 41ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 28.5s | 7.4s | 11.5s | 5.5s | 2s |
| install | ✔     | ✔        | ✔           | 1.3s | 805ms | 1.5s | n/a | 42ms |
| install | ✔     | ✔        |             | 7.5s | 2.2s | 5.5s | 1.3s | 730ms |
| install | ✔     |          |             | 11.3s | 5.2s | 9.2s | 4.9s | 717ms |
| install |       | ✔        |             | 10.1s | 4.7s | 5.5s | 1.3s | 720ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 5.1s | n/a | 41ms |
| install |       | ✔        | ✔           | 1.2s | 816ms | 1.5s | n/a | 38ms |
| install |       |          | ✔           | 1.5s | 4.9s | 5.1s | n/a | 38ms |
| update  | n/a | n/a | n/a | 1.2s | 3.9s | 6.2s | 4.9s | 94ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />