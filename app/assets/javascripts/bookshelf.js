$(function () {
  $book_rows = $('div.book');
  $book_rows.each(function(index) {
    console.log($(this).find('img'));
    $(this).find('img')[0].src = books_o["books"][index]["cover_url"]
  });
});