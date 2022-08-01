@aiaibot/setup-k8s-tools

Install the following tools:
* `kubectl`
* `helm`
* `helmfile`
* `sops`


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.24.2`
- helm-version: `v3.9.0`
- helmfile-version: `v0.144.0`

Example with optional input parameters:

```yaml
uses: aiaibot/setup-k8s-tools@v21
with:
  kubectl-version: "v1.19.3"
  helmfile-version: "v0.142.0"
```
