import React, { useRef, useState } from 'react'
import "./RegisterPage.css"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';


function RegisterPage() {
    const { register, watch, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [errorFromSubmit, setErrorFromSubmit] = useState("");
    const [loading, setLoading] = useState(false);

    const password = useRef();
    password.current = watch("password");

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setLoading(true);
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password);
            console.log(createdUser);

            await createdUser.user.updateProfile({
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            });

            // firebase database에 저장해 주기
            await firebase.database()
                .ref("users/ada/test")
                .child(createdUser.user.uid)
                .set({
                    name: createdUser.user.displayName,
                    image: createdUser.user.photoURL
                });


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
                <h3>Register</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This field is required</p>}
                <label>Name</label>
                <input
                    name="name"
                    defaultValue="test"
                    {...register("name", { required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>max Length is 10</p>}
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    defaultValue="test"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>This password max Length is 6</p>}

                <label>Password Confirm</label>
                <input
                    name="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", { required: true, validate: (value) => value === password.current })}
                />
                {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && <p>not match password</p>}
                {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <p>password required</p>}
                {errorFromSubmit && <p>{errorFromSubmit}</p>}
                <input type="submit" disabled={loading} />
                <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">이미 아이디가 있다면</Link>
            </form>

        </div>
    )
}

export default RegisterPage
