# Voilà Gallery

![voila-gallery-logo](./voila-gallery.svg)

![Github Actions Status](https://github.com/voila-gallery/voila-gallery.github.io/workflows/CI/badge.svg)

This is a gallery of [Voilà](https://github.com/voila-dashboards/voila)
examples. Use this for inspiration on using Voilà and
[ipywidgets](https://github.com/jupyter-widgets/ipywidgets).

View the gallery at [voila-gallery.org](http://voila-gallery.org).

## Contributing new examples

1. Create a repository with your notebook. You can start from the [hello-world](https://github.com/voila-gallery/hello-world-example) example.
2. [Test the repository on Binder](https://mybinder.readthedocs.io/en/latest/introduction.html#preparing-a-repository-for-binder). The gallery launches the examples on [mybinder.org](https://mybinder.org).
3. Create a PR to [voila-gallery.org](https://github.com/voila-gallery/voila-gallery.github.io) that
   modifies `_data/gallery.yaml`.
   You will need to fill in the following fields:
   - `title`: the title used in the page thumbnail.
   - `description`: the description used in the page thumbnail.
   - `url`: the URL of the notebook to render.
   - `repo_url`: the URL of the repository serving as source.
   - `ref`: the commit hash used to pin to a specific version of the example
   - `image_url`: the URL of the picture to use as thumbnail.
4. Once the PR is merged into `master`, the gallery is automatically redeployed and the new example will be visible shortly after.

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) to know how to contribute to the Voilà Gallery website and set up a development environment.

## Related projects

- [Voilà](https://github.com/voila-dashboards/voila): Turn Jupyter Notebooks into standalone dashboards and web applications
- [TLJH Voilà](https://github.com/voila-dashboards/gallery): Voilà Gallery plugin for The Littlest JupyterHub (TLJH)
- [Binderhub](https://github.com/jupyterhub/binderhub): Create custom and reproducible computing environments from git repositories

## License

We use a shared copyright model that enables all contributors to maintain the
copyright on their contributions.

This software is licensed under the BSD-3-Clause license. See the
[LICENSE](LICENSE) file for details.
