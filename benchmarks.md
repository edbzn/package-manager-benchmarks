# Benchmarks of JavaScript Package Managers

**Last benchmarked at**: _5 juin 2025, 07:08_ (_daily_ updated).

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
| install |       |          |             | 19.7s | 6.3s | 9.8s | 2.7s | 1.3s |
| install | ✔     | ✔        | ✔           | 1.2s | 797ms | 1.2s | n/a | 35ms |
| install | ✔     | ✔        |             | 4.9s | 1.8s | 3.6s | 1s | 444ms |
| install | ✔     |          |             | 8.3s | 4.6s | 5.1s | 2.4s | 419ms |
| install |       | ✔        |             | 7.3s | 3.5s | 3.7s | 1s | 419ms |
| install | ✔     |          | ✔           | 1.4s | 1.6s | 2.7s | n/a | 34ms |
| install |       | ✔        | ✔           | 1.2s | 782ms | 1.2s | n/a | 31ms |
| install |       |          | ✔           | 1.4s | 3.4s | 2.8s | n/a | 31ms |
| update  | n/a | n/a | n/a | 1.2s | 3.6s | 12.2s | 3.1s | 35ms |

<img alt="Graph of the react-app results" src="results/img/react-app.svg" />

## Ember App

The app's `package.json` [here](./fixtures/ember-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 18.7s | 4.8s | 5.7s | 2.4s | 1s |
| install | ✔     | ✔        | ✔           | 950ms | 694ms | 1s | n/a | 28ms |
| install | ✔     | ✔        |             | 3.7s | 1.5s | 2.7s | 905ms | 328ms |
| install | ✔     |          |             | 6.2s | 3.5s | 4s | 1.9s | 334ms |
| install |       | ✔        |             | 5.6s | 2.8s | 2.8s | 883ms | 343ms |
| install | ✔     |          | ✔           | 1.1s | 1.2s | 2.1s | n/a | 28ms |
| install |       | ✔        | ✔           | 943ms | 672ms | 1s | n/a | 25ms |
| install |       |          | ✔           | 1s | 2.7s | 2.1s | n/a | 24ms |
| update  | n/a | n/a | n/a | 939ms | 2.7s | 8.3s | 2.9s | 27ms |

<img alt="Graph of the ember-quickstart results" src="results/img/ember-quickstart.svg" />

## Angular App

The app's `package.json` [here](./fixtures/angular-quickstart/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20s | 6.2s | 10.9s | 2.9s | 1.6s |
| install | ✔     | ✔        | ✔           | 901ms | 756ms | 1.4s | n/a | 29ms |
| install | ✔     | ✔        |             | 7.6s | 1.8s | 5.3s | 1.2s | 852ms |
| install | ✔     |          |             | 10.7s | 4.3s | 6.5s | 2.4s | 817ms |
| install |       | ✔        |             | 9.5s | 3.8s | 5.3s | 1.2s | 829ms |
| install | ✔     |          | ✔           | 1s | 1.5s | 2.5s | n/a | 29ms |
| install |       | ✔        | ✔           | 891ms | 749ms | 1.3s | n/a | 26ms |
| install |       |          | ✔           | 1s | 3.9s | 2.5s | n/a | 27ms |
| update  | n/a | n/a | n/a | 893ms | 3.2s | 9.4s | 2.5s | 33ms |

<img alt="Graph of the angular-quickstart results" src="results/img/angular-quickstart.svg" />

## Medium Size App

The app's `package.json` [here](./fixtures/medium-size-app/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 20.7s | 5.8s | 7.7s | 2.9s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.1s | 736ms | 1.3s | n/a | 32ms |
| install | ✔     | ✔        |             | 5.8s | 1.9s | 4.1s | 1.2s | 480ms |
| install | ✔     |          |             | 8.8s | 4.3s | 5.5s | 2.5s | 467ms |
| install |       | ✔        |             | 8s | 3.8s | 4.1s | 1.1s | 463ms |
| install | ✔     |          | ✔           | 1.4s | 1.4s | 2.8s | n/a | 31ms |
| install |       | ✔        | ✔           | 1.1s | 735ms | 1.4s | n/a | 29ms |
| install |       |          | ✔           | 1.4s | 3.6s | 2.6s | n/a | 28ms |
| update  | n/a | n/a | n/a | 1.1s | 3.1s | 5.5s | 2.3s | 39ms |

<img alt="Graph of the medium-size-app results" src="results/img/medium-size-app.svg" />

## Lots of Files

The app's `package.json` [here](./fixtures/alotta-files/package.json)

| action  | cache | lockfile | node_modules| npm | pnpm | Yarn | Yarn PnP | Bun |
| ---     | ---   | ---      | ---         | --- | ---  | ---  | ---      | --- |
| install |       |          |             | 29.9s | 7.7s | 10.1s | 3.4s | 1.6s |
| install | ✔     | ✔        | ✔           | 1.2s | 808ms | 1.6s | n/a | 40ms |
| install | ✔     | ✔        |             | 7.4s | 2.3s | 5.6s | 1.3s | 710ms |
| install | ✔     |          |             | 11.4s | 5.2s | 7.3s | 2.8s | 701ms |
| install |       | ✔        |             | 10.2s | 4.9s | 5.7s | 1.3s | 704ms |
| install | ✔     |          | ✔           | 1.5s | 2s | 3s | n/a | 40ms |
| install |       | ✔        | ✔           | 1.2s | 783ms | 1.6s | n/a | 35ms |
| install |       |          | ✔           | 1.5s | 5.1s | 3.1s | n/a | 36ms |
| update  | n/a | n/a | n/a | 1.2s | 4s | 5.4s | 2.9s | 85ms |

<img alt="Graph of the alotta-files results" src="results/img/alotta-files.svg" />