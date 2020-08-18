@aiaibot/setup-k8s-tools

Install the following tools:
* kubectl
* helm: either version 2 or 3. Helm 3 is default.
* helmfile


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.18.0`
- helm-version: `v2.16.7`
- helmfile-version: `v0.119.0`
- use-helm3: `true`
- helm3-version: `v3.2.4`

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
