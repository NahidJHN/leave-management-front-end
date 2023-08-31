import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteForever } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function DeleteConfirmation(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Disagree
          </Button>
          <LoadingButton
            loading={props.loading}
            loadingPosition="end"
            endIcon={<DeleteForever />}
            variant="outlined"
            disableRipple
            color="error"
            onClick={props.onSubmit}
          >
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
