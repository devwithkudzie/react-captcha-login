import { useState } from 'react'
import './App.css'
import ReCAPTCHA from 'react-google-recaptcha'

function App() {
  // State for managing reCAPTCHA response
  const [captchaValue, setCaptchaValue] = useState(null)

  // State for form input values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // States for managing UI feedback
  const [error, setError] = useState('')        // For error messages
  const [success, setSuccess] = useState(false) // For successful login
  const [isLoading, setIsLoading] = useState(false) // For loading state

  /**
   * Handles form submission and validation
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // Validate reCAPTCHA completion
    if (!captchaValue) {
      setError('Please verify that you are human!')
      setIsLoading(false)
      return
    }

    // Validate required fields
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call to backend
      console.log('Login attempt:', { 
        ...formData, 
        captchaToken: captchaValue
      })

      // Simulate network delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setError('')
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles input field changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  /**
   * Handles forgot password functionality
   * Validates email presence before initiating password reset
   */
  const handleForgotPassword = () => {
    if (!formData.email) {
      setError('Please enter your email address to reset password')
      return
    }
    console.log('Password reset requested for:', formData.email)
    alert('If your email exists in our system, you will receive a password reset link.')
  }

  // Render success message if login is successful
  if (success) {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="success-message">
          Login successful! Welcome back.
        </div>
      </div>
    )
  }

  // Render login form
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Email input field */}
        <div className="form-group">
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            disabled={isLoading}
          />
        </div>

        {/* Password input field */}
        <div className="form-group">
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            disabled={isLoading}
          />
        </div>

        {/* Forgot password button */}
        <div className="form-options">
          <button 
            type="button" 
            className="forgot-password"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>

        {/* Google reCAPTCHA component */}
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey="6LdDiq8qAAAAAEt3On5ey_OXjHjw-O3ejalSWPRQ"
            onChange={value => setCaptchaValue(value)}
          />
        </div>

        {/* Submit button with loading state */}
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default App
