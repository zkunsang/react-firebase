import React, { useRef, useState } from 'react'
import "./RegisterPage.css"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [errorFromSubmit, setErrorFromSubmit] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setLoading(true);

            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        } catch (error) {
            setErrorFromSubmit(error.message);
            setTimeout(() => {
                setErrorFromSubmit("")
            }, 5000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>Login</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This field is required</p>}
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    defaultValue="test"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>This password max Length is 6</p>}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}
                <input type="submit" disabled={loading} />
                <Link style={{ color: 'gray', textDecoration: 'none' }} to="/register">아직 아이디가 없다면</Link>
            </form>
        </div>
    )
}

export default LoginPage
