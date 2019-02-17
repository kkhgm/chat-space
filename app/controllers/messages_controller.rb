class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages  = @group.messages.includes(:user)
    # group.id~から、messageに該当するuser_idを参考にインスタンスをピック。
    @members = @group.users
  end

  def search
    html_last_message = @group.messages.find(params[:message_id])
    table_last_message = @group.messages.last
    calc = table_last_message.id - html_last_message.id

    if calc == 0
        @catch_message = html_last_message
    elsif calc == 1
      @catch_message = table_last_message
      send_to_json
    else
      @catch_messages = @group.messages.where('id> ?',params[:message_id])
      @catch_messages.each do |catch_message|
        @catch_message = catch_message
        send_to_json
      end
    end
  end

  def send_to_json
      respond_to do |format|
        format.html
        format.json
      end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save

      respond_to do |format|
        format.html{redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
