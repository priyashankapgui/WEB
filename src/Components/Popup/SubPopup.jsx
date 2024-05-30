import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function SubPopup(props) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(props.show); // Synchronize open state with show prop
    }, [props.show]);

    const closeSubpopup = () => {
        setOpen(false);
        if (props.onClose) {
            props.onClose(); // Invoke onClose callback if provided
        }
    };

    return (
        <>
            {props.triggerComponent && (
                <div onClick={() => setOpen(true)}>
                    {props.triggerComponent}
                </div>
            )}
            <Dialog
                open={open}
                onClose={closeSubpopup}
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
                        px: '24px', // Adjust the padding left and right

                    }}
                >
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '500' }}>
                        {props.title}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={closeSubpopup}
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
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa', padding:'15px 15px' }}>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '16px', fontFamily: 'Poppins', marginTop: '8px' }}>
                        {props.bodyContent}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
