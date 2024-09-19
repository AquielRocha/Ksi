import React from "react";
import Header from "../../components/Header/Headers";
import Background from "../../components/Background/Background";
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
