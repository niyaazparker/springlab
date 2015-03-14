// Load Video
function loadVideo(playerUrl, autoplay) {
  swfobject.embedSWF(
      playerUrl + '&rel=1&border=0&fs=1&showinfo=1&autohide=1&autoplay=' + 
      (autoplay?1:0), 'player', '450', '250', '9.0.0', false, 
      false, {allowfullscreen: 'true'});
}


// Get feed data and push thumbnails 
function showVideoList(data) {
  var feed = data.feed;
  var entries = feed.entry || [];
  var html = ['<ul class="videos">'];
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = entry.title.$t.substr(0, 20);
    var description = entries[i].media$group.media$description.$t.substr(0, 100);
    var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
    var playerUrl = entries[i].media$group.media$content[0].url;
    var viewcount = entry.yt$statistics.viewCount;
    html.push('<li class="col-lg-12 col-md-12 col-xs-12"  onclick="loadVideo(\'', playerUrl, '\', true)">',
              '<div class="col-lg-2 col-md-2 col-xs-12"><img src="', 
              thumbnailUrl, '" width="130" height="97"/></div><div class="col-lg-10 col-md-10 col-xs-12"><h3 class="titlec">', title, '...</h3><span class="views col-lg-12 col-md-12 col-xs-12">Views: ', viewcount,'</span><span class="description col-lg-12 col-md-12 col-xs-12">', description,'</span></li></div>');
  }


  html.push('</ul><br style="clear: left;"/>');
  document.getElementById('videoList').innerHTML = html.join('');

  // Load first video by default
  if (entries.length > 0) {
    loadVideo(entries[0].media$group.media$content[0].url, false);

  }
}


