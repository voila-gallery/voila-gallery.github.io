"""
Build all the examples.

This script goes through all the examples in the gallery,
and calls the BinderHub /build endpoint to make sure the
examples are built.

Inspired by: https://github.com/jupyterhub/binderhub/blob/master/examples/binder-api.py#L18-L34

TODO: use an endpoint to know if the image is built if/when it gets added to BinderHub
Related issue: https://github.com/jupyterhub/binderhub/issues/998
"""

import json

from pathlib import Path

import requests
import yaml

HERE = Path(".")
BINDER_URL = "https://mybinder.org"
DEFAULT_REF = "master"

# wait 10 minutes for each build
TIMEOUT = 60 * 10


def build_binder(repo, ref):
    url = f"{BINDER_URL}/build/gh/{repo}/{ref}"
    r = requests.get(url, stream=True, timeout=TIMEOUT)
    r.raise_for_status()
    for line in r.iter_lines():
        line = line.decode("utf8", "replace")
        if not line.startswith("data:"):
            continue

        data = json.loads(line.split(":", 1)[1])
        phase = data.get("phase", "")
        if not phase:
            continue

        if phase == "built":
            r.close()
            return


def build_all():
    gallery = HERE.parent / "_data/gallery.yaml"
    with open(gallery, "r") as f:
        examples = yaml.safe_load(f)

    for example in examples:
        repo = example.get("repo_url").replace("https://github.com/", "")
        ref = example.get("ref", DEFAULT_REF)

        print(f"Building a binder for {repo}@{ref}")
        build_binder(repo, ref)


if __name__ == "__main__":
    build_all()
