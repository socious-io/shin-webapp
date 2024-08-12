import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="w-full fixed top-0 right-0 left-0 z-20 bg-Base-White">Layout</div>
      <div className="w-full mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
