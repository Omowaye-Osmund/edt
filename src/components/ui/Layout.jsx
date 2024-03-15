import MainNavigation from "./MainNavigation";
const layout = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <main>{children}</main>
    </div>
  );
};

export default layout;
