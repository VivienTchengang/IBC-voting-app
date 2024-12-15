import { useLocation, useNavigation } from 'react-router-dom';
import './login.css';
import { FormEvent, useEffect } from "react";

export function Login() {
  const { state } = useLocation();

  useEffect(() => {
    if(state?.message) {
      alert(state.message)
    }
  
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { email, password } = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())

    console.log('email', email);
    console.log('password', password);

    const response = await fetch('/backend', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await response.json() ;

    const sessionId = data.sessionId ;

    localStorage.setItem('item', sessionId)
  }

  return (
    <section className="h-full w-full bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit} 
        className="flex flex-col gap-2"
      >
        <div>
          <input name="email" className="h-10 px-4 border-2" type="text" placeholder="Email" />
        </div>
        <div>
          <input name="password" className="h-10 px-4 border-2" type="password" placeholder="Password" />
        </div>
        <button className="bg-secondary text-white px-8 py-2 rounded-lg" type="submit">Login</button>
      </form>
    </section>
  )
}