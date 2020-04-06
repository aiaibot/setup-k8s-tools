Install the following tools:
* kubectl
* helm
* helmfile

Reference this action in your workflow with `aiaibot/setup-k8s-tools@master`.

All version parameters are optional. These are the default values:
* kubect: `v1.18.0`
* helm: `v2.16.5`
* helmfile: `v0.98.2`


```yaml
uses: aiaibot/setup-k8s-tools@master
with:
  kubectl-version: "v1.18.0"
  helm-version: "v2.16.5"
  helmfile-version: "v0.98.2"
```
