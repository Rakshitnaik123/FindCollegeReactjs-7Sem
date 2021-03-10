import React, {useContext} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stars from "./Stars";
import {Link} from "react-router-dom";
import {CollegeContext} from "../CollegeContext";
import {toast} from "react-toastify";
import {api_root_address} from "../API";
import "../css/Colleges.css";

function Card(props) {
    const [colleges, setColleges] = useContext(CollegeContext);
    const [open, setOpen] = React.useState(false);

    const name = props.name;
    const reqUrl = api_root_address + "/api/admin/colleges";
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function deleteCollege() {
        if (colleges.length > 1) {
            fetch(reqUrl, {
                method: 'delete',
                body: JSON.stringify({id: props.id}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                        console.log(data);
                        if (data.success) {
                            console.log("Deleted successfully");
                            toast.success('Deleted Successfully 🎉', {
                                position: "top-right",
                                autoClose: 1200,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            toast.error('Error occurred!', {
                                position: "top-right",
                                autoClose: 3500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            toast.clearWaitingQueue();
                        }
                    }
                );
            const newColleges = colleges.filter(clg => clg.id !== props.id);
            setColleges(newColleges);
        } else {
            toast.error("Can't delete the only college left", {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.clearWaitingQueue();
        }

    }

    if (props.type === "ppls")
        return (
            <div className="Card">
                <h4>{name}</h4>
                <a href={props.link} target="_blank" rel="noopener noreferrer">Contact Me</a>
            </div>
        );
    else if (props.type === "normal")
        return (
            <div className="ClgCard">
                <Link to={"/college/" + props.name.trim().replaceAll(" ", "-").replaceAll('.', '-').toLowerCase()}>
                    <h5 className="ClgNames">{props.name}</h5>
                </Link>
                <div className="bottom-content">
                    <Stars numStars={props.rating}/>
                </div>

            </div>
        );
    else if (props.type === "prediction")
        return (
            <div className="ClgCard">
                <Link to={"/college/" + props.name.trim().replaceAll(" ", "-").replaceAll('.', '-').toLowerCase()}>
                    <h5 className="ClgNames">{props.name}</h5>
                </Link>
                <div className="bottom-content">
                    <Stars numStars={props.rating}/>
                    <h5>Chance: {props.chance} %</h5>
                </div>

            </div>
        );
    else if (props.type === "admin")
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Delete this college from the database?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will delete {props.name} college entry from the database and cannot be recovered later.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            No
                        </Button>
                        <Button onClick={deleteCollege} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="ClgCard">
                    <Link to={"/college/" + props.name.trim().replaceAll(" ", "-").replaceAll('.', '-').toLowerCase()}>
                        <h5 className="ClgNames">{props.name}</h5>
                    </Link>
                    <div className="bottom-content">
                        <Stars numStars={props.rating}/>
                        <br/>
                        <button type="button" className="btn btn-danger" onClick={handleClickOpen}>Delete</button>
                    </div>

                </div>
            </div>

        );
}

export default Card;