require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HealthcareMonolith
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    config.secret_key_base = if ENV["SECRET_KEY_BASE"].present?
      ENV["SECRET_KEY_BASE"]
    elsif ENV["RAILS_SECRET_KEY_BASE"].present?
      ENV["RAILS_SECRET_KEY_BASE"]
    elsif Rails.application.credentials.secret_key_base.present?
      Rails.application.credentials.secret_key_base
    else
      "development-fallback-secret-change-me"
    end

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
