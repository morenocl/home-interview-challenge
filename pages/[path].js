import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Form } from 'reactstrap';
import axios from 'axios';
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.min.css';

import { LOGIN, REGISTER, URL } from '../utils/constants';
import { BUTTON, CHECKBOX, EMAIL, LINK, PASSWORD, SELECT, TEXT } from '../utils/constants';
import { makeOnChange, makeButton, makeCheckbox, makeLink, makeSelect, makeText } from '../utils/makers';


export default function Page(props) {
  const { path, data, status } = props
  const [state, setState] = useState({})

  let input = null
  const makeInput = (elem, methods = {}) => {
    // console.log(methods)
    let component = <div></div>
    switch (elem.type) {
      case CHECKBOX:
        component = makeCheckbox(elem, state, setState)
        break
      case BUTTON:
        component = makeButton(elem, methods)
        break
      case SELECT:
        component = makeSelect(elem, state, setState)
        break
      case LINK:
        component = makeLink(elem)
        break
      case TEXT:
      case EMAIL:
      case PASSWORD:
        component = makeText(elem, state, setState)
        break
      default:
    }
    return component
  }

  const login = () => {
    axios.post(`${URL}/${LOGIN}`, JSON.stringify(state), {headers: {'content-type': "application/json"}})
      .then(res => {console.log(res)})
      .catch(err => {console.log(err)})
  }

  const register = () => {
    axios.post(`${URL}/${REGISTER}`, JSON.stringify(state), {headers: {'content-type': "application/json"}})
      .then(res => {console.log(res)})
      .catch(err => {console.log(err)})
  }

  const methods = {
    register,
    login,
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '30rem' }}>
        <CardBody>
          <CardTitle tag='h3'>{data.title}</CardTitle>
        </CardBody>
        <CardBody>
            {status === 200 && (
              <Form>
                {data.inputs.map((e, i) => makeInput(e, methods))}
              </Form>
            )}
            {status === 404 && (
              <CardText>
                {data.text}
              </CardText>
            )}
        </CardBody>
      </Card>
    </div>
  );
}

Page.getInitialProps = async (ctx) => {
  const { query: { path } } = ctx

  const ret = await axios.get(`${URL}/configuration/${path}`)
    .then(res => { return {
      path: path,
      data: res.data,
      status:res.status,
    }})
    .catch(err => { return {
      path: path,
      data: {title: 'Error 404', text: 'Page not found'},
      status: 404,
    }})

  return ret
}
