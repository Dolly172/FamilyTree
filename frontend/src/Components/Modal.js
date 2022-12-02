import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Server } from '../App';
import axios from "axios";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ userClicked, open, handleClose, userData, setUserData, userDataArray, setUserDataArray }) => {

  ///////////////DB Functions//////////////////

  async function submitToDB(userData) {
    const result = await axios.post(`${Server}/submit`, userData);
    console.log(result);
  }

  async function updateDB(dataAtIndexNow) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataAtIndexNow)
    };
    const result = await axios.put(`${Server}/submit`, requestOptions);
    console.log(result);
  }

  //////////////////////////////////////////////

  const inputChangeHandler = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setUserData({ ...userData, [key]: value });

  }

  const submitHandler = (ancestorName) => {
    const index = userDataArray.findIndex((el) => {
      if (el.name.toLowerCase() === ancestorName.toLowerCase()) {
        return true;
      }
      return false;
    })

    if (index !== -1) {
      userDataArray[index].children.push({ name: userData.name, age: userData.age, ancestor: userData.ancestor });
      let dataAtIndexNow = userDataArray[index];
      setUserDataArray(userDataArray);
      updateDB(dataAtIndexNow);

    } else {
      setUserDataArray([...userDataArray, { ...userData, id: Math.random().toString(36).substring(2, 7) }]);
      console.log(userDataArray);
      submitToDB(userData);
    }
    setUserData({
      name: "",
      ancestor: "",
      age: "",
      children: []
    })
  }

  console.log(userDataArray);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <label>
          Name
          <input name='name' value={userData.name} onChange={inputChangeHandler} type="text"></input>
        </label>
        <br />
        <label>
          Ancestor (if any)
          <input name='ancestor' value={userData.ancestor} onChange={inputChangeHandler} type="text"></input>
        </label>
        <br />
        <label>
          Age
          <input name='age' value={userData.age} onChange={inputChangeHandler} type="text"></input>
        </label>
        <br />
        <div>
          <button onClick={() => submitHandler(userData.ancestor)}>Submit</button>
        </div>
      </Box>
    </Modal>
  )

}

export default BasicModal;