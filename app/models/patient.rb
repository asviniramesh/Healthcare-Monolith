class Patient < ApplicationRecord
  has_many :appointments, dependent: :destroy

  validates :name, presence: true
  validates :condition, presence: true
end
