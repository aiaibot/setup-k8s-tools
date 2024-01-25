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
uses: aiaibot/setup-k8s-tools@v27
with:
  kubectl-version: "v1.24.2"
  helmfile-version: "v0.144.0"
```

## Create a new version
1. Increase the version number in `package.json`.
2. Run `npm run package` in the root folder.
3. Commit and push.
