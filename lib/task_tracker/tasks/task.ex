defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :done, :boolean, default: false
    field :name, :string
    field :minutes_spent, :integer, default: 0

    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :done, :user_id, :minutes_spent])
    |> validate_required([:name, :done, :user_id, :minutes_spent])
  end
end
