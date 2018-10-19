defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :done, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: true

      timestamps()
    end

  end
end
