# tictactoe

## Overview
The game of tic-tac-toe has a long history, dating back to ancient Egypt.

> See [Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)

It has long been viewed as both a simple game, but suffiently complicated enough to push computing boundaries.

## V1
For V1 I was experimenting with *functions as a service* as a means of hosting light-weight business logic.

As such, I adopted the [CNCF](https://www.cncf.io/about/who-we-are/) project [OpenFaaS](https://www.openfaas.com/) to enable *functions* in a K3S deployment.

And that set of choices servred me well as a format to learn more about K8S and serveless in general.

But, this architecture is obviously overkill for tic-tac-toe.

## V2 Changes

So now I focus on making the game avasilable for play on my LAN.

In V2, the goals are to ...

- Reimplement this project as a web app implemented completely in typescript.

- Continue to deliver with nginx, but as a static site. All logic will execute on the client.

- In addition, a [`devcontainer`](https://containers.dev/) definition is provided to enable a container-first developer experience.

> See [V2 design](./docs/V2_design.md)

### Base OCI Image Dependency

Please see [klmcwhirter/oci-shared-images](https://github.com/klmcwhirter/oci-shared-images) for instructions on building the `fedora41-python-dx:latest` image used in [devcontainer.json](.devcontainer/devcontainer.json).
