import axios from "axios";

export const emailSendConfimed = async (email: string, code: string) => {
  const authOptions = {
    method: "post",
    url: "http://localhost:3001/api/notification",
    data: {
      email: email,
      code: code,
      type: "verificate",
    },
  };
  await axios(authOptions);
};

export const verifiedEmail = async (email: string) => {
  const authOptions = {
    method: "post",
    url: "http://localhost:3001/api/notification",
    data: {
      email: email,
      type: "verificateConfirmed",
    },
  };
  await axios(authOptions);
};
