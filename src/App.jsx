import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const res = await axios.post('https://backend-fakenews.onrender.com/api/predict/api/predict/', { text })
      setResults(res.data.results)
    } catch (err) {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Fake News Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una noticia para analizar..."
          style={{ width: '100%', padding: '10px' }}
        ></textarea>
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Analizar
        </button>
      </form>

      {loading && <p>Analizando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultados:</h2>
          <ul>
            <li>Logistic Regression: {results.logistic}</li>
            <li>Decision Tree: {results.decision_tree}</li>
            <li>Gradient Boosting: {results.gradient_boosting}</li>
            <li>Random Forest: {results.random_forest}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
