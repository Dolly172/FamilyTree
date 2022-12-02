import './App.css';
import UserAcc from './Components/UserAcc';
import UserDetails from './Components/UserDetails';
import image from "./images/png-transparent-family-tree-family-tree-cartoon-tree-removebg-preview.png";
import List from '@mui/material/List';
import { React, useState } from 'react';
import BasicModal from './Components/Modal';
import axios from "axios";

export const Server = `http://${window.location.hostname}:8082`;

function App() {

  // async function test() {
  //   const result = await axios.get(`${Server}/`);
  //   console.log(result.data);
  // }
  // test();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [userData, setUserData] = useState({
    name: "",
    ancestor: "",
    age: "",
    children: []
  });

  const [userDataArray, setUserDataArray] = useState([]);
  //console.log(userDataArray);
  const [toDisplay, setToDisplay] = useState(null);
  const [userClicked, setUserClicked] = useState(false);


  return (
    <div className="App">
      {<div>
        <BasicModal userClicked={userClicked} userDataArray={userDataArray} setUserDataArray={setUserDataArray} userData={userData} setUserData={setUserData} open={open} handleClose={handleClose} />
      </div>}
      <div className="parent">
        <div className="child1">
          <div className=" usingGrid">
            <div className="child1">
              <div>
                <div className="header">Family Tree</div>
              </div>
              <List>

                {userDataArray.map((item) => (
                  <UserAcc
                    key={item.id}
                    userClicked={userClicked}
                    setUserClicked={setUserClicked}
                    item={item}
                    userDataArray={userDataArray}
                    setUserDataArray={setUserDataArray}
                    toDisplay={toDisplay}
                    setToDisplay={setToDisplay}
                    handleOpen={handleOpen}
                  />
                ))}

              </List>
            </div>
            <div >
              <button className="btnStyle" onClick={handleOpen}>Add Family</button>
            </div>
            <div>
              <button className="btnStyle">Print Family Tree</button>
            </div>
          </div>
        </div>
        <div className="child2">
          <div >
            <div className="header">Family Details</div>
            <div className='rightData'>
              {toDisplay === null ? <img src={image} alt="family tree" /> : <UserDetails toDisplay={toDisplay} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



