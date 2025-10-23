# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _23 oct. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 21.6s | 7.1s | 9.6s | 2.7s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.2s | 666ms | 1.1s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.6s | 1.7s | 3.5s | 990ms | 467ms |
| install | ✔     |          |             | 9.3s | 4.8s | 5.1s | 2.3s | 425ms |
| install |       | ✔        |             | 8.3s | 3.7s | 3.6s | 983ms | 430ms |
| install | ✔     |          | ✔           | 1.7s | 1.5s | 2.6s | n/a | 35ms |
| install |       | ✔        | ✔           | 1.2s | 689ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.6s | 3.7s | 2.6s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.9s | 12.1s | 3.1s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20s | 5.3s | 5.7s | 2.3s | 1.1s |
| install | ✔     | ✔        | ✔           | 950ms | 597ms | 1s | n/a | 28ms |
| install | ✔     | ✔        |             | 4.2s | 1.5s | 2.7s | 860ms | 360ms |
| install | ✔     |          |             | 6.9s | 3.8s | 3.9s | 2s | 368ms |
| install |       | ✔        |             | 6.4s | 3.6s | 2.7s | 859ms | 351ms |
| install | ✔     |          | ✔           | 1.2s | 1.2s | 2.1s | n/a | 27ms |
| install |       | ✔        | ✔           | 948ms | 572ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1.2s | 2.9s | 2.1s | n/a | 25ms |
| update  | n/a | n/a | n/a | 947ms | 2.8s | 7.8s | 2.8s | 29ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.6s | 7.1s | 10.7s | 2.8s | 1.7s |
| install | ✔     | ✔        | ✔           | 900ms | 710ms | 1.3s | n/a | 29ms |
| install | ✔     | ✔        |             | 9.4s | 1.8s | 5.2s | 1.2s | 858ms |
| install | ✔     |          |             | 12.7s | 4.7s | 6.5s | 2.3s | 831ms |
| install |       | ✔        |             | 11.7s | 4s | 5.2s | 1.2s | 827ms |
| install | ✔     |          | ✔           | 1.7s | 1.5s | 2.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 899ms | 691ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.7s | 4.6s | 2.5s | n/a | 26ms |
| update  | n/a | n/a | n/a | 903ms | 3.3s | 10s | 2.7s | 40ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.4s | 6.3s | 7.5s | 2.9s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.2s | 656ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 7.3s | 1.9s | 4s | 1.1s | 487ms |
| install | ✔     |          |             | 10.6s | 4.6s | 5.5s | 2.5s | 485ms |
| install |       | ✔        |             | 9.8s | 3.9s | 4.1s | 1.1s | 457ms |
| install | ✔     |          | ✔           | 1.6s | 1.5s | 2.7s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.1s | 640ms | 1.3s | n/a | 29ms |
| install |       |          | ✔           | 1.6s | 3.9s | 2.7s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.2s | 3.2s | 5.4s | 2.4s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 34.6s | 8s | 10.1s | 3.4s | 2s |
| install | ✔     | ✔        | ✔           | 1.2s | 692ms | 1.5s | n/a | 42ms |
| install | ✔     | ✔        |             | 8.6s | 2.2s | 5.5s | 1.3s | 706ms |
| install | ✔     |          |             | 12.9s | 5.7s | 7.2s | 2.8s | 707ms |
| install |       | ✔        |             | 11.6s | 4.9s | 5.6s | 1.3s | 704ms |
| install | ✔     |          | ✔           | 1.7s | 1.8s | 3s | n/a | 38ms |
| install |       | ✔        | ✔           | 1.2s | 711ms | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.7s | 5.4s | 3s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 5.3s | 2.9s | 102ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />