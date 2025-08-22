import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadUserProfile } from '../features/user/userSlice'
 
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state?.auth);
 
  return (
    <>
      <h2>Dashboard</h2>
      {loading && <p>Loading user profile...</p>}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {user && <div>
        {user?.message } for {user?.name} and status: <b>{user?.status}</b>
        </div>}
    </>
  );
};
 
export default DashboardPage;