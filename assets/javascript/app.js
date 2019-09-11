
var topicsArray = ["cat","dog","cow","bird","dragon","donkey","ogre"];

// var searchTopic
// var url = `api.giphy.com/v1/gifs/search?q=${searchTopic}&api_key=kX5XuEOPC5s1PDPbdpm8egVNF3RZJNlA&limit=1`;

function renderButtons() {
  $('#buttonView').empty();

  for (let i = 0; i < topicsArray.length; i++) {
    var $button = $('<button>');
    
    $button.addClass("btn btn-dark m-1 btn-giphy");
    $button.attr("data-topic", topicsArray[i]);
    $button.text(topicsArray[i]);
    $('#buttonView').append($button)
  }
} renderButtons();

$('#submitSearch').on('click', () => {
  event.preventDefault();

  var topic = $('#topicInput').val().trim();
  if (topic ==="") {
    return;
  }
  topicsArray.push(topic);
  $('#topicInput').val(""); // clears search field

  renderButtons();
});

$(document).on('click', '.btn-giphy', giphySearch)

function giphySearch() {
  var searchTopic = $(this).attr('data-topic')
  console.log(searchTopic)

  var url = `https://api.giphy.com/v1/gifs/search?q=${searchTopic}&api_key=kX5XuEOPC5s1PDPbdpm8egVNF3RZJNlA&limit=10`

  $.ajax({
    url,
    method: "GET"
  })
    .then((response) => {
      console.log(response)
      $('#imageBlock').empty();

      var topicIndex = topicsArray.indexOf(searchTopic)
      
      var results = response.data;
      if (results.length === 0) {
        alert('Giphy came back with nothing! Try entering something else.')
        topicsArray.splice(topicIndex, 1);
        renderButtons();
        return;
      }
      for (let i = 0; i < results.length; i++) {
        var $div = $('<div>');
        var $p = $('<p>').text(`rating: ${results[i].rating}`);
        var $img = $('<img>');
        $img.attr('src', results[i].images.fixed_height_still.url);
        $img.attr('image-still', results[i].images.fixed_height_still.url);
        $img.attr('image-animate', results[i].images.fixed_height.url);
        $img.attr('image-state', 'still');
        $img.addClass('img-giphy mr-1 ml-1')

        $div.prepend($p);
        $div.prepend($img);

        $('#imageBlock').prepend($div);
      }
    });
}

$(document).on('click', '.img-giphy', toggleAnimate)

function toggleAnimate() {
  var state = $(this).attr('image-state')

  if (state === 'still') {
    $(this).attr('image-state', 'animate')
    $(this).attr('src', $(this).attr('image-animate'))
  }
  if (state === 'animate') {
    $(this).attr('image-state', 'still')
    $(this).attr('src', $(this).attr('image-still'))
  }
};