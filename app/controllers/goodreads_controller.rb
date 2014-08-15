class GoodreadsController < ApplicationController
  def authorize
    consumer = OAuth::Consumer.new(
      Goodreads.configuration[:api_key],
      Goodreads.configuration[:api_secret],
      :site => 'http://www.goodreads.com')
    $request_token = consumer.get_request_token
    oauth_url = $request_token.authorize_url(:oauth_callback => bookshelf_show_url)
    redirect_to(oauth_url)
  end

  def populate_shelf
    @books = []
    begin
      access_token = $request_token.get_access_token
      @goodreads_client = Goodreads.new(oauth_token: access_token)
      client_id = @goodreads_client.user_id
      shelf = @goodreads_client.shelf(client_id, 'all')
      shelf[:books].each do |goodreads_book_profile|
        cosmicshelf_book_profile = {
          title: goodreads_book_profile[:book][:title],
          author: goodreads_book_profile[:book][:authors][:author][:name],
          genre: get_genres(goodreads_book_profile),
          published_date: goodreads_book_profile[:book][:publication_year],
          description: goodreads_book_profile[:book][:description],
          cover_url: goodreads_book_profile[:book][:image_url] }
        @books.push(cosmicshelf_book_profile)
      end
    rescue
      @books = nil
    end
  
    respond_to do |format|
      format.js { render :json => @books.to_json }
    end
  end

  def get_genres(goodreads_book_profile)
    isbn = goodreads_book_profile[:book][:isbn]
    genres = ''
    @goodreads_client.book_by_isbn(isbn)[:popular_shelves][:shelf].each do |category|
      genre = category[:name]
      genres = genres + genre + ', ' if verify_genre(genre) 
    end
    genres[-1] = '' 
    genres[-1] = '' 
    return genres
  end

  def verify_genre(genre)
    case genre
    when 'currently-reading',       
         'to-read', 
         'read',
         'favorites',
         'nonfiction',
         'non-fiction',
         'fiction',
         'classics'
      return false
    else
       return true
    end
  end
end
