import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = async () => {
    const newUser = {
      username: watch("username"),
      password: watch("password"),
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", newUser);
      console.log(response);
      setFetchError(null);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setFetchError(error.response.data.message);
      } else {
        setFetchError(error.message);
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const onSubmit = () => {
    // e.preventDefault();
    console.log(watch("username"));
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    handleRegister();
  };
  return (
    <>
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="register">Register</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
          })}
        />
        <button type="Submit">Submit</button>
      </form>
      <br></br>
      {fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {errors.username?.type === "required" && <p>Username is required</p>}
      {errors.password?.type === "required" && <p>Password is required</p>}
      {errors.password?.type === "pattern" && <p>Password is bad</p>}
      {(errors.username || errors.password) && <br></br>}
      {watch("password") && /[a-z]/.test(watch("password")) ? (
        <del>Must have one lowercase letter.</del>
      ) : (
        <p>Must have one lowercase letter.</p>
      )}
      {watch("password") && /[A-Z]/.test(watch("password")) ? (
        <del>Must have one uppercase letter.</del>
      ) : (
        <p>Must have one uppercase letter.</p>
      )}
      {watch("password") && /[0-9]/.test(watch("password")) ? (
        <del>Must have one number.</del>
      ) : (
        <p>Must have one number.</p>
      )}
      {watch("password") && /[!@#$%^&*_=+-]/.test(watch("password")) ? (
        <del>Must have one special character, ex: !@#$%^&*_=+-</del>
      ) : (
        <p>Must have one special character, ex: !@#$%^&*_=+-</p>
      )}
      {watch("password") &&
      watch("password").length >= 8 &&
      watch("password").length <= 12 ? (
        <del>Must be 8 to 12 characters long.</del>
      ) : (
        <p>Must be 8 to 12 characters long.</p>
      )}
    </>
  );
};

export default Register;

// undefined show the must
// defined but incorrect show the must
// defined and correct show the crossed-out
