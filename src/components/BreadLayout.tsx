import { Outlet } from "react-router-dom";
import Bread from "./Bread";

const BreadLayout = (): JSX.Element => {
  return (
    <>
      <Bread />
      <Outlet />
    </>
  );
};
export default BreadLayout;
