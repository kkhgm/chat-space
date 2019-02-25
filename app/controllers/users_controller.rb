class UsersController < ApplicationController

  def index
    @users = User.where.not(id: current_user.id).where('name LIKE(?)', "%#{params[:name]}%")
    @group_users = Group.find(params(:id)).user

    respond_to do |format|
      format.html
      format.json
    end
  end

  def search
    @group_users = Group.find(params[:id]).users
    respond_to do |format|
      format.html
      format.json
    end
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
