const BASE_URL =
  "https://4863-2001-4647-7170-0-2617-1924-9243-d6c6.ngrok-free.app/api/auth";

export interface IToken {
  token: string;
}

export interface IRegistrationRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const registerUser = async (request: IRegistrationRequest) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error in register request " + response.status);
    }

    const data: IToken = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while registering a user " + error);
  }
};

export interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = async (request: ILoginRequest) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error in login request " + response.status);
    }

    const data: IToken = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while loggin in a user " + error);
  }
};
