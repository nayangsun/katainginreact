defmodule Katainginreact.Factory do
  def build(:user) do
    %Katainginreact.Accounts.User{
      email: "user#{System.unique_integer()}@example.com",
      hashed_password: Bcrypt.hash_pwd_salt("password")
    }
  end

  def build(factory_name, attrs) do
    factory_name |> build() |> struct!(attrs)
  end

  def params_for(factory_name, attrs) do
    factory_name |> build() |> struct!(attrs) |> Map.from_struct()
  end

  def insert!(factory_name, attrs \\ []) do
    factory_name |> build(attrs) |> Katainginreact.Repo.insert!()
  end
end
