import React, { useState } from "react";
import add from "../img/addAvatar.png";
import { auth, storage, db } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      //creating a reference to an image before upload
      const storageRef = ref(storage, displayName);
      //to upload file with ref on Storage
      await uploadBytesResumable(storageRef, file).then(() => {
        //get the download URL
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
          //update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            // setLoading(false);
          }

          });
        });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="heading">
          <span className="logo">Real Chat</span>
          <span className="title">Register</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="your name" />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You do have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
