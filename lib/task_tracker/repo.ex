defmodule TaskTracker2.Repo do
  use Ecto.Repo,
    otp_app: :task_tracker,
    adapter: Ecto.Adapters.Postgres
end
