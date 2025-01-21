import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Form = ({ onSubmit, staticData, setStaticData }) => {
  const [formData, setFormData] = useState({
    name: '',
    inTime: '',
    outTime: '',
    break: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLeftColumnChange = (e) => {
    const { name, value } = e.target
    setStaticData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare the data to send
    const dataToSave = {
      ...staticData, // Add static data (date, term, week)
      ...formData // Add form data (name, inTime, outTime, break)
    }

    onSubmit(dataToSave) // Pass data to parent component (Home)

    // Clear form data after submission
    setFormData({ name: '', inTime: '', outTime: '', break: '' })
  }

  useEffect(() => {
    // Populate form with static data when component mounts
    setFormData((prev) => ({
      ...prev,
      date: staticData.date,
      term: staticData.term,
      week: staticData.week
    }))
  }, [staticData]) // Update whenever staticData changes

  return (
    <form
      className="grid grid-cols-2 gap-8 p-8 bg-gray-100 rounded shadow-md max-w-4xl mx-auto text-black"
      onSubmit={handleSubmit}
    >
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-bold text-black">Date:</label>
          <input
            type="date"
            name="date"
            value={staticData.date}
            onChange={handleLeftColumnChange}
            className="p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block font-bold text-black">Term:</label>
          <input
            type="text"
            name="term"
            value={staticData.term}
            onChange={handleLeftColumnChange}
            className="p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block font-bold text-black">Week:</label>
          <input
            type="text"
            name="week"
            value={staticData.week}
            onChange={handleLeftColumnChange}
            className="p-2 w-full border rounded text-black"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-bold text-black">Name:</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 w-full border rounded text-black"
            required
          >
            <option value="" disabled>
              Select Name
            </option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Michael Brown">Michael Brown</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-black">In Time:</label>
          <input
            type="time"
            name="inTime"
            value={formData.inTime}
            onChange={handleInputChange}
            className="p-2 w-full border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-black">Out Time:</label>
          <input
            type="time"
            name="outTime"
            value={formData.outTime}
            onChange={handleInputChange}
            className="p-2 w-full border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-black">Break (minutes):</label>
          <input
            type="number"
            name="break"
            value={formData.break}
            onChange={handleInputChange}
            className="p-2 w-full border rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-[#800000] text-white rounded hover:bg-[#660000] duration-300"
        >
          Save
        </button>
      </div>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  staticData: PropTypes.object.isRequired,
  setStaticData: PropTypes.func.isRequired
}

export default Form
