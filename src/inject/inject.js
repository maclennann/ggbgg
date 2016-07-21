chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var trs = document.querySelectorAll('div.item');
      [].forEach.call(trs, function(el) {
        // Get the title and do some naive splits to get the "real" game name (which is just as likely to be wrong)
        var gameName = el.querySelector('div.info-group h3.product-name a').getAttribute('title');
        gameName = gameName.split(':')[0]; gameName = gameName.split('(')[0];

        // Make us a link to BGG search
        var bggLink = document.createElement('a');
        bggLink.setAttribute('href', 'http://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q='+gameName+'&B1=Go');
        bggLink.setAttribute('title', 'view '+gameName+' on bgg');
        bggLink.innerText = 'view '+gameName+' on bgg';

        // Append the link to the game name and listing link.
        el.querySelector('div.info-group h3.product-name').appendChild(document.createElement('br'));
        el.querySelector('div.info-group h3.product-name').appendChild(document.createElement('br'));
        el.querySelector('div.info-group h3.product-name').appendChild(bggLink);
      });
    }
  }, 10);
});
