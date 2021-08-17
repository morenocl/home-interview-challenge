import { Alert, Button, CardLink, FormGroup, Input, Label } from 'reactstrap';
import { CHECKBOX, CONFIRM_PASSWORD, PASSWORD, SELECT } from './constants'

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

export const makeButton = (elem) => { return (
  <div key='button-id' style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button
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
  <CardLink key='link-id' href={elem.target}>
    {elem.text}
  </CardLink>
)}

export const makeSelect = (elem, state, setState) => { return (
  <FormGroup key={elem.name}>
    <Label for={elem.name}>{elem.label}</Label>
    <Input
      type={elem.type}
      name={elem.name}
      id={elem.name}
      onChange={(ev) => onChange(ev, state, setState)}
    >
      {elem.options.map((val, i) => { return (
        <option value={val.value}>{val.label}</option>
      )})}
    </Input>
  </FormGroup>
)}

export const makeText = (elem, state, setState) => { return (
  <FormGroup key={elem.name}>
    <Label for={elem.name}>{elem.label}</Label>
    <Input
      type={elem.type === CONFIRM_PASSWORD ? PASSWORD : elem.type}
      name={elem.name}
      id={elem.name}
      onChange={(ev) => onChange(ev, state, setState)}
    />
  </FormGroup>
)}
