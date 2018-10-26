defmodule TaskTracker2.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :done, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: true
      add :minutes_spent, :integer, default: 0

      timestamps()
    end

  end
end
