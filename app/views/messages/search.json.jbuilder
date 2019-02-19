# -binding.pry

json.content  @catch_message.content
json.image    @catch_message.image.url
json.name     @catch_message.user.name
json.id       @catch_message.id
json.date     @catch_message.created_at.strftime("%Y/%m/%d %H:%M")
