defmodule TaskTrackerWeb.UserView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      is_manager: user.is_manager,
      manager_name: user.manager}
  end

  def render("edit.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end
end
