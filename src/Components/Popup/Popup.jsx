import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


export default function Popup(props) {
    const [open, setOpen] = React.useState(false);

    const openPopup = () => {
        setOpen(true);
    };

    const closePopup = () => {
        setOpen(false);
    };

    return (
        <>

            <IconButton
                onClick={openPopup}
                sx={{
                    '&:hover': {
                        '& svg': {
                            color: `${props.popIconHovColor}`,
                        }
                    }
                }}
            >
                {props.popIcon}
            </IconButton>

            <Dialog
                open={open}
                onClose={closePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginLeft: `${props.popupPosition}` }}
            >
                <DialogTitle 
                    id="alert-dialog-title" 
                    sx={{ 
                        backgroundColor: `${props.headBG}`, 
                        color: `${props.headTextColor}`,  
                        py: '10px', // Adjust the padding top and bottom
                        px: '24px'  // Adjust the padding left and right
                    }}
                >
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize:'18px', fontWeight:'bold'}}>
                        {props.title}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={closePopup}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 6,
                            color: `${props.closeIconColor}`,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '16px', fontFamily: 'Poppins', marginTop:'8px'}}>
                        {props.bodyContent}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
