$(function(){

var names = []
var search_list = $(".chat-group-form__search")

function appendUserName(jsonData) {
  var html =
            `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ jsonData.name }</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
            </div>`
  search_list.append(html);
  }

function deleteUserName(jsonData) {
  var html =
            `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
               <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
               <p class='chat-group-user__name'>${ jsonData.name }</p>
               <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
             </div>`
  search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var users_name = $(this).val();

    $.ajax({
      url: '/users',
      type: "GET",
      data: { name: users_name },
      dataType: 'json',
    })

    .done(function(jsonData){
      if (jsonData.lenght !== 0) {
        jsonData.forEach(function(jsonData) {
          appendUserName(jsonData);
          names.push(jsonData.name)
        });
        console.log(names)
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

    .done(function(jsonData) {
    $(".user-search-add").on("click", function(){
      jsonData.forEach(function(jsonData){
        deleteUserName(jsonData)
        })
    $(this).parent().remove();
      })
    })

  })
})
