@aiaibot/setup-k8s-tools

Install the following tools:
* `kubectl`
* `helm`
* `helmfile`
* `sops`


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.24.2`
- helm-version: `v3.10.1`
- helmfile-version: `v0.144.0`

Example with optional input parameters:

```yaml
uses: aiaibot/setup-k8s-tools@v26
with:
  kubectl-version: "v1.24.2"
  helmfile-version: "v0.144.0"
```
