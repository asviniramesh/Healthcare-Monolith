class ApplicationController < ActionController::Base
  def index
    render plain: "Healthcare Monolith is running"
  end
end
