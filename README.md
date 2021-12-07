@aiaibot/setup-k8s-tools

Install the following tools:
* `kubectl`
* `helm`: either version 2 or 3. Helm 3 is default.
* `helmfile`


Thera are no required input parameters. These are the default values:
- kubectl-version: `v1.19.3`
- helm-version: `v2.16.7`
- helmfile-version: `v0.142.0`
- use-helm3: `true`
- helm3-version: `v3.7.1`

Example with optional input parameters:

```yaml
uses: aiaibot/setup-k8s-tools@v17
with:
  kubectl-version: "v1.18.5"
  helmfile-version: "v0.98.2"
```
