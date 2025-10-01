# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _1 oct. 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 20.5s | 6.3s | 9.6s | 2.7s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 649ms | 1.2s | n/a | 34ms |
| install | ✔     | ✔        |             | 5.6s | 1.7s | 3.5s | 993ms | 452ms |
| install | ✔     |          |             | 9.2s | 4.6s | 5.2s | 2.3s | 428ms |
| install |       | ✔        |             | 8.4s | 3.4s | 3.6s | 990ms | 428ms |
| install | ✔     |          | ✔           | 1.5s | 1.4s | 2.6s | n/a | 36ms |
| install |       | ✔        | ✔           | 1.2s | 647ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.5s | 3.3s | 2.6s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.4s | 12.2s | 3.2s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18.5s | 4.8s | 5.7s | 2.3s | 1s |
| install | ✔     | ✔        | ✔           | 959ms | 587ms | 1s | n/a | 27ms |
| install | ✔     | ✔        |             | 4.2s | 1.4s | 2.7s | 860ms | 343ms |
| install | ✔     |          |             | 6.8s | 3.6s | 3.9s | 2s | 342ms |
| install |       | ✔        |             | 6.3s | 2.7s | 2.7s | 867ms | 337ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 26ms |
| install |       | ✔        | ✔           | 955ms | 554ms | 1s | n/a | 24ms |
| install |       |          | ✔           | 1.1s | 2.6s | 2.1s | n/a | 24ms |
| update  | n/a | n/a | n/a | 949ms | 2.6s | 7.9s | 2.8s | 28ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 22.9s | 6.4s | 10.7s | 2.9s | 1.7s |
| install | ✔     | ✔        | ✔           | 906ms | 688ms | 1.3s | n/a | 29ms |
| install | ✔     | ✔        |             | 9.4s | 1.8s | 5.2s | 1.2s | 843ms |
| install | ✔     |          |             | 12.8s | 4.4s | 6.5s | 2.3s | 809ms |
| install |       | ✔        |             | 11.8s | 3.8s | 5.2s | 1.2s | 821ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.5s | n/a | 28ms |
| install |       | ✔        | ✔           | 914ms | 658ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 3.8s | 2.5s | n/a | 25ms |
| update  | n/a | n/a | n/a | 907ms | 3.2s | 10.3s | 2.8s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.6s | 5.9s | 7.5s | 3s | 1.4s |
| install | ✔     | ✔        | ✔           | 1.2s | 639ms | 1.3s | n/a | 34ms |
| install | ✔     | ✔        |             | 7.3s | 1.8s | 4s | 1.1s | 469ms |
| install | ✔     |          |             | 10.6s | 4.5s | 5.5s | 2.5s | 469ms |
| install |       | ✔        |             | 9.7s | 3.7s | 4.1s | 1.1s | 455ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 2.7s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.2s | 613ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1.4s | 3.6s | 2.7s | n/a | 27ms |
| update  | n/a | n/a | n/a | 1.2s | 3.1s | 5.5s | 2.4s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 32.6s | 7.7s | 10.2s | 3.4s | 1.8s |
| install | ✔     | ✔        | ✔           | 1.3s | 678ms | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 8.6s | 2.2s | 5.5s | 1.3s | 696ms |
| install | ✔     |          |             | 13s | 5.5s | 7.3s | 2.8s | 696ms |
| install |       | ✔        |             | 11.6s | 4.7s | 5.6s | 1.3s | 703ms |
| install | ✔     |          | ✔           | 1.6s | 1.8s | 3.1s | n/a | 39ms |
| install |       | ✔        | ✔           | 1.3s | 667ms | 1.5s | n/a | 36ms |
| install |       |          | ✔           | 1.6s | 5s | 3s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.3s | 3.9s | 5.4s | 2.9s | 87ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />