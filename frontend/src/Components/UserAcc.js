import { React, useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dropdown, Menu } from 'antd';
import axios from "axios";
import { Server } from '../App';


const UserAcc = ({ handleOpen, item, userDataArray, setUserDataArray, toDisplay, setToDisplay, setUserClicked, userClicked }) => {

  const [rightClkKey, setRightClkKey] = useState();

  function toDisplayUserData(id) {
    setUserClicked(!userClicked);
    const tempData = userDataArray.find((el) => el.id === id);
    setToDisplay(tempData);
  };

  function toDisplayChildrenData(ancestor, name) {
    console.log(name);
    const tempAns = userDataArray.find((el) => el.name.toLowerCase() === ancestor.toLowerCase());
    const temp = tempAns.children.find((subEl) => subEl.name.toLowerCase() === name.toLowerCase());
    console.log(temp);
    setToDisplay(temp);
    console.log("toDisplay", toDisplay);
  }


  const handleRightClick = (name) => {
    const tempData = userDataArray.find((el) => el.name === name);
    setToDisplay(tempData);

  }

  ///////////DB Functions/////////////////////

  async function deleteFromDB(data) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const result = await axios.delete(`${Server}/submit`, requestOptions);
    console.log(result);
  }

  /////////////////////////////////////////////

  function deleteElement() {
    let tempToDelete = userDataArray.filter((el) => el.name.toLowerCase() === toDisplay.name.toLowerCase());
    let tempInObj = tempToDelete[0];
    let temp = userDataArray.filter((el) => el.name.toLowerCase() !== toDisplay.name.toLowerCase());
    setUserDataArray(temp);
    deleteFromDB(tempInObj)
  }

  const menu = <Menu onClick={({ key }) => { setRightClkKey(key) }} items={[
    {
      label: "Add Member",
      key: "add",
      onClick: () => handleOpen()
    },
    {
      label: "Delete Member",
      key: "delete",
      onClick: () => deleteElement()
    }
  ]}>

  </Menu>


  return (
    <>
      <Accordion>
        <Dropdown
          overlay={menu}
          trigger={["contextMenu"]}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toDisplayUserData(item.id)}
            onContextMenu={() => handleRightClick(item.name)}
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
        </Dropdown>
        <AccordionDetails>
          {item.children.map((subEle) => (
            <ListItemButton sx={{ pl: 4 }} onClick={() => toDisplayChildrenData(item.name, subEle.name)}>
              <ListItemIcon>
                {">"}
              </ListItemIcon>
              <ListItemText primary={subEle.name} />
            </ListItemButton>
          ))}
        </AccordionDetails>
      </Accordion>
    </>

  )
}


export default UserAcc;