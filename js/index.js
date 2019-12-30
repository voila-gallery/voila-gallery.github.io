$(document).ready(function() {
  const BUILD_ENDPOINT = `${BINDERHUB_HOST}/build/gh`;

  $(".launch-item").click(function(event) {
    let name = $(event.currentTarget).data("example-name");
    let repoUrl = $(event.currentTarget).data("example-repo-url");
    let url = $(event.currentTarget).data("example-url");
    let ref = $(event.currentTarget).data("example-ref");

    // strip github.com from the repo url
    // TODO: handle other sources
    repoUrl = repoUrl.replace("https://github.com/", "");

    const buildUrl = `${BUILD_ENDPOINT}/${repoUrl}/${ref}?urlpath=${url}`;

    $("#loading_modal").modal({
      backdrop: "static",
      keyboard: false,
      show: true
    });

    $("#loader_text").html("Launching " + name);

    // TODO: reuse the same logic as in:
    // https://github.com/jupyterhub/binderhub/tree/master/binderhub/static/js/src
    const evtSource = new EventSource(buildUrl);
    evtSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      $("#loader_text").html(data.phase);
      if (data.phase === "ready") {
        const redirectUrl = data.url;
        const token = data.token;
        const redirect = `${redirectUrl}${url}?token=${token}`;
        $("#loader_text").html("Redirecting to " + redirect);
        window.location.href = redirect;
      }
    };

    return false;
  });
});
