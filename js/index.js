$(document).ready(function() {
  var BUILD_ENDPOINT = BINDERHUB_HOST + '/build/gh';

  $('.launch-item').click(function(event) {
    var name = $(event.currentTarget).data('example-name');
    var repoUrl = $(event.currentTarget).data('example-repo-url');
    const urlList = $(event.currentTarget).data('example-url').split('?');
    const url = urlList[0]
    let query = ''
    if(urlList[1]){
      query = '&' + urlList[1]
    }
    var ref = $(event.currentTarget).data('example-ref');
    // strip github.com from the repo url
    // TODO: handle other sources
    repoUrl = repoUrl.replace('https://github.com/', '');

    $('#loading_modal').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });

    $('#loader_text').html('Launching ' + name);

    var buildUrl = BUILD_ENDPOINT + '/' + repoUrl + '/' + ref + '?urlpath=' + url;
    var evtSource = new EventSource(buildUrl);
    evtSource.onmessage = function(event) {
      var data = JSON.parse(event.data);
      $('#loader_text').html(data.phase);
      if (data.phase === 'ready') {
        evtSource.close();
        var redirectUrl = data.url;
        var token = data.token;
        var redirect = redirectUrl + url + '?token=' + token + query;
        $('#loader_text').html('Launching');
        window.location.href = redirect;
      }
    };
    return false;
  });
});
