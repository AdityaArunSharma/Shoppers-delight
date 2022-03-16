import React from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {useState,useEffect} from 'react'
const loginScreen = ({location,history}) => {

    console.log("Login Screen")

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo}  = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    console.log("login screen 34")

//   return (

//     <FormContainer>
//         <h1>Sign In</h1>
//         {error && <Message variant='danger'>{error}</Message>}
//         {loading && <Loader/>}
//         <Form onSubmit={submitHandler}>
//             <Form.Group controlId='email'>
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control type='email' placeholder='Enter email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 ></Form.Control>
//             </Form.Group>


//             <Form.Group controlId='password'>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type='password' placeholder='Enter Password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 ></Form.Control>
//             </Form.Group>

//             <Button type='submit' variant='primary'>Sign In</Button>
//             <Row className='py-3'>
//                 <Col>
//                 New Customer?{' '} <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}></Link>
//                 </Col>
//             </Row>

//         </Form>
//     </FormContainer>
    
//   )




return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default loginScreen