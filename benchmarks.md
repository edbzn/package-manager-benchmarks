# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _2 avr. 2024, 07:18_ (_daily_ updated).

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
| install |       |          |             | 26.7s | 7s | 10s | 2.8s | 2s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 61ms |
| install | ✔     | ✔        |             | 5.1s | 2.1s | 3.6s | 1s | 481ms |
| install | ✔     |          |             | 9.4s | 5s | 5.1s | 2.5s | 534ms |
| install |       | ✔        |             | 12.5s | 3.9s | 3.6s | 1s | 431ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 2.7s | n/a | 82ms |
| install |       | ✔        | ✔           | 1.3s | 1.1s | 1.3s | n/a | 63ms |
| install |       |          | ✔           | 1.6s | 4.2s | 2.8s | n/a | 73ms |
| update  | n/a | n/a | n/a | 1.3s | 4s | 13.3s | 3.3s | 55ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.7s | 5.4s | 6s | 2.4s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.1s | 958ms | 1.1s | n/a | 43ms |
| install | ✔     | ✔        |             | 3.9s | 1.8s | 2.8s | 969ms | 354ms |
| install | ✔     |          |             | 7s | 4s | 4s | 2s | 396ms |
| install |       | ✔        |             | 9.3s | 3.2s | 2.8s | 959ms | 343ms |
| install | ✔     |          | ✔           | 1.2s | 1.6s | 2.2s | n/a | 59ms |
| install |       | ✔        | ✔           | 1s | 979ms | 1.1s | n/a | 43ms |
| install |       |          | ✔           | 1.2s | 3.4s | 2.2s | n/a | 68ms |
| update  | n/a | n/a | n/a | 1.1s | 3.2s | 11.2s | 3.5s | 35ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 26.2s | 7.1s | 11.1s | 2.9s | 1.9s |
| install | ✔     | ✔        | ✔           | 1s | 1s | 1.5s | n/a | 36ms |
| install | ✔     | ✔        |             | 7.7s | 2.2s | 5.2s | 1.3s | 868ms |
| install | ✔     |          |             | 11.6s | 4.9s | 6.6s | 2.4s | 796ms |
| install |       | ✔        |             | 13.2s | 4.3s | 5.2s | 1.3s | 753ms |
| install | ✔     |          | ✔           | 1.2s | 1.9s | 2.7s | n/a | 60ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.5s | n/a | 34ms |
| install |       |          | ✔           | 1.2s | 5s | 2.6s | n/a | 61ms |
| update  | n/a | n/a | n/a | 1s | 3.6s | 8.4s | 2.6s | 43ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 27.3s | 6.6s | 7.8s | 3s | 2.6s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 51ms |
| install | ✔     | ✔        |             | 6s | 2.2s | 4.1s | 1.2s | 490ms |
| install | ✔     |          |             | 9.7s | 4.8s | 5.4s | 2.5s | 509ms |
| install |       | ✔        |             | 12.5s | 4.3s | 4.1s | 1.2s | 452ms |
| install | ✔     |          | ✔           | 1.5s | 2.3s | 2.8s | n/a | 64ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.5s | n/a | 39ms |
| install |       |          | ✔           | 1.5s | 4.4s | 2.8s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1.3s | 3.7s | 5.3s | 2.4s | 47ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 38.9s | 8.5s | 10.4s | 3.5s | 2.7s |
| install | ✔     | ✔        | ✔           | 1.5s | 1.1s | 1.7s | n/a | 69ms |
| install | ✔     | ✔        |             | 7.6s | 2.6s | 5.6s | 1.4s | 709ms |
| install | ✔     |          |             | 12.3s | 5.7s | 7.3s | 2.9s | 725ms |
| install |       | ✔        |             | 15.7s | 5.5s | 5.7s | 1.4s | 708ms |
| install | ✔     |          | ✔           | 1.7s | 2.3s | 3.2s | n/a | 91ms |
| install |       | ✔        | ✔           | 1.4s | 1.1s | 1.7s | n/a | 62ms |
| install |       |          | ✔           | 1.7s | 5.6s | 3.2s | n/a | 80ms |
| update  | n/a | n/a | n/a | 1.4s | 4.8s | 4.8s | 3s | 124ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />