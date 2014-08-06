$(function () {

    // onload sort by author and display books
    defaultSort();
    displayBooks();
    // create array for the sort types.
    var sortTypes = new Array(sortTitle, sortGenre, sortPubDate, sortAuthor);
    var currentSortType = 0;
    

    function triggerIsotope() {
      $('.bookshelf').isotope({
        // options
        itemSelector : '.book',
        layoutMode : 'fitRows',
        getSortData : {
          // ...
          author : function ( $elem ) {
            return $($elem).attr('data-author');
          },
          genre : function ( $elem ) {
            return $($elem).attr('data-genre');
          },
          pubdate : function ( $elem ) {
            return $($elem).attr('data-pubdate');
          },
          title : function ( $elem ) {
            return $($elem).attr('data-title');
          }
        }
      });
    }

    function displayBooks() {
      var $bookshelf = $('.bookshelf');
      var $book = $('.book');
      $.each(books_o["books"], function(index, book) { 
        console.log(index + ': ' + book); 
        $new_div = $(document.createElement("div"))
                    .addClass("book")
                    .attr('data-author', book.author)
                    .attr('data-genre', book.genre)
                    .attr('data-pubdate', book.published_date)
                    .attr('data-title', book.title)
                    .appendTo($bookshelf);
        $(document.createElement("img"))
          .attr({ src: book.cover_url, title: book.title })
          .appendTo($new_div);
      });
      
      triggerIsotope();
      
    }

    function displayFilteredBooks(filteredBooks) {
        var $bookshelf = $('.bookshelf');
        var $book = $('.book');
        $('.bookshelf').empty();
        $.each(filteredBooks, function(index, book) { 
          //console.log(index + ': ' + book); 
          $new_div = $(document.createElement("div"))
                      .addClass("book")
                      .attr('data-author', book.author)
                      .attr('data-genre', book.genre)
                      .attr('data-pubdate', book.published_date)
                      .attr('data-title', book.title)
                      .appendTo($bookshelf);
          $(document.createElement("img"))
            .attr({ src: book.cover_url, title: book.title })
            .appendTo($new_div);
        });
      
        triggerIsotope();
    }
    
    function defaultSort() {
      books_o.books.sort(function (a, b) {
        a = a.author,
        b = b.author;
        return a.localeCompare(b);
      });
    }

    function sortAuthor() {
        $('.bookshelf').isotope({ sortBy : "author" });
        AuthorSortIcon();
        return false;
    };

    function sortTitle() {
        $('.bookshelf').isotope({ sortBy : "title" });
        TitleSortIcon();
        return false;
    };

    function sortGenre() {
        $('.bookshelf').isotope({ sortBy : "genre" });
        GenreSortIcon();
        return false;
    };

    function sortPubDate() {
        $('.bookshelf').isotope({ sortBy : "pubdate" });
        PubDateSortIcon();
        return false;
    };

    function sortByTypes() {
        var i = currentSortType;
        if (currentSortType == sortTypes.length - 1) {
            currentSortType = 0;
        }
        else {
            currentSortType += 1;
        }
        return sortTypes[i]();
    };

    function showBook() {
        var book = books_o["books"][9];
        $('#book-detail-author').text(book.author);
        $('#book-detail-genre').text(book.genre);
        $('#book-detail-pubdate').text(book.published_date);
        $('#book-detail-title').text(book.title);
        $('#book-detail-description').text(book.description);
        $('#book-detail-cover').find('img')[0].src = book.cover_url;
        $('#book-detail').fadeToggle();
    }

    function showSearch() {
        $('#search-detail-icon').fadeIn();
        $('#search-detail-title').text('title');
        $('#search-detail-author').text('author');
        $('#search-detail-desc').text('description');
        $('#search-detail-genre').text('genre');
        $('#search-detail-pubdate').text('publication date');
        $('#search-detail-termbox').visible = true;
        $('#search-detail').fadeToggle();
    }

    function hideBook() {
        $('#book-detail').fadeOut('slow');
    }
    
    function swipeShelf() {
      var $bookshelf = $('.bookshelf')
      var $first_five_divs = $('div.book:lt(5)');
      $('.bookshelf').isotope( 'remove', $first_five_divs );
      $first_five_divs.appendTo($bookshelf);
    }
    
    $('#sort-icon').click(function () {
        sortByTypes();
    });

    $('#sort-icon-author').click(function () {
        sortAuthor();
        AuthorSortIcon();
    });

    $('#sort-icon-genre').click(function () {
        sortGenre();
        GenreSortIcon();
    });

    $('#sort-icon-title').click(function () {
        sortTitle();
        TitleSortIcon();
    });

    $('#sort-icon-pubdate').click(function () {
        sortPubDate();
        PubDateSortIcon();
    });

    $('#swipe-test').click(function () {
        swipeShelf();
    });

    $('#show-book').click(function () {
        showBook();
    });

    $('#hide-book').click(function () {
        hideBook();
    });

    $('#search-icon').click(function () {
        showSearch();
    });

    $('#search-detail-termBox').click(function () {
        $('#search-detail-termBox-term').text('kingsolver');
    });


    // search
    $('#search-detail-icon').click(function () {
        $('#search-detail').fadeOut('slow');
        $('#search-detail-termBox-term').text('');
        var booksFiltered = filterByAuthor(books_o, filterForAuthor);
        displayFilteredBooks(booksFiltered);
    });

    function filterByAuthor(allBooks, filterOfAuthor) {
        return $(allBooks.books).filter(function (index, item) {
            for (var i in filterOfAuthor) {
                if (!item[i].toString().match(filterOfAuthor[i])) return null;
            }
            return item;
        });
    }

    var filterForAuthor = {
        "title": new RegExp('(.*?)', 'gi'),
        "author": new RegExp('Kingsolver', 'gi'),
        "genre": new RegExp('(.*?)', 'gi'),
        "published_date": new RegExp('(.*?)', 'gi'),
        "cover_url": new RegExp('(.*?)', 'gi')
    };


    // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel: "cosmic_book_shelf",      // CONNECT TO THIS CHANNEL.
        error: function () {        // LOST CONNECTION (auto reconnects)
            alert("Connection Lost. Will auto-reconnect when Online.")
        },
        callback: function (message) { // RECEIVED A MESSAGE.
            console.log(message);
            if (message != "Hi from PubNub.") {
                //var gestures = message.gestures;
                var gesture = message.Gestures[0].Gesture;
                switch (gesture) {
                    case "SwipeToRight":
                        sortByTypes();
                        break;
                    case "SwipeToLeft":
                        swipeShelf();
                        break;
                    case "Circle":
                        showBook();
                        break;
                }
            }


        },
        connect: function () {        // CONNECTION ESTABLISHED.

            // SEND MESSAGE
            PUBNUB.publish({
                channel: "cosmic_book_shelf",
                message: "Hi from PubNub."
            })

        }
    })
    
  function AuthorSortIcon() {
    if ($('#sort-icon-author').attr("src").indexOf("_selected") >= 1) {
      return;
    }
    
    /* set sort icon selected state */
      var src = $('#sort-icon-author').attr("src").replace(".png", "_selected.png");
      $('#sort-icon-author').attr("src", src);
      
    /* clear other sort icon selected state */
      var src = $('#sort-icon-genre').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-genre').attr("src", src);
      var src = $('#sort-icon-pubdate').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-pubdate').attr("src", src);
      var src = $('#sort-icon-title').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-title').attr("src", src);
  }
  
  function GenreSortIcon() {
    if ($('#sort-icon-genre').attr("src").indexOf("_selected") >= 1) {
      return;
    }
    
    /* set sort icon selected state */
      var src = $('#sort-icon-genre').attr("src").replace(".png", "_selected.png");
      $('#sort-icon-genre').attr("src", src);
      
    /* clear other sort icon selected state */
      var src = $('#sort-icon-author').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-author').attr("src", src);
      var src = $('#sort-icon-pubdate').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-pubdate').attr("src", src);
      var src = $('#sort-icon-title').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-title').attr("src", src);
  }
  
  function PubDateSortIcon() {
    if ($('#sort-icon-pubdate').attr("src").indexOf("_selected") >= 1) {
      return;
    }
    
    /* set sort icon selected state */
      var src = $('#sort-icon-pubdate').attr("src").replace(".png", "_selected.png");
      $('#sort-icon-pubdate').attr("src", src);
      
    /* clear other sort icon selected state */
      var src = $('#sort-icon-author').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-author').attr("src", src);
      var src = $('#sort-icon-genre').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-genre').attr("src", src);
      var src = $('#sort-icon-title').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-title').attr("src", src);
  }
  
  function TitleSortIcon() {
    if ($('#sort-icon-title').attr("src").indexOf("_selected") >= 1) {
      return;
    }
    
    /* set sort icon selected state */
      var src = $('#sort-icon-title').attr("src").replace(".png", "_selected.png");
      $('#sort-icon-title').attr("src", src);
      
    /* clear other sort icon selected state */
      var src = $('#sort-icon-author').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-author').attr("src", src);
      var src = $('#sort-icon-genre').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-genre').attr("src", src);
      var src = $('#sort-icon-pubdate').attr("src").replace("_selected.png", ".png");
      $('#sort-icon-pubdate').attr("src", src);
  }

});