import React, {useEffect} from "react";

import Link from "next/link";
import Image from "next/image";

import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import google from "../assets/PRAMANIT/google.png";

import userlogin from "../assets/PRAMANIT/loginuser.png";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import UserLoginForm from "../src/components/Forms/LoginForm";

import {connect} from "react-redux";
import {addToken, removeToken} from "../redux/actions/token.action";
import {signIn} from "next-auth/react";

import axios from "axios";

function UserLogin({addUserDetails}) {
  const router = useRouter();
  const session = useSession();

  const setToken = () => {
    console.log("in HERE", session);
    addUserDetails(session.data.user);
    // localStorage.setItem("pramanit-user", JSON.stringify(session.data.user));
    // resetForm({values: ""});
    // window.location('/userdashboard')
    router.push("/userdashboard");
  };

  const login = (values) => {
    axios
      .post(`/api/login`, values)
      .then((res) => {
        addUserDetails(res.data.user);
        // localStorage.setItem("pramanit-user", JSON.stringify(res.data.user));
        router.push("/userdashboard");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>
          <UserLoginForm onsubmit={login} />
        </div>
        <div></div>
        <div className={styles.bottomText}>
          <p className={styles.message}>
            Do you have an account?{" "}
            <Link href="/register">
              <a className={styles.boldtext}>Sign Up</a>
            </Link>
          </p>
        </div>
        <p className={styles.orline}>
          <span>OR</span>
        </p>
        <div
          className={styles.googlecontainer}
          onClick={
            () =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/userdashboard",
              })

            //   signIn("google", {callbackUrl: "http://localhost:3000/userdashboard"}).then(res=>{
            //     console.log("Here in google response")
            //     console.log("Gooogle res",res)
            //   }).catch(err=>{
            //     console.log("Error here in google auth",err)
            //   })
          }
        >
          {session.data != undefined ? setToken() : console.log(session.data)}
          <Image src={google} width={20} height={20} />
          <p>Sign in with Google</p>
        </div>
      </div>
    </FormBackground>
  );
}

const mapStateToProps = (state) => ({
  token: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserDetails: (param) => dispatch(addToken(param)),
    removeUserDetails: () => dispatch(removeToken()),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
