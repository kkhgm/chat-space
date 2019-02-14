class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:name]}%")

    # num = 0
    # @users.each do |user|
    #   @users = user[num]
    #   num += 1
    # end

    respond_to do |format|
      format.html #{redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
      format.json
    end
    # binding.pry

  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
