require "test_helper"

class Api::V1::PatientsControllerTest < ActionDispatch::IntegrationTest
  test "lists patients" do
    Patient.create!(name: "Nina", age: 41, condition: "Hypertension", status: "active")

    get api_v1_patients_url, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 1, body.size
    assert_equal "Nina", body.first["name"]
  end

  test "creates a patient" do
    assert_difference("Patient.count", 1) do
      post api_v1_patients_url, params: {
        patient: {
          name: "Ravi",
          age: 37,
          condition: "Asthma",
          status: "active"
        }
      }, as: :json
    end

    assert_response :created
  end
end
