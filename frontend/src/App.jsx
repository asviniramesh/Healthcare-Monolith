import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [form, setForm] = useState({ name: '', age: '', condition: 'Diabetes', status: 'active' })
  const [appointmentForm, setAppointmentForm] = useState({ patient_id: '', doctor_name: '', scheduled_at: '', status: 'scheduled' })
  const [message, setMessage] = useState('')

  const loadData = async () => {
    const [patientsRes, appointmentsRes] = await Promise.all([
      fetch('/api/v1/patients'),
      fetch('/api/v1/appointments'),
    ])

    const patientsData = await patientsRes.json()
    const appointmentsData = await appointmentsRes.json()
    setPatients(patientsData)
    setAppointments(appointmentsData)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handlePatientSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/v1/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient: { ...form, age: Number(form.age) } }),
    })
    if (res.ok) {
      setForm({ name: '', age: '', condition: 'Diabetes', status: 'active' })
      setMessage('Patient saved successfully')
      await loadData()
    }
  }

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/v1/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointment: { ...appointmentForm, patient_id: Number(appointmentForm.patient_id) } }),
    })
    if (res.ok) {
      setAppointmentForm({ patient_id: '', doctor_name: '', scheduled_at: '', status: 'scheduled' })
      setMessage('Appointment scheduled successfully')
      await loadData()
    }
  }

  return (
    <main className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">Rails + React monolith</p>
          <h1>Healthcare Operations Dashboard</h1>
          <p className="subtitle">Manage patients and upcoming appointments from one place.</p>
        </div>
        {message ? <div className="message">{message}</div> : null}
      </header>

      <section className="grid">
        <form className="card" onSubmit={handlePatientSubmit}>
          <h2>Add patient</h2>
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Age
            <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
          </label>
          <label>
            Condition
            <input value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} required />
          </label>
          <label>
            Status
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="stable">Stable</option>
              <option value="critical">Critical</option>
            </select>
          </label>
          <button type="submit">Save patient</button>
        </form>

        <form className="card" onSubmit={handleAppointmentSubmit}>
          <h2>Schedule appointment</h2>
          <label>
            Patient
            <select value={appointmentForm.patient_id} onChange={(e) => setAppointmentForm({ ...appointmentForm, patient_id: e.target.value })} required>
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </label>
          <label>
            Doctor
            <input value={appointmentForm.doctor_name} onChange={(e) => setAppointmentForm({ ...appointmentForm, doctor_name: e.target.value })} required />
          </label>
          <label>
            Scheduled at
            <input type="datetime-local" value={appointmentForm.scheduled_at} onChange={(e) => setAppointmentForm({ ...appointmentForm, scheduled_at: e.target.value })} required />
          </label>
          <label>
            Status
            <select value={appointmentForm.status} onChange={(e) => setAppointmentForm({ ...appointmentForm, status: e.target.value })}>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <button type="submit">Book appointment</button>
        </form>
      </section>

      <section className="grid lower-grid">
        <div className="card">
          <h2>Patients</h2>
          <ul className="list">
            {patients.map((patient) => (
              <li key={patient.id}>
                <strong>{patient.name}</strong>
                <span>{patient.condition} · {patient.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Appointments</h2>
          <ul className="list">
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <strong>{appointment.doctor_name}</strong>
                <span>{appointment.patient?.name} · {appointment.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App
