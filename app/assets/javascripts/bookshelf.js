$(function () {
  
  // onload sort by author and display books
  sortAuthor();
  displayBooks();
  
  function displayBooks() {
    $book_rows = $('div.book');
    $book_rows.each(function(index) {
      //console.log($(this).find('img'));
      $current_img = $(this).find('img')[0];
      $current_img.src = books_o["books"][index]["cover_url"];
      $current_img.setAttribute('data-index', index);
    });
  }
  
  function sortAuthor() {
    books_o.books.sort(function (a, b) {
      a = a.author,
      b = b.author;
      return a.localeCompare(b);
    });
  };
  
  function sortTitle (a, b) {
    books_o.books.sort(function (a, b) {
      a = a.title,
      b = b.title;
      return a.localeCompare(b);
    });
  };
  
  function sortGenre (a, b) {
    books_o.books.sort(function (a, b) {
      a = a.genre,
      b = b.genre;
      return a.localeCompare(b);
    });
  };
  
  function sortPubDate (a, b) {
    books_o.books.sort(function (a, b) {
      a = a.published_date,
      b = b.published_date;
      return a.localeCompare(b);
    });
  };
  
  function showBook() {
    var book = books_o["books"][9];
    $('#book-detail-author').text("by " + book.author);
    $('#book-detail-genre').text(book.genre);
    $('#book-detail-pubdate').text(book.published_date);
    $('#book-detail-title').text(book.title);
    $('#book-detail-cover').find('img')[0].src = book.cover_url;
    $('#book-detail').fadeIn('slow');
  }
  
  function hideBook() {
    $('#book-detail').fadeOut('slow');
  }
  
  $('#sort-icon-author').click(function() {
    sortAuthor();
    displayBooks();
  });
  
  $('#sort-icon-genre').click(function() {
    sortGenre();
    displayBooks();
  });
  
  $('#sort-icon-title').click(function() {
    sortTitle();
    displayBooks();
  });
  
  $('#sort-icon-pubdate').click(function() {
    sortPubDate();
    displayBooks();
  });
  
  $('#show-book').click(function() {
    showBook();
  });
  
  $('#hide-book').click(function() {
    hideBook();
  });
  
  
  // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel  : "cosmic_book_shelf",      // CONNECT TO THIS CHANNEL.
        error    : function() {        // LOST CONNECTION (auto reconnects)
            alert("Connection Lost. Will auto-reconnect when Online.")
        },
        callback : function(message) { // RECEIVED A MESSAGE.
            console.log(message);
            if(message != "Hi from PubNub.") {
              //var gestures = message.gestures;
              var gesture = message.Gestures[0].Gesture;
              switch(gesture)
              {
                case "SwipeToRight":
                  sortTitle();
                  displayBooks();
                  break;
                case "SwipeToLeft":
                  sortGenre();
                  displayBooks();
                  break;
                case "Circle":
                  sortPubDate();
                  displayBooks();
                  break;
              }
            }
            
            
        },
        connect  : function() {        // CONNECTION ESTABLISHED.

            // SEND MESSAGE
            PUBNUB.publish({
                channel : "cosmic_book_shelf",
                message : "Hi from PubNub."
            })

        }
    })
  
});