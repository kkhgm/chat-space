class MessagesController < ApplicationController
  def index
  end

  def create
    Message.create(messages_params)
  end

  private
  def messages_params
    params.require(:message).permit(:content, :image, :group_id, :user_id)
  end

end
