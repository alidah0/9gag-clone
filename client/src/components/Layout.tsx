import React from "react";
import Wrapper, { WrapperVariant } from "../components/Wrapper";
import Navbar from "../components/NavBar";

interface WrapperProps {
  variant?: WrapperVariant;
}

const Layout: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
