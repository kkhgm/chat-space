$(document).on('turbolinks:load', function() {
  $(function(){


  function appendUserName(jsonData) {
    var html =
              `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ jsonData.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ jsonData.id }" data-user-name="${ jsonData.name }">追加</a>
              </div>`
    $("#user-search-result").append(html);
    }

  function noUserName(jsonData) {
    var html =
              `<div class="chat-group-user clearfix">${jsonData}
              </div>`
    $("#user-search-result").append(html);
    }

  function deleteUserName(jsonData) {
    var html =
              `<div class='chat-group-user clearfix js-chat-member' id='${ jsonData.id }'>
                 <input name='group[user_ids][]' type='hidden' value='${ jsonData.id }'>
                 <p class='chat-group-user__name'>${ jsonData.name }</p>
                 <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    $(".chat-group-users.js-add-user").append(html);
    }

  function indicateUserName(jsonData) {
    var html = ` <div class='chat-group-user clearfix js-chat-member' id='${ jsonData.id }'>
                 <input name='group[user_ids][]' type='hidden' value='${ jsonData.id }'>
                 <p class='chat-group-user__name'>${ jsonData.name }</p>
               </div>`
    $(".chat-group-users.js-add-user").append(html);
    }

    $(document).ready(function() {
      var groupId = location.href.replace(/[^0-9]/g, "",).replace(18224253229, "",);

      $.ajax({
        url: '/users/search',
        type: "GET",
        data: { id: groupId },
        dataType: 'json'
      })

      .done(function(jsonDatas){
        $(".chat-group-user.clearfix").remove();
        if (jsonDatas.lenght !== 0) {
          jsonDatas.forEach(function(jsonData) {
            indicateUserName(jsonData);
          });
        }
      })
    });


    $("#user-search-field").on("keyup", function(){
      var users_name = $(this).val();
      $.ajax({
        url: '/users',
        type: "GET",
        data: { name: users_name },
        dataType: 'json',
      })

      .done(function(jsonDatas){
        $("#user-search-result").children().remove();
        if (jsonDatas.length !== 0) {
          jsonDatas.forEach(function(jsonData) {
          appendUserName(jsonData)
          });
        }
        else {
          noUserName("一致ユーザーはありません")
        };
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })

      .done(function(jsonDatas) {
      $(".user-search-add.chat-group-user__btn.chat-group-user__btn--add").on("click", function(){
        getUsersName = $(this).prev().text();
        jsonDatas.forEach(function(jsonData){
            if (jsonData.name == getUsersName) {
            deleteUserName(jsonData)
            }
          })
      $(this).parent().remove();
        })
      $(function(){
        $(document).on('click', '.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function(){
        $(this).parent().remove();
        });
      });
      })
    })
  })
})
