$(function () {

    // onload sort by author and display books
    sortAuthor();
    displayBooks();
    // create array for the sort types.
    var sortTypes = new Array(sortAuthor, sortTitle, sortGenre, sortPubDate);
    var currentSortType = 0;

    function displayBooks() {
        $book_rows = $('div.book');
        $book_rows.each(function (index) {
          //console.log($(this).find('img'));
          $current_img = $(this).find('img')[0];
          $current_img.src = books_o["books"][index]["cover_url"];
          $current_img.setAttribute('data-index', index);
            //console.log($(this).find('img'));
            $current_img = $(this).find('img')[0];
            $current_img.src = books_o["books"][index]["cover_url"];
            $current_img.setAttribute('data-index', index);
            $current_img.style.visibility = 'visible';
        });
    }

    function displayFilteredBooks(filteredBooks) {
        $book_rows = $('div.book');
        $book_rows.each(function (index) {
            if (filteredBooks.length > index) {
                $current_img = $(this).find('img')[0];
                $current_img.src = filteredBooks[index]["cover_url"];
                $current_img.setAttribute('data-index', index);
            }
            else {
                $current_img = $(this).find('img')[0];
                $current_img.style.visibility = 'hidden';
            }
        });
    }

    function sortAuthor() {
        books_o.books.sort(function (a, b) {
          a = a.author,
          b = b.author;
          return a.localeCompare(b);
        });
    };

    function sortTitle(a, b) {
        books_o.books.sort(function (a, b) {
          a = a.title,
          b = b.title;
        return a.localeCompare(b);
        });
    };

    function sortGenre(a, b) {
        books_o.books.sort(function (a, b) {
          a = a.genre,
          b = b.genre;
          return a.localeCompare(b);
        });
    };

    function sortPubDate(a, b) {
        books_o.books.sort(function (a, b) {
          a = a.published_date,
          b = b.published_date;
          return a.localeCompare(b);
        });
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
        $('#book-detail-cover').find('img')[0].src = book.cover_url;
        $('#book-detail').fadeIn();
    }
    
    function hideBook() {
      $('#book-detail').fadeOut('slow');
    }

    $('#sort-icon-author').click(function () {
        sortAuthor();
        displayBooks();
    });

    $('#sort-icon-genre').click(function () {
        sortGenre();
        displayBooks();
    });

    $('#sort-icon-title').click(function () {
        sortTitle();
        displayBooks();
    });

    $('#sort-icon-pubdate').click(function () {
        sortPubDate();
        displayBooks();
    });

    $('#show-book').click(function () {
        showBook();
    });
    
    $('#hide-book').click(function() {
      hideBook();
    });

    $('#search-books').click(function () {
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
        connect: function () {        // CONNECTION ESTABLISHED.

            // SEND MESSAGE
            PUBNUB.publish({
                channel: "cosmic_book_shelf",
                message: "Hi from PubNub."
            })

        }
    })

});