defmodule KatainginreactWeb.Router do
  use KatainginreactWeb, :router

  import KatainginreactWeb.UserAuth
  import KatainginreactWeb.UserAPIAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {KatainginreactWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_current_user_api
  end

  scope "/", KatainginreactWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  scope "/api/v1", KatainginreactWeb do
    pipe_through :api

    post "/users/log_in", UserSessionAPIController, :create
    delete "/users/log_out", UserSessionAPIController, :delete

    post "/users/register", UserRegistrationController, :create
  end

  scope "/api/v1", KatainginreactWeb do
    pipe_through [:api, :require_authenticated_user_api]

    get "/auth", UserSessionAPIController, :show

    get "/me", UserController, :show
    post "/users/topic/follow", UserController, :follow
    post "/users/topic/unfollow", UserController, :unfollow

    get "/topics", TopicController, :index
    get "/topics/:id", TopicController, :show

    get "/news_resources/:topic_id", NewsResourceController, :index
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:katainginreact, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: KatainginreactWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes

  scope "/", KatainginreactWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    live_session :redirect_if_user_is_authenticated,
      on_mount: [{KatainginreactWeb.UserAuth, :redirect_if_user_is_authenticated}] do
      live "/users/register", UserRegistrationLive, :new
      live "/users/log_in", UserLoginLive, :new
      live "/users/reset_password", UserForgotPasswordLive, :new
      live "/users/reset_password/:token", UserResetPasswordLive, :edit
    end

    post "/users/log_in", UserSessionController, :create
  end

  scope "/", KatainginreactWeb do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [{KatainginreactWeb.UserAuth, :ensure_authenticated}] do
      live "/users/settings", UserSettingsLive, :edit
      live "/users/settings/confirm_email/:token", UserSettingsLive, :confirm_email
    end
  end

  scope "/", KatainginreactWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete

    live_session :current_user,
      on_mount: [{KatainginreactWeb.UserAuth, :mount_current_user}] do
      live "/users/confirm/:token", UserConfirmationLive, :edit
      live "/users/confirm", UserConfirmationInstructionsLive, :new
    end
  end
end
