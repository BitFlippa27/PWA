import store from "../../store";
import { setAlert } from "../../actions/alert";

  const register = (_,) => {
    store.dispatch(setAlert("Erfolgreich registiert !", "success"));
  }
  
  export default register;