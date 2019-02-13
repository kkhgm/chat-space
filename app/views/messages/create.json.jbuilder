# - binding.pry
json.content  @message.content
json.image    @message.image.url
json.name     @message.user.name
json.id       @message.user.id
json.date     @message.created_at.strftime("%Y/%m/%d %H:%M")

