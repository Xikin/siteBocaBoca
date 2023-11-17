import { useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import jwtDecode from "jwt-decode";
import { storePlace } from "../actions/place";
import { logout } from "../actions/user";

const useCheckToken = () => {
  const { state: { currentUser, location, details, images, updatedPlace, deletedImages, addedImages }, dispatch } = useValue();

  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        storePlace(location, details, images, updatedPlace, deletedImages, addedImages, currentUser.id);
        logout(dispatch);
      }
    }
  }, []);

}

export default useCheckToken;
