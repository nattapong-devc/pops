"use client";
import { PROFILE } from "@/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
  socialData: null,
  signin: (token) => {},
  signOut: () => {},
  getUserData: () => {},
  social: (name, data) => {},
  disconnectSocial: (name) => {},
};

export const UserContext = createContext(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signin = (token) => {
    const key = process.env.USER_ACCESS_TOKEN_KEY;

    if (key) {
      localStorage.setItem(key, token);
      getUserData();
    }
  };

  const signOut = () => {
    const key = process.env.USER_ACCESS_TOKEN_KEY;

    if (key) {
      localStorage.removeItem(key);
      setUser(null);
      router.push("/");
    }
  };

  const getUserData = async () => {
    // // get user data
    // const res = await httpRequest("get", "/v2/kol/profiles");

    // console.log(res);

    // if (res.status == "error") return;

    // setUser(res.data);

    setUser({
      username: "test_user",
      firstName: "Test",
      lastName: "User",
      profile: PROFILE.src,
    });
  };

  const social = (name, data) => {
    setSocialData({
      ...state.socialData,
      [name]: data,
    });
    console.log("social data", state.socialData);
    console.log("social name", name);
    console.log("social data", data);
    console.log("state", state);
  };

  const disconnectSocial = async (name) => {
    let user = state.user;

    if (name === "instagram") {
      console.log("disconnect instagram");

      //set instagram data in user context

      user = {
        ...user,
        instagram: null,
      };
    }

    if (name === "facebook") {
      console.log("disconnect facebook");

      //set facebook data in user context

      user = {
        ...user,
        facebook: null,
      };
    }

    setUser(user);
  };

  const functionContainer = {
    signin,
    signOut,
    getUserData,
    social,
    disconnectSocial,
  };
  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setSocialData = (socialData) => {
    dispatch({ type: "SET_SOCIAL_DATA", payload: socialData });
  };

  useEffect(() => {
    const key = process.env.USER_ACCESS_TOKEN_KEY;
    const token = key ? localStorage.getItem(key) : null;

    if (token) {
      //get user data
      getUserData();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, ...functionContainer }}>
      {children}
    </UserContext.Provider>
  );
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SOCIAL_DATA":
      return {
        ...state,
        socialData: action.payload,
      };
    default:
      return state;
  }
};
