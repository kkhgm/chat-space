$(function(){
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
      // var html = buildHTML(data);
      // $('.comments').append(html)
      // $('.textbox').val('')
    })


  })
})
