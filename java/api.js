$(document).ready(function () {
  const apiKey = "4bab72c7"; 


  $(document).on("click", ".show-card", function () {
    const imdbID = $(this).data("id");
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

    $.getJSON(url, function (data) {
      if (data.Response === "False") return;

      $("#showModalLabel").text(data.Title);
      $("#showPoster").attr("src", data.Poster !== "N/A" ? data.Poster : "images/no-poster.png");
      $("#showRating").text(data.imdbRating);
      $("#showGenre").text(data.Genre);
      $("#showActors").text(data.Actors);
      $("#showPlot").text(data.Plot);
      const modal = new bootstrap.Modal(document.getElementById("showModal"));
      modal.show();
    });
  });
});
$('#showModal').on('hidden.bs.modal', function () {
  $('.modal-backdrop').remove();       
  $('body').removeClass('modal-open'); 
});
