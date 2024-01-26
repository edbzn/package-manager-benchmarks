# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _26 janv. 2024, 07:15_ (_daily_ updated).

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
| install |       |          |             | 29.2s | 7.8s | 10.9s | 2.9s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 55ms |
| install | ✔     | ✔        |             | 4.9s | 2s | 3.2s | 1s | 445ms |
| install | ✔     |          |             | 9.8s | 5.2s | 5s | 2.5s | 468ms |
| install |       | ✔        |             | 9.5s | 3.7s | 3.3s | 1s | 420ms |
| install | ✔     |          | ✔           | 1.7s | 2s | 2.8s | n/a | 78ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.3s | n/a | 60ms |
| install |       |          | ✔           | 1.6s | 4s | 2.9s | n/a | 72ms |
| update  | n/a | n/a | n/a | 1.4s | 4s | 13.7s | 3.5s | 60ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 25.5s | 5.8s | 6.4s | 2.5s | 1.2s |
| install | ✔     | ✔        | ✔           | 1.1s | 956ms | 1.1s | n/a | 35ms |
| install | ✔     | ✔        |             | 3.7s | 1.7s | 2.6s | 971ms | 344ms |
| install | ✔     |          |             | 7.4s | 4.4s | 4s | 2.2s | 348ms |
| install |       | ✔        |             | 7.1s | 3.4s | 2.6s | 943ms | 328ms |
| install | ✔     |          | ✔           | 1.3s | 1.7s | 2.4s | n/a | 52ms |
| install |       | ✔        | ✔           | 1.1s | 949ms | 1.1s | n/a | 35ms |
| install |       |          | ✔           | 1.3s | 3.6s | 2.3s | n/a | 48ms |
| update  | n/a | n/a | n/a | 1.1s | 3.7s | 9.3s | 3.4s | 39ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 29.5s | 7.3s | 11.4s | 3.1s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.1s | 1s | 1.5s | n/a | 39ms |
| install | ✔     | ✔        |             | 7.4s | 2.1s | 4.7s | 1.3s | 775ms |
| install | ✔     |          |             | 12.3s | 5.1s | 6.3s | 2.5s | 769ms |
| install |       | ✔        |             | 11.2s | 4.2s | 4.8s | 1.2s | 720ms |
| install | ✔     |          | ✔           | 1.2s | 2s | 2.7s | n/a | 57ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.4s | n/a | 40ms |
| install |       |          | ✔           | 1.2s | 4.5s | 2.7s | n/a | 56ms |
| update  | n/a | n/a | n/a | 1.1s | 3.8s | 9.5s | 2.6s | 39ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 27.9s | 6.7s | 8.1s | 3.1s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 43ms |
| install | ✔     | ✔        |             | 5.9s | 2.2s | 3.7s | 1.2s | 384ms |
| install | ✔     |          |             | 10.1s | 5s | 5.3s | 2.6s | 413ms |
| install |       | ✔        |             | 10.9s | 4.3s | 3.8s | 1.2s | 378ms |
| install | ✔     |          | ✔           | 1.6s | 2s | 2.9s | n/a | 62ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.5s | n/a | 40ms |
| install |       |          | ✔           | 1.6s | 4s | 2.9s | n/a | 52ms |
| update  | n/a | n/a | n/a | 1.3s | 3.9s | 6.6s | 2.5s | 48ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 39.9s | 8.7s | 10.9s | 3.6s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 64ms |
| install | ✔     | ✔        |             | 7.3s | 2.6s | 5.1s | 1.4s | 674ms |
| install | ✔     |          |             | 12.8s | 5.9s | 6.8s | 3s | 665ms |
| install |       | ✔        |             | 11.7s | 5.4s | 5.1s | 1.4s | 656ms |
| install | ✔     |          | ✔           | 1.8s | 2.2s | 3.4s | n/a | 81ms |
| install |       | ✔        | ✔           | 1.5s | 1.1s | 1.6s | n/a | 60ms |
| install |       |          | ✔           | 1.7s | 5.4s | 3.3s | n/a | 80ms |
| update  | n/a | n/a | n/a | 1.5s | 4.7s | 5.1s | 3.3s | 104ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />