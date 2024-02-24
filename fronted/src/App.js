import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "./style.css";
import Sidebar from "./components/sidebar";
import Routing from "./components/menubar";

const App = () => {
  const [open, setOpen] = useState(false);
  const getStoredValue = () => {
    const stored = localStorage.getItem("user");
    if (stored != "undefined" ) {
      let userInf = JSON.parse(stored);
      console.log("userInf", userInf)
      if (userInf) {
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    getStoredValue();
  }, [open]);

  return (
    <>
    {console.log(open)}
      <div className="App">
      <Navbar isLogin={open}/>
      {
      open? 
      <>
        <Sidebar isLogin={open}/>
        </>
        : 
        <Routing/>
        }
      </div>
    </>
  );
};

export default App;
