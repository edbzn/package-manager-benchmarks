# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _21 mars 2025, 07:07_ (_daily_ updated).

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
| install |       |          |             | 19.4s | 5.8s | 9.4s | 4.4s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 767ms | 1.1s | n/a | 36ms |
| install | ✔     | ✔        |             | 4.8s | 1.7s | 3.4s | 945ms | 448ms |
| install | ✔     |          |             | 8.2s | 4.3s | 6.7s | 4.1s | 427ms |
| install |       | ✔        |             | 7.2s | 3.4s | 3.5s | 954ms | 421ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.4s | n/a | 35ms |
| install |       | ✔        | ✔           | 1.2s | 742ms | 1.1s | n/a | 32ms |
| install |       |          | ✔           | 1.4s | 3.4s | 4.4s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.2s | 3.3s | 12.8s | 6.2s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20s | 4.7s | 6.4s | 3.6s | 1s |
| install | ✔     | ✔        | ✔           | 972ms | 692ms | 981ms | n/a | 28ms |
| install | ✔     | ✔        |             | 3.6s | 1.5s | 2.6s | 852ms | 359ms |
| install | ✔     |          |             | 6.1s | 3.5s | 5.1s | 3.2s | 361ms |
| install |       | ✔        |             | 5.5s | 2.8s | 2.7s | 847ms | 335ms |
| install | ✔     |          | ✔           | 1s | 1.2s | 3.4s | n/a | 27ms |
| install |       | ✔        | ✔           | 923ms | 653ms | 987ms | n/a | 25ms |
| install |       |          | ✔           | 1s | 2.6s | 3.4s | n/a | 25ms |
| update  | n/a | n/a | n/a | 925ms | 2.5s | 9s | 4.5s | 28ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 19.8s | 6.1s | 11.7s | 4.4s | 1.7s |
| install | ✔     | ✔        | ✔           | 899ms | 758ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 7.7s | 1.8s | 5.1s | 1.2s | 877ms |
| install | ✔     |          |             | 10.6s | 4.2s | 8.1s | 4s | 830ms |
| install |       | ✔        |             | 9.6s | 3.8s | 5.2s | 1.1s | 839ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.1s | n/a | 29ms |
| install |       | ✔        | ✔           | 881ms | 747ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1s | 3.8s | 4.2s | n/a | 27ms |
| update  | n/a | n/a | n/a | 880ms | 3.1s | 10.3s | 4.2s | 34ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.5s | 5.8s | 8.8s | 4.6s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 743ms | 1.3s | n/a | 33ms |
| install | ✔     | ✔        |             | 5.8s | 1.9s | 3.9s | 1.1s | 479ms |
| install | ✔     |          |             | 8.9s | 4.2s | 7s | 4.1s | 477ms |
| install |       | ✔        |             | 8s | 3.7s | 4s | 1.1s | 463ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 4.3s | n/a | 32ms |
| install |       | ✔        | ✔           | 1.1s | 721ms | 1.3s | n/a | 30ms |
| install |       |          | ✔           | 1.4s | 3.7s | 4.3s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.1s | 3.2s | 6.9s | 4.2s | 40ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 30.8s | 7.4s | 11.5s | 5.4s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.3s | 793ms | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 7.4s | 2.3s | 5.4s | 1.3s | 723ms |
| install | ✔     |          |             | 11.3s | 5.1s | 9.2s | 4.9s | 718ms |
| install |       | ✔        |             | 10s | 4.7s | 5.5s | 1.3s | 717ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 5.1s | n/a | 41ms |
| install |       | ✔        | ✔           | 1.2s | 795ms | 1.5s | n/a | 38ms |
| install |       |          | ✔           | 1.5s | 4.7s | 5.1s | n/a | 38ms |
| update  | n/a | n/a | n/a | 1.2s | 3.9s | 6s | 4.9s | 85ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />