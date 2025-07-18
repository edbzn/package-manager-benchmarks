# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _18 juil. 2025, 07:10_ (_daily_ updated).

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
| install |       |          |             | 19.6s | 6.2s | 9.6s | 2.6s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 636ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5s | 1.7s | 3.6s | 982ms | 435ms |
| install | ✔     |          |             | 8.3s | 4.3s | 5s | 2.2s | 425ms |
| install |       | ✔        |             | 7.3s | 3.3s | 3.6s | 973ms | 419ms |
| install | ✔     |          | ✔           | 1.4s | 1.4s | 2.5s | n/a | 33ms |
| install |       | ✔        | ✔           | 1.2s | 609ms | 1.2s | n/a | 30ms |
| install |       |          | ✔           | 1.4s | 3.3s | 2.5s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 3.4s | 11.8s | 3s | 34ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 17.5s | 4.6s | 5.6s | 2.2s | 1.1s |
| install | ✔     | ✔        | ✔           | 945ms | 569ms | 1s | n/a | 27ms |
| install | ✔     | ✔        |             | 3.7s | 1.4s | 2.7s | 862ms | 326ms |
| install | ✔     |          |             | 6.1s | 3.5s | 3.8s | 1.9s | 327ms |
| install |       | ✔        |             | 5.5s | 2.7s | 2.7s | 867ms | 331ms |
| install | ✔     |          | ✔           | 1s | 1.2s | 2s | n/a | 27ms |
| install |       | ✔        | ✔           | 931ms | 544ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1s | 2.6s | 2s | n/a | 24ms |
| update  | n/a | n/a | n/a | 936ms | 2.6s | 7.8s | 2.7s | 27ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21s | 6.3s | 10.7s | 2.7s | 1.6s |
| install | ✔     | ✔        | ✔           | 897ms | 649ms | 1.3s | n/a | 29ms |
| install | ✔     | ✔        |             | 7.7s | 1.8s | 5.2s | 1.2s | 841ms |
| install | ✔     |          |             | 10.8s | 4.3s | 6.4s | 2.3s | 816ms |
| install |       | ✔        |             | 9.6s | 3.9s | 5.2s | 1.2s | 827ms |
| install | ✔     |          | ✔           | 1s | 1.4s | 2.4s | n/a | 29ms |
| install |       | ✔        | ✔           | 895ms | 633ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 4s | 2.4s | n/a | 26ms |
| update  | n/a | n/a | n/a | 895ms | 3.1s | 9.1s | 2.5s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.8s | 5.8s | 7.4s | 2.8s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.1s | 618ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.9s | 1.8s | 4s | 1.1s | 482ms |
| install | ✔     |          |             | 8.9s | 4.2s | 5.4s | 2.4s | 466ms |
| install |       | ✔        |             | 8.1s | 3.6s | 4.1s | 1.1s | 460ms |
| install | ✔     |          | ✔           | 1.4s | 1.4s | 2.7s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.2s | 601ms | 1.3s | n/a | 28ms |
| install |       |          | ✔           | 1.4s | 3.5s | 2.6s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 5.4s | 2.3s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.8s | 7.7s | 9.9s | 3.3s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.2s | 677ms | 1.5s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.5s | 2.2s | 5.5s | 1.3s | 712ms |
| install | ✔     |          |             | 11.5s | 5.3s | 7.2s | 2.8s | 708ms |
| install |       | ✔        |             | 10.2s | 4.6s | 5.6s | 1.3s | 708ms |
| install | ✔     |          | ✔           | 1.5s | 1.8s | 3s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.2s | 666ms | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.5s | 5s | 3s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 5.3s | 2.8s | 82ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />