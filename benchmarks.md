# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _9 mars 2025, 07:06_ (_daily_ updated).

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
| install |       |          |             | 20.8s | 6.6s | 9.5s | 4.4s | 1.5s |
| install | ✔     | ✔        | ✔           | 1.2s | 799ms | 1.1s | n/a | 36ms |
| install | ✔     | ✔        |             | 4.9s | 1.8s | 3.5s | 967ms | 438ms |
| install | ✔     |          |             | 8.4s | 4.5s | 6.8s | 4.1s | 429ms |
| install |       | ✔        |             | 7.3s | 3.5s | 3.5s | 957ms | 423ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 4.4s | n/a | 35ms |
| install |       | ✔        | ✔           | 1.2s | 782ms | 1.1s | n/a | 32ms |
| install |       |          | ✔           | 1.4s | 3.7s | 4.4s | n/a | 32ms |
| update  | n/a | n/a | n/a | 1.2s | 3.5s | 12.8s | 6.2s | 36ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 4.8s | 6.4s | 3.6s | 973ms |
| install | ✔     | ✔        | ✔           | 977ms | 706ms | 981ms | n/a | 28ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.6s | 852ms | 352ms |
| install | ✔     |          |             | 6.1s | 3.6s | 5.2s | 3.2s | 336ms |
| install |       | ✔        |             | 5.6s | 2.8s | 2.7s | 852ms | 335ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 3.4s | n/a | 28ms |
| install |       | ✔        | ✔           | 930ms | 684ms | 993ms | n/a | 25ms |
| install |       |          | ✔           | 1s | 2.7s | 3.4s | n/a | 25ms |
| update  | n/a | n/a | n/a | 950ms | 2.6s | 9s | 4.6s | 28ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 21.2s | 6.3s | 11.9s | 4.5s | 1.7s |
| install | ✔     | ✔        | ✔           | 915ms | 787ms | 1.3s | n/a | 30ms |
| install | ✔     | ✔        |             | 7.7s | 1.9s | 5.2s | 1.2s | 870ms |
| install | ✔     |          |             | 10.9s | 4.3s | 8.2s | 4s | 836ms |
| install |       | ✔        |             | 9.8s | 3.9s | 5.3s | 1.2s | 825ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 4.2s | n/a | 29ms |
| install |       | ✔        | ✔           | 898ms | 773ms | 1.3s | n/a | 27ms |
| install |       |          | ✔           | 1s | 4.1s | 4.2s | n/a | 26ms |
| update  | n/a | n/a | n/a | 895ms | 3.1s | 10.3s | 4.2s | 34ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 23.1s | 5.8s | 8.8s | 4.6s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 748ms | 1.3s | n/a | 33ms |
| install | ✔     | ✔        |             | 5.9s | 1.9s | 4s | 1.1s | 478ms |
| install | ✔     |          |             | 8.9s | 4.5s | 7.1s | 4.1s | 464ms |
| install |       | ✔        |             | 8.1s | 3.9s | 4s | 1.1s | 457ms |
| install | ✔     |          | ✔           | 1.4s | 1.5s | 4.3s | n/a | 32ms |
| install |       | ✔        | ✔           | 1.1s | 734ms | 1.3s | n/a | 29ms |
| install |       |          | ✔           | 1.4s | 3.5s | 4.3s | n/a | 30ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 6.9s | 4.2s | 40ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 32.9s | 7.9s | 11.6s | 5.4s | 1.7s |
| install | ✔     | ✔        | ✔           | 1.3s | 813ms | 1.5s | n/a | 41ms |
| install | ✔     | ✔        |             | 7.5s | 2.3s | 5.5s | 1.3s | 724ms |
| install | ✔     |          |             | 11.4s | 5.5s | 9.3s | 4.9s | 718ms |
| install |       | ✔        |             | 10.1s | 4.8s | 5.5s | 1.3s | 712ms |
| install | ✔     |          | ✔           | 1.5s | 1.9s | 5.1s | n/a | 40ms |
| install |       | ✔        | ✔           | 1.2s | 812ms | 1.5s | n/a | 37ms |
| install |       |          | ✔           | 1.5s | 5.1s | 5.1s | n/a | 37ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 6.1s | 5s | 93ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />