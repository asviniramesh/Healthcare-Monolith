class Appointment < ApplicationRecord
  belongs_to :patient

  validates :doctor_name, presence: true
  validates :scheduled_at, presence: true
end
