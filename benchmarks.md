# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _5 mai 2024, 07:05_ (_daily_ updated).

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
| install |       |          |             | 23.3s | 6.5s | 10.2s | 2.7s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.4s | 976ms | 1.3s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.1s | 1.9s | 3.6s | 1s | 424ms |
| install | ✔     |          |             | 9.5s | 4.9s | 5.1s | 2.4s | 460ms |
| install |       | ✔        |             | 8.6s | 3.6s | 3.6s | 1s | 404ms |
| install | ✔     |          | ✔           | 1.6s | 1.8s | 2.7s | n/a | 49ms |
| install |       | ✔        | ✔           | 1.3s | 963ms | 1.3s | n/a | 32ms |
| install |       |          | ✔           | 1.6s | 3.8s | 2.7s | n/a | 47ms |
| update  | n/a | n/a | n/a | 1.3s | 3.8s | 13.6s | 3.3s | 33ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.5s | 5.2s | 6.1s | 2.3s | 1.9s |
| install | ✔     | ✔        | ✔           | 1.1s | 858ms | 1s | n/a | 28ms |
| install | ✔     | ✔        |             | 3.9s | 1.6s | 2.8s | 933ms | 336ms |
| install | ✔     |          |             | 7.1s | 3.9s | 4s | 2s | 372ms |
| install |       | ✔        |             | 6.5s | 3s | 2.9s | 935ms | 332ms |
| install | ✔     |          | ✔           | 1.2s | 1.5s | 2.2s | n/a | 38ms |
| install |       | ✔        | ✔           | 1s | 871ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1.2s | 3.1s | 2.3s | n/a | 38ms |
| update  | n/a | n/a | n/a | 1.1s | 2.9s | 10.7s | 3.6s | 27ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.5s | 6.7s | 11.4s | 2.9s | 1.9s |
| install | ✔     | ✔        | ✔           | 1s | 990ms | 1.4s | n/a | 26ms |
| install | ✔     | ✔        |             | 7.7s | 2.1s | 5.2s | 1.3s | 813ms |
| install | ✔     |          |             | 12s | 4.7s | 6.6s | 2.4s | 772ms |
| install |       | ✔        |             | 10.5s | 4.1s | 5.3s | 1.2s | 726ms |
| install | ✔     |          | ✔           | 1.2s | 1.9s | 2.6s | n/a | 40ms |
| install |       | ✔        | ✔           | 1s | 1s | 1.4s | n/a | 25ms |
| install |       |          | ✔           | 1.2s | 4.3s | 2.6s | n/a | 39ms |
| update  | n/a | n/a | n/a | 1s | 3.5s | 8.6s | 2.6s | 26ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 24.1s | 6.4s | 7.9s | 3s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.4s | 937ms | 1.5s | n/a | 30ms |
| install | ✔     | ✔        |             | 6.1s | 2.1s | 4.1s | 1.2s | 485ms |
| install | ✔     |          |             | 10s | 4.7s | 5.7s | 2.5s | 468ms |
| install |       | ✔        |             | 9.2s | 4s | 4.1s | 1.2s | 455ms |
| install | ✔     |          | ✔           | 1.6s | 1.9s | 3s | n/a | 45ms |
| install |       | ✔        | ✔           | 1.3s | 966ms | 1.5s | n/a | 29ms |
| install |       |          | ✔           | 1.6s | 4.1s | 2.7s | n/a | 41ms |
| update  | n/a | n/a | n/a | 1.3s | 3.6s | 5.6s | 2.4s | 38ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 31.7s | 8s | 10.6s | 3.5s | 2.1s |
| install | ✔     | ✔        | ✔           | 1.5s | 1s | 1.6s | n/a | 38ms |
| install | ✔     | ✔        |             | 7.6s | 2.5s | 5.6s | 1.4s | 670ms |
| install | ✔     |          |             | 12.6s | 5.6s | 7.2s | 2.9s | 687ms |
| install |       | ✔        |             | 11.4s | 5.3s | 5.7s | 1.4s | 658ms |
| install | ✔     |          | ✔           | 1.7s | 2.2s | 3.2s | n/a | 57ms |
| install |       | ✔        | ✔           | 1.4s | 1s | 1.6s | n/a | 36ms |
| install |       |          | ✔           | 1.7s | 5.5s | 3.2s | n/a | 54ms |
| update  | n/a | n/a | n/a | 1.4s | 4.7s | 5.4s | 2.9s | 86ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />