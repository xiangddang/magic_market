import { setCurrentUser } from "../../store/user/user.action";
import UserDataService from "../../services/user";

export async function fetchUser(loginData, dispatch) {
  let user = {
    _id: loginData.googleId,
    first_name: loginData.given_name,
    last_name: loginData.family_name,
    email: loginData.email,
    bought: [],
    sold: [],
    favorites: [],
    avatar: loginData.picture,
  };

  UserDataService.get(loginData.googleId)
    .then((response) => {
      if (response.data) {
        dispatch(setCurrentUser(response.data));
      } else {
        console.log("User does not exist");
      }
    })
    .catch((e) => {
      UserDataService.createUser(user)
        .then((response) => {
          dispatch(setCurrentUser(user));
        })
        .catch((e) => {
          console.log(e);
        });
    });
}

export async function updateUser(user, dispatch) {
  UserDataService.updateUser(user)
    .then((response) => {
      dispatch(setCurrentUser(user));
    })
    .catch((e) => {
      console.log(e);
    });
}
