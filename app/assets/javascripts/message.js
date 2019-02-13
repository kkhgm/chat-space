$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
      var html = `<div id = "last-message" class='message'>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                      ${ message.name }
                      ${ message.id }
                      </div>
                      <div class='upper-message__date'>
                      ${ message.date }
                      </div>
                    </div>
                    <div class='lower-meesage'>
                      <p class='lower-message__content'>
                      ${ message.content }
                      </p>
                      ${ message.image }
                    </div>
                  </div>`
    return html;
    }

    $("#new_message").on("submit", function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $(".main__messages").append(html)
          var element = document.getElementById('last-message');
          element.scrollIntoView(false);
        $("#new_message")[0].reset();
      })
      .fail(function(){
      alert('error');
    })
    })
  })
});
