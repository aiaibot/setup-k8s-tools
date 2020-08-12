@aiaibot/setup-k8s-tools

Install the following tools:
* kubectl
* helm: either version 2 or 3. Helm 2 is default, if nothing else gets specified.
* helmfile

If you want to install Helm 3, set the parameter `use-helm3` to `"true"`. Version 3.0.3 of Helm 3
gets installed, unless you specify some other version via the `helm3-version` option.

Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.18.0`
- helm-version: `v2.16.7`
- helmfile-version: `v0.98.2`
- use-helm3: `false`
- helm3-version: `v3.0.3`

Example with optional input parameters (installs Helm 2):

```yaml
uses: aiaibot/setup-k8s-tools@v8
with:
  kubectl-version: "v1.18.0"
  helm-version: "v2.16.7"
  helmfile-version: "v0.98.2"
```

Example using Helm 3

```yaml
uses: aiaibot/setup-k8s-tools@v8
with:
  use-helm3: "true"
  helm3-version: "v3.0.3"
  kubectl-version: "v1.18.0"
  helmfile-version: "v0.98.2"
```
