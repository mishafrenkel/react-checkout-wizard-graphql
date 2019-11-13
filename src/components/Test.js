import React from 'react'
import { Form, Field } from 'react-final-form'
import { numberFormat } from 'services/card'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const masks = [
  { name: "card", parse: "9999 9999 9999 9999", parse2: "99999999 99999999" },
]

function clearNumber(value = '') {
  return numberFormat(value.replace(/\D+/g, ''))
}

const App = () => {
  return (
    <div>
      <h1>🏁 React Final Form</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {masks.map(mask => (
              <div key={mask.name}>
                <label>{mask.name}</label>
                <Field
                  pattern="\d{3,4}"
                  component="input"
                  name="card"
                  format={clearNumber}
                  placeholder={mask.parse}
                />
              </div>
            ))}
          </form>
        )}
      />
    </div>
  )
}

export default App
