import Box from '@mui/material/Box';

const style = {
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
};

const UserDetails = ({ toDisplay }) => {

    return (
        <Box sx={style}>
            Name: {toDisplay.name}
            <br />
            Age: {toDisplay.age}
        </Box>
    )
}

export default UserDetails;