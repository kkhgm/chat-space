$(function(){

var search_list = $(".chat-group-form__search")

function appendUserName(jsonData) {
  var html =
            `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ jsonData.name }</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
            </div>`
  search_list.append(html);
  }


  $("#user-search-field").on("keyup", function(){
    var users_name = $(this).val();
    // var href = location.href + users_name

    console.log(users_name);

    $.ajax({
      url: '/users',
      type: "GET",
      data: { name: users_name },
      dataType: 'json',
    })

    .done(function(jsonData){
      console.log(jsonData)
      $("#user-search-field").empty();
      if (jsonData.lenght !== 0) {
        jsonData.forEach(function(jsonData) {
          appendUserName(jsonData)
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

  })
})
