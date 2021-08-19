import { Alert, Button, CardLink, FormGroup, Input, Label } from 'reactstrap';
import { CHECKBOX, CONFIRM_PASSWORD, PASSWORD, SELECT } from './constants'

const checkValidation = (state, name, v) => {
  const { comparision, input, values } = v
  let valid = true
  switch (comparision) {
    case 'same':
      valid = state[input] === state[name]
      break
    case 'includes':
      valid = values.includes(state[input]?.toLowerCase())
      break
    case 'not_includes':
      valid = !values.includes(state[name]?.toLowerCase())
      break
    default:
      break
  }
  return valid
}

const getConditions = (state, elem) => {
  const { conditions, name, regex } = elem
  const value = state[name]
  let isValid = true
  let isVisible = true

  if (value && regex) {
    let re = new RegExp(regex)
    isValid = re.test(value);
  }

  conditions?.validations?.map((v, i) => {
    isValid &= checkValidation(state, name, v)
  })
  conditions?.render?.map((r, i) => {
    isVisible = isVisible && checkValidation(state, name, r)
  })

  return {isValid, isVisible}
}

export const onChange = (ev, state, setState) => {
  ev.preventDefault()
  const { target: { checked, name, type, value }, options, selectedIndex } = ev;

  switch (type) {
    case CHECKBOX:
      setState({
        ...state,
        [name]: checked,
      })
      break
    case SELECT:
      setState({
        ...state,
        [name]: options[selectedIndex].value,
      })
      break
    default:
      setState({
        ...state,
        [name]: value,
      })
  }
}

export const makeButton = (elem, methods) => {
  return (
  <div key='button-id' style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button onClick={methods[elem.method]}
      key='button-id'
      style={{justifyContent: 'right'}}
      className="float-right"
    >
      {elem.label}
    </Button>
  </div>
)}

export const makeCheckbox = (elem, state, setState) => { return (
  <FormGroup check key={elem.name}>
    <Label check>
      <Input
        type={elem.type}
        name={elem.name}
        onChange={(ev) => onChange(ev, state, setState)}
      />
      {` ${elem.label}`}
    </Label>
  </FormGroup>
)}

export const makeLink = (elem) => { return (
  <CardLink key='link-id' href={elem.to} target={elem.target}>
    {elem.label}
  </CardLink>
)}

export const makeSelect = (elem, state, setState) => {
  if (!state[elem.name]) {
    setState({...state, [elem.name]: elem.options[0].value})
  }
  return (
    <FormGroup key={elem.name}>
      <Label for={elem.name}>{elem.label}</Label>
      <Input
        type={elem.type}
        name={elem.name}
        id={elem.name}
        onChange={(ev) => onChange(ev, state, setState)}
      >
        {elem.options.map((val, i) => { return (
          <option key={i} value={val.value}>{val.label}</option>
        )})}
      </Input>
    </FormGroup>
  )
}

export const makeText = (elem, state, setState) => {
  const { isValid, isVisible } = getConditions(state, elem)

  return ( isVisible &&
    <FormGroup key={elem.name}>
      <Label for={elem.name}>{elem.label}</Label>
      <Input
        required={elem.required}
        invalid={!isValid}
        type={elem.type}
        name={elem.name}
        id={elem.name}
        onChange={(ev) => onChange(ev, state, setState)}
      />
    </FormGroup>
  )
}
