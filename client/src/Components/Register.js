import React, { Fragment, useState } from 'react';
import '../styles/Login.scss';


const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData

  const fieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async (e) => {
    e.preventDefault();
    //check passwords are the same
    if (password !== password2){
      console.log('Passwords do not match!')
    } else {
      console.log('Success')
    }
  }

  return(
    <Fragment>
      <section className='Register'>
        <form onSubmit={e => onSubmit(e)}>
          <div className='title'>
            <h1>Register new user</h1>
          </div>
          <div className='field username'>
            <input
              id='username'
              name='username'
              value={username}
              onChange={e => fieldChange(e)}
              type='text'
              placeholder='user name'
              required
            />
          </div>
          <div className='field email'>
            <input
              id='email'
              name='email'
              value={email}
              onChange={e => fieldChange(e)}
              type='email'
              placeholder='email address'
              required
            />
          </div>
          <div className='field password'>
            <input
              id='password'
              name='password'
              value={password}
              onChange={e => fieldChange(e)}
              type='password'
              placeholder='password'
              minLength='6'
              required
            />
          </div>
          <div className='field password2'>
            <input
              id='password2'
              name='password2'
              value={password2}
              onChange={e => fieldChange(e)}
              type='password'
              placeholder='password confirmation'
              minLength='6'
              required
            />
          </div>
          <div className='field'>
            <button type='submit'>Register</button>
          </div>
        </form>
      </section>
    </Fragment>
  )
}

export default Register;



  // TEST submit - without redux
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   //check passwords are the same
  //   if (password !== password2){
  //     console.log('Passwords do not match!')
  //   } else {
  //     console.log(formData)
  //     const newUser = {
  //       name: username,
  //       email,
  //       password
  //     }

  //     try {
  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //       const body = JSON.stringify(newUser)

  //       const res = await axios.post('/api/user', body,config)
  //       console.log(res.data)
  //     } catch (error) {
  //       console.error(error.response.data)
  //     }
  //   }
  // }