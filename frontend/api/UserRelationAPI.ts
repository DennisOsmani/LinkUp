import { URL_BASE, USERRELATION_PATH } from "./UrlPaths";
import { IUserRelation, IUserRelationDTO } from "../interfaces/ModelInterfaces";

const THIS_URL: string = `${URL_BASE}${USERRELATION_PATH}`;

export async function GetUserRelation(token: string, otherUserId: string) {
  try {
    const response = await fetch(`${THIS_URL}?otherUserId=${otherUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Error in GetUserRelation response: " + response.status);
    }

    const data: IUserRelation = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching GetUserRelation " + error);
  }
}

export async function CreateUserRelation(token: string, dto: IUserRelationDTO) {
  try {
    const response = await fetch(`${THIS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(
        "Error in createUserRelation response: " + response.status
      );
    }

    const data: IUserRelation = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching createUserRelation " + error);
  }
}

export async function UpdateUserRelationType(
  token: string,
  dto: IUserRelationDTO
) {
  try {
    const response = await fetch(`${THIS_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(
        "Error in updateUserRelationType response: " + response.status
      );
    }

    const data: IUserRelation = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error while fetching updateUserRelationType " + error);
  }
}

export async function DeleteUserRelation(token: string, otherUserId: string) {
  try {
    const response = await fetch(`${THIS_URL}/${otherUserId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in deleteUserRelation response: " + response.status
      );
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching deleteUserRelation " + error);
  }
}
