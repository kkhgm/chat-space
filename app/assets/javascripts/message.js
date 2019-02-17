$(document).on('turbolinks:load', function() {
  $(function(){
    function buildSendMessageHTML(message){
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
                    </div>
                  </div>`
    return html;}

    function buildIMAGE(message){
    var html = `<img class="lower-message__image" src=${ message.image } alt=${ message.content } />`
    return html;}

    function addMessages(catch_message){
      var html = `<div id = "last-message" class='message'>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                      ${ catch_message.name }
                      <span class= "check-no">${ catch_message.id }</span>
                      </div>
                      <div class='upper-message__date'>
                      ${ catch_message.date }
                      </div>
                    </div>
                    <div class='lower-meesage'>
                      <p class='lower-message__content'>
                      ${ catch_message.content }
                      </p>
                    </div>
                  </div>`
    return html;}

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

      .done(function(jsonData){
        var html = buildSendMessageHTML(jsonData);
        $(".main__messages").append(html)

        var add_img = buildIMAGE(jsonData);
        if (jsonData.image !== null) {
          $(".main__messages").append(add_img)
        };
        var element = document.getElementById('last-message');
        element.scrollIntoView(false);
        $("#new_message")[0].reset();
      })
      .fail(function(){
        alert('error');
      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
    })

  $(function(){
      setInterval (function(){
      var catchMessagesUrl = $("#new_message").attr('action')
      var ary = $('[data-id]');
      var str = [];
      for(var i = 0; i < ary.length; i++){
        str.push(ary[i].getAttribute('data-id'));
      }
      var getDataId  =  Math.max.apply(null, str);
      // debugger;

      $.ajax({
        url: catchMessagesUrl,
        type: "GET",
        data: { message_id: getDataId },
        dataType: 'json',
      })
       .done(function(catchMsassages) {
        catchMsassages.forEach(function(catchMsassage) {
          var html = addMessages(catchMsassage);
          // $(".main__messages").append(html)
        });

       // .fail(function() {
       //    alert('失敗しました');
       })

      },5000);
    })
  })

});
