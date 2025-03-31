"use client";
import { PROFILE } from "@/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
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
      localStorage.removeItem("instagram");
      localStorage.removeItem("facebook");
      setUser(null);
      router.push("/");
    }
  };

  const getUserData = async () => {
    let instagram = localStorage.getItem("instagram");
    let facebook = localStorage.getItem("facebook");
    setUser({
      username: "test_user",
      firstName: "Test",
      lastName: "User",
      profile: PROFILE.src,
      facebook: facebook ? JSON.parse(facebook) : null,
      instagram: instagram ? JSON.parse(instagram) : null,
    });
  };

  const social = async (name, data) => {
    let user = state.user;
    let instagram = localStorage.getItem("instagram");
    let facebook = localStorage.getItem("facebook");
    if (name === "instagram") {
      console.log(data);

      console.log("set instagram data");
      //setLocalStorage("instagram", data);

      localStorage.setItem("instagram", JSON.stringify(data));

      user = {
        ...user,
        instagram: data,
        facebook: facebook ? JSON.parse(facebook) : null,
      };
    }

    if (name === "facebook") {
      console.log(data);

      console.log("set facebook data");

      //set facebook data in user context

      user = {
        ...user,
        facebook: data,
        instagram: instagram ? JSON.parse(instagram) : null,
      };
    }

    setUser(user);
  };

  const disconnectSocial = (name) => {
    let user = state.user;

    if (name === "instagram") {
      console.log("remove instagram data");
      localStorage.removeItem("instagram");
      user = {
        ...user,
        instagram: null,
      };
    }

    if (name === "facebook") {
      console.log("remove facebook data");
      localStorage.removeItem("facebook");
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
    default:
      return state;
  }
};
