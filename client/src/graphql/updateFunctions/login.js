import store from "../../store";
import { loginUserAction } from "../../actions/auth";
import { setAlert } from "../../actions/alert";


  const login = (_, { data: { login: userData}}) => {
    console.log(userData)
   if (userData){
    store.dispatch(loginUserAction(userData))
    store.dispatch(setAlert("Erfolgreich angemeldet !", "success"));
   }
  }
  
  export default login;