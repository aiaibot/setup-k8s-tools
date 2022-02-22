@aiaibot/setup-k8s-tools

Install the following tools:
* `kubectl`
* `helm`
* `helmfile`


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.19.3`
- helm-version: `v3.7.1`
- helmfile-version: `v0.142.0`

Example with optional input parameters:

```yaml
uses: aiaibot/setup-k8s-tools@v20
with:
  kubectl-version: "v1.19.3"
  helmfile-version: "v0.142.0"
```
