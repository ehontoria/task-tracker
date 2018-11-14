defmodule TaskTracker3.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :ismanager, :boolean
      add :manager_name, :string

      timestamps()
    end

  end
end
