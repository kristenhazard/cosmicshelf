// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  
  $('#sort-icon-author').click(function() {
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
  });
  
  $('#sort-icon-genre').click(function() {
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
  });
  
  $('#sort-icon-pubdate').click(function() {
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
  });
  
  $('#sort-icon-title').click(function() {
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
  });
});