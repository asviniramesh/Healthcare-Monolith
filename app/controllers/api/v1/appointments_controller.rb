class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @appointments = Appointment.includes(:patient).order(scheduled_at: :asc)
    render json: @appointments.as_json(include: :patient)
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: @appointment.as_json(include: :patient), status: :created
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:patient_id, :doctor_name, :scheduled_at, :status)
  end
end
