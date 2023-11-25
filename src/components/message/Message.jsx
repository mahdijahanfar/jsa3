import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useSnackStore } from '../../context/zustand/store';

export default function Message() {

    const {
        message,
        openSnack,
        transition,
        alert, setSnack
    } = useSnackStore(state => ({
        message: state.message,
        openSnack: state.open,
        transition: state.transition,
        alert: state.alert, setSnack: state.setSnack

    }))
    return (
        <div>
            <Snackbar
                autoHideDuration={5000}
                open={openSnack}
                onClose={() => setSnack({ open: false })}
                TransitionComponent={transition}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                message={message}
                action={<>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="secondary"
                        onClick={() => setSnack({ open: false })}
                    >
                        <CloseRounded fontSize="small" />
                    </IconButton>
                </>}
            >
                {alert ? <Alert onClose={() => setSnack({ open: false })} severity={alert}
                >
                    {message}
                </Alert> : ""}
            </Snackbar>
        </div>
    );
}