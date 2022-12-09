import axios from "axios";

export const emailSendConfimed = async (email: string, code: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/notification`,
      data: {
        email: email,
        code: code,
        type: "verificate",
      },
    };
    await axios(authOptions);
  } catch (error) {
    throw "Could not connect to mail service";
  }
};

export const verifiedEmail = async (email: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/notification`,
      data: {
        email: email,
        type: "verificateConfirmed",
      },
    };
    await axios(authOptions);
  } catch (error) {
    throw "The confirmation email could not be sent correctly";
  }
};
