# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _18 févr. 2024, 07:17_ (_daily_ updated).

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
| install |       |          |             | 25.6s | 7.5s | 10.7s | 2.9s | 2.3s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 65ms |
| install | ✔     | ✔        |             | 4.9s | 2.1s | 3.2s | 1s | 480ms |
| install | ✔     |          |             | 9.7s | 5.4s | 4.9s | 2.6s | 509ms |
| install |       | ✔        |             | 9.3s | 3.6s | 3.3s | 1s | 433ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 2.9s | n/a | 89ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 60ms |
| install |       |          | ✔           | 1.6s | 4s | 2.9s | n/a | 87ms |
| update  | n/a | n/a | n/a | 1.4s | 4.6s | 13.9s | 3.4s | 59ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.5s | 6.3s | 6.4s | 2.5s | 2.5s |
| install | ✔     | ✔        | ✔           | 1.1s | 935ms | 1.1s | n/a | 43ms |
| install | ✔     | ✔        |             | 3.7s | 1.7s | 2.6s | 940ms | 364ms |
| install | ✔     |          |             | 7.3s | 4.8s | 3.9s | 2.1s | 389ms |
| install |       | ✔        |             | 7.1s | 3.2s | 2.6s | 943ms | 341ms |
| install | ✔     |          | ✔           | 1.3s | 1.7s | 2.3s | n/a | 60ms |
| install |       | ✔        | ✔           | 1.1s | 936ms | 1.1s | n/a | 48ms |
| install |       |          | ✔           | 1.3s | 3.1s | 2.3s | n/a | 48ms |
| update  | n/a | n/a | n/a | 1.1s | 4s | 9.2s | 3.4s | 42ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 25.1s | 7.1s | 11.5s | 3.1s | 2.5s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.4s | n/a | 30ms |
| install | ✔     | ✔        |             | 6.9s | 2.1s | 4.8s | 1.2s | 804ms |
| install | ✔     |          |             | 11.5s | 5.2s | 6.2s | 2.4s | 803ms |
| install |       | ✔        |             | 10.7s | 4.4s | 4.8s | 1.2s | 733ms |
| install | ✔     |          | ✔           | 1.2s | 2s | 2.8s | n/a | 45ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.4s | n/a | 39ms |
| install |       |          | ✔           | 1.2s | 4.2s | 2.8s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1s | 4s | 9.5s | 2.7s | 47ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 26.3s | 7s | 7.9s | 3.2s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 51ms |
| install | ✔     | ✔        |             | 5.5s | 2.2s | 3.7s | 1.2s | 409ms |
| install | ✔     |          |             | 10s | 5.3s | 5.4s | 2.6s | 442ms |
| install |       | ✔        |             | 9.5s | 4.1s | 3.7s | 1.2s | 388ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 2.8s | n/a | 50ms |
| install |       | ✔        | ✔           | 1.3s | 1s | 1.5s | n/a | 43ms |
| install |       |          | ✔           | 1.5s | 4.2s | 2.9s | n/a | 51ms |
| update  | n/a | n/a | n/a | 1.3s | 4.6s | 6.2s | 2.6s | 57ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 36.7s | 8.9s | 10.8s | 3.6s | 3.2s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 62ms |
| install | ✔     | ✔        |             | 7s | 2.6s | 5s | 1.4s | 705ms |
| install | ✔     |          |             | 12.4s | 6.4s | 7s | 3s | 706ms |
| install |       | ✔        |             | 11.7s | 5.7s | 5.1s | 1.4s | 679ms |
| install | ✔     |          | ✔           | 1.7s | 2.3s | 3.3s | n/a | 98ms |
| install |       | ✔        | ✔           | 1.4s | 1.1s | 1.6s | n/a | 72ms |
| install |       |          | ✔           | 1.7s | 5.5s | 3.3s | n/a | 91ms |
| update  | n/a | n/a | n/a | 1.5s | 5.2s | 5s | 3.3s | 139ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />