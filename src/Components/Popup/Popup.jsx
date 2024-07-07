import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


export default function Popup(props) {
   
    return (
        <>

            {/* <IconButton
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
            </IconButton> */}

            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ marginLeft: `${props.popupPosition}`
                 } }
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
                        onClick={props.onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 4,
                            color: `${props.closeIconColor}`,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff',borderRadius:'40px' }}>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '16px', fontFamily: 'Poppins', marginTop:'8px'}}>
                        
                        {props.bodyContent}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
