@aiaibot/setup-k8s-tools

Install the following tools:
* kubectl
* helm (only Helm 2)
* helmfile


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.18.0`
- helm-version: `v2.16.5`
- helmfile-version: `v0.98.2`

Example with optional input parameters:

```yaml
uses: aiaibot/setup-k8s-tools@v4
with:
  kubectl-version: "v1.18.0"
  helm-version: "v2.16.5"
  helmfile-version: "v0.98.2"
```
