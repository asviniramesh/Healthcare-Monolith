class ApplicationController < ActionController::Base
  def index
    index_file = Rails.root.join("public/index.html")

    if index_file.exist?
      render file: index_file, layout: false
    else
      render plain: "Healthcare Monolith is running"
    end
  end
end
