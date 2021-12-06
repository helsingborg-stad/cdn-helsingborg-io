<!-- SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p>
  <a href="https://github.com/helsingborg-stad/">
    <img src="hbg-github-logo-combo.png" alt="Logo" width="300">
  </a>
</p>
<h3>Helsingborg IO CDN</h3>

  REST API that delivers Guide data.

<p>
  <a href="https://github.com/helsingborg-stad/cdn-helsingborg-io/issues">Report Bug</a>
  ·
  <a href="https://github.com/helsingborg-stad/cdn-helsingborg-io/issues">Request Feature</a>
</p>



## Table of Contents
- [Table of Contents](#table-of-contents)
- [About Helsingborg IO CDN](#about-helsingborg-io-cdn)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Commands](#commands)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## About Helsingborg IO CDN

REST API that delivers Guide data originated from Helsingborg stads [Event API](https://api.helsingborg.se/event).
Currently serves as backend for the app **Guide Helsingborg**.


### Built With

* [Serverless Stack (SST)](https://serverless-stack.com/)


## Getting Started


### Installation

Clone the repo
```sh
$ git clone https://github.com/helsingborg-stad/cdn-helsingborg-io.git
```
Install dependencies
```sh
$ yarn install
```


### Commands

### `yarn run start`

Starts the local Lambda development environment.

### `yarn run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `yarn run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `yarn run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

### `yarn run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

### `yarn export-docs [rest-api-name] [stage-name]`

Export API as Swagger specification.

### `yarn run-docs`
Run local Swagger UI server




### Usage

To visualize and interact with the API’s resources, see the [Swagger UI](https://helsingborg-stad.github.io/cdn-helsingborg-io) documentation.


## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## License

Distributed under the [MIT License][license-url].



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/helsingborg-stad/cdn-helsingborg-io.svg?style=flat-square
[contributors-url]: https://github.com/helsingborg-stad/cdn-helsingborg-io/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/helsingborg-stad/cdn-helsingborg-io.svg?style=flat-square
[forks-url]: https://github.com/helsingborg-stad/cdn-helsingborg-io/network/members
[stars-shield]: https://img.shields.io/github/stars/helsingborg-stad/cdn-helsingborg-io.svg?style=flat-square
[stars-url]: https://github.com/helsingborg-stad/cdn-helsingborg-io/stargazers
[issues-shield]: https://img.shields.io/github/issues/helsingborg-stad/cdn-helsingborg-io.svg?style=flat-square
[issues-url]: https://github.com/helsingborg-stad/cdn-helsingborg-io/issues
[license-shield]: https://img.shields.io/github/license/helsingborg-stad/cdn-helsingborg-io.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/helsingborg-stad/cdn-helsingborg-io/main/LICENSE
