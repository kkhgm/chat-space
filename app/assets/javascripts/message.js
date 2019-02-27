$(document).on('turbolinks:load', function() {
  $(function(){
    function buildSendMessageHTML(message){
      var html = `<div id = "last-message${ message.id }" class='message'>
                    <div class='upper-message' data-id = ${ message.id }>
                      <div class='upper-message__user-name'>
                      ${ message.name }
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
                    <img class="lower-message__image" src=${ message.image } alt=${ message.content } />
                  </div>`
    return html;}

    function noIMAGE(message){
      var html = `<div id = "last-message${ message.id }" class='message'>
                    <div class='upper-message' data-id = ${ message.id }>
                      <div class='upper-message__user-name'>
                      ${ message.name }
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
        var no_img = noIMAGE(jsonData);
        if (jsonData.image !== null) {
        $(".main__messages").append(html)
        } else {
        $(".main__messages").append(no_img)
        }

        var moveLast = 'last-message' + jsonData.id
        var element = document.getElementById(moveLast);
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
      timerId = setInterval (function(){
      var catchMessagesUrl = $("#new_message").attr('action') + '/search'
      var ary = $('[data-id]');
      var str = [];
      for(var i = 0; i < ary.length; i++){
        str.push(ary[i].getAttribute('data-id'));
      }
      var getDataId  =  Math.max.apply(null, str);
      console.log("send!")
      console.log(getDataId)

      if ( ary.length !== 0){
        locationHref = location.href
        if ( locationHref.match("groups/[0-9]{1,3}/messages") ){
          $.ajax({
            url: catchMessagesUrl,
            type: "GET",
            data: { message_id: getDataId },
            dataType: 'json',
          })

           .done(function(catchMsassage) {
              for(var i = 0; i < ary.length; i++){
                str.push(ary[i].getAttribute('data-id'));
              }
              var getNewDataId  =  Math.max.apply(null, str);
                console.log("recieve!")
                console.log(getNewDataId)
                console.log(getDataId)
                console.log(catchMsassage.id)


              if (catchMsassage.id !== getDataId && catchMsassage.id !== getNewDataId) {
               console.log("自動更新スタート")

               function moveLast(){
                  var id = getDataId + 1
                  var moveLast = 'last-message' + id
                  var element = document.getElementById(moveLast);
                  element.scrollIntoView(false);
               };

                    var html = buildSendMessageHTML(catchMsassage);
                    var no_img = noIMAGE(catchMsassage);
                    if (catchMsassage.image !== null) {
                      $(".main__messages").append(html)
                      moveLast()
                    } else {
                        $(".main__messages").append(no_img)
                        moveLast()
                };
              };
               console.log("更新しない")

            })

         .fail(function(){
           alert('メッセージの追加に失敗しました');
          });
        }else {
          clearInterval(timerId);
          }
      }
      },5000);
    });
  });
});
