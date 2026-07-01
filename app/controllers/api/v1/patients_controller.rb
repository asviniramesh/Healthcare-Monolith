class Api::V1::PatientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @patients = Patient.order(created_at: :desc)
    render json: @patients
  end

  def create
    @patient = Patient.new(patient_params)
    if @patient.save
      render json: @patient, status: :created
    else
      render json: { errors: @patient.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def patient_params
    params.require(:patient).permit(:name, :age, :condition, :status)
  end
end
