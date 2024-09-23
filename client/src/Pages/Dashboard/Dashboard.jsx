import React from "react";
import Header from "../../Components/Header/Headers";
import Background from "../../Components/Background/Background";
import View from "./DashboardView";

const Dashboard = () => (
  <>
    <div className="main-container">
      <Header />
      <View />
    </div>
    <Background />
  </>
);

export default Dashboard;
