import { useContext } from "react";
import { AuthContext } from "@app/contexts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
