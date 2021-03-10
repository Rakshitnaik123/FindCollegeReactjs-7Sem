import React, {useContext, useState} from "react";
import {api_root_address} from "../API";
import {toast} from "react-toastify";
import {CollegeContext} from "../CollegeContext";
import "../css/AddCollege.css";
import Divider from '@material-ui/core/Divider';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";

function AddCollege() {
    // eslint-disable-next-line no-unused-vars
    const [colleges, setColleges] = useContext(CollegeContext);
    const reqUrl = api_root_address + "/api/admin/colleges";
    let data = {
        name: "",
        desc: "",
        vision: "",
        mission: "",
        address: "",
        gMapLink: "",
        placements: "",
        rating: 1,
        images: []
    }
    let programsOffered = {
        programsOffered: new Set(["B.E", "M.TECH"]),
        BE: new Set(["Computer Science & Engineering", "Information Science & Engineering", "Electronics & Communication Engineering"]),
        MTECH: new Set(["Computer Science & Engineering", "Information Science & Engineering", "Electronics & Communication Engineering"]),
        MBA: new Set(["Core HR", "Core Marketing", "Core Finance"]),
        PHD: new Set(["Computer Science & Engineering", "Information Science & Engineering", "Core Marketing"]),
    }
    const [collegeData, setCollegeData] = useState(data);
    const [programsOfferedData, setProgramsOfferedData] = useState(programsOffered);
    const [uploaded, setUploaded] = useState(false);

    function handleChangeClgName(event) {
        data.name = event.target.value;
    }

    function handleChangeClgDesc(event) {
        data.desc = event.target.value;
    }

    function handleChangeClgVision(event) {
        data.vision = event.target.value;
    }

    function handleChangeClgAddress(event) {
        data.address = event.target.value;
    }

    function handleChangeClgGmapLink(event) {
        data.gMapLink = event.target.value;
    }

    function handleChangeClgPlacements(event) {
        data.placements = event.target.value;
    }

    const [programsOfferedCheckboxes, setProgramsOfferedCheckboxes] = useState({
        checkedBE: true,
        checkedMTech: true,
        checkedMBA: false,
        checkedPHD: false
    });
    const [beDegreeCheckboxes, setBeDegreeCheckboxes] = useState({
        checkedCSE: true,
        checkedISE: true,
        checkedECE: true,
        checkedMECH: false,
        checkedCIVIL: false
    });
    const [mTechDegreeCheckboxes, setMTechDegreeCheckboxes] = useState({
        checkedCSE: true,
        checkedISE: true,
        checkedECE: true,
        checkedMECH: false,
        checkedCIVIL: false
    });
    const [mbaDegreeCheckboxes, setMbaDegreeCheckboxes] = useState({
        checkedHR: true,
        checkedMarketing: true,
        checkedFinance: true,
        checkedBanking: false,
        checkedGeneral: false
    });
    const [phdDegreeCheckboxes, setPhdDegreeCheckboxes] = useState({
        checkedCSE: true,
        checkedISE: true,
        checkedECE: false,
        checkedHR: true,
        checkedMarketing: true,
        checkedFinance: false
    });


    const [expanded, setExpanded] = useState('false');

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        // console.log(expanded);
        // console.log(panel);
        // console.log(event);
        // console.log(isExpanded);
        setExpanded(isExpanded ? panel : false);
    };
    const handleChangeProgramsOffered = (event) => {
        if (!event.target.checked)
            setExpanded('false');
        if (event.target.checked) {
            setProgramsOfferedData({
                ...programsOfferedData,
                programsOffered: programsOfferedData.programsOffered.add(event.target.value)
            });
        } else {
            let tempSet = new Set(programsOfferedData.programsOffered);
            tempSet.delete(event.target.value);
            setProgramsOfferedData({
                ...programsOfferedData,
                programsOffered: tempSet
            });
        }
        setProgramsOfferedCheckboxes({...programsOfferedCheckboxes, [event.target.name]: event.target.checked});
    };
    const handleChangeBEDegree = (event) => {
        if (event.target.checked) {
            setProgramsOfferedData({
                ...programsOfferedData,
                BE: programsOfferedData.BE.add(event.target.value)
            });
        } else {
            let tempSet = new Set(programsOfferedData.BE);
            tempSet.delete(event.target.value);
            setProgramsOfferedData({
                ...programsOfferedData,
                BE: tempSet
            });
        }
        setBeDegreeCheckboxes({...beDegreeCheckboxes, [event.target.name]: event.target.checked});
    };
    const handleChangeMTechDegree = (event) => {
        if (event.target.checked) {
            setProgramsOfferedData({
                ...programsOfferedData,
                MTECH: programsOfferedData.MTECH.add(event.target.value)
            });
        } else {
            let tempSet = new Set(programsOfferedData.MTECH);
            tempSet.delete(event.target.value);
            setProgramsOfferedData({
                ...programsOfferedData,
                MTECH: tempSet
            });
        }
        setMTechDegreeCheckboxes({...mTechDegreeCheckboxes, [event.target.name]: event.target.checked});
    };
    const handleChangeMbaDegree = (event) => {
        if (event.target.checked) {
            setProgramsOfferedData({
                ...programsOfferedData,
                MBA: programsOfferedData.MBA.add(event.target.value)
            });
        } else {
            let tempSet = new Set(programsOfferedData.MBA);
            tempSet.delete(event.target.value);
            setProgramsOfferedData({
                ...programsOfferedData,
                MBA: tempSet
            });
        }
        setMbaDegreeCheckboxes({...mbaDegreeCheckboxes, [event.target.name]: event.target.checked});
    };
    const handleChangePhdDegree = (event) => {
        if (event.target.checked) {
            data.PHD.add(event.target.value)
        } else {
            data.PHD.delete(event.target.value)
        }
        setPhdDegreeCheckboxes({...phdDegreeCheckboxes, [event.target.name]: event.target.checked});
    };

    function handleImageUpload() {
        setUploaded(false);
        const logo_image = document.getElementById('logo-image').files[0];
        const placements_image = document.getElementById('placements-image').files[0];
        if (logo_image === undefined || placements_image === undefined) {
            toast.error('Please upload both the images', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
            return;
        }
        let images = [logo_image, placements_image];
        let count = 0;
        let imageBase64Urls = [];
        for (let i = 0; i < images.length; i++) {
            let reader = new FileReader();
            reader.onload = function (event) {
                let base64ImageURL = event.target.result;
                imageBase64Urls[i] = String(base64ImageURL);
            }
            // eslint-disable-next-line no-loop-func
            reader.onloadend = function (event) {
                data.images = [imageBase64Urls[0], imageBase64Urls[1]];
                count++;
                if (count === images.length) {
                    toast.success('Uploaded ✔️', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    toast.clearWaitingQueue();
                    setCollegeData({...data, images: imageBase64Urls});
                    setUploaded(true);
                }
            }
            reader.readAsDataURL(images[i]);

        }

    }


    function verifyInput() {
        let isValid = true;
        data.name = document.getElementById("inputClgName").value;
        data.desc = document.getElementById("inputClgDesc").value;
        data.vision = document.getElementById("inputClgVision").value;
        data.mission = document.getElementById("inputClgMission").value;
        data.address = document.getElementById("inputClgAddress").value;
        data.gMapLink = document.getElementById("inputClgGmapLink").value;
        data.placements = document.getElementById("inputClgPlacements").value;
        data.rating = parseInt(document.getElementById("inputRating").value);
        const logo_image = document.getElementById('logo-image').files[0];
        const placements_image = document.getElementById('placements-image').files[0];
        setCollegeData(data);
        if (data.name === "" || data.rating === "-" || isNaN(data.rating) || data.desc === "" || data.vision === "" || data.mission === "" || data.address === "" || data.gMapLink === "" || data.placements === "") {
            isValid = false;
            toast.error('Please enter all the details', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (logo_image === undefined || placements_image === undefined) {
            isValid = false;
            toast.error('Please upload both the images', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (data.rating === "-" || isNaN(data.rating)) {
            isValid = false;
            toast.error('Please select Rating field', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        toast.clearWaitingQueue();
        if (isValid) {
            addCollegeToDatabase()
        }
    }


    function addCollegeToDatabase() {
        let dataToBeSent = {...collegeData}
        let temp = {
            programsOffered: [...programsOfferedData.programsOffered],
            BE: programsOfferedCheckboxes.checkedBE ? [...programsOfferedData.BE] : [],
            MTECH: programsOfferedCheckboxes.checkedMTech ? [...programsOfferedData.MTECH] : [],
            MBA: programsOfferedCheckboxes.checkedMBA ? [...programsOfferedData.MBA] : [],
            PHD: programsOfferedCheckboxes.checkedPHD ? [...programsOfferedData.PHD] : []
        }
        dataToBeSent = {...dataToBeSent, ...temp}
        fetch(reqUrl, {
            method: 'post',
            body: JSON.stringify(dataToBeSent),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                    if (data.success) {
                        toast.success('Added Successfully', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                        return fetch(api_root_address + "/api/colleges")

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
            ).then(response => response.json())
            .then(data => {
                    const receivedColleges = data.slice();
                    const collegesData = receivedColleges.map((clg) => ({
                        id: clg.id,
                        name: clg.name,
                        rating: clg.rating
                    }));
                    document.getElementById("inputClgName").value = "";
                    document.getElementById("inputClgDesc").value = "";
                    document.getElementById("inputClgVision").value = "";
                    document.getElementById("inputClgMission").value = "";
                    document.getElementById("inputClgAddress").value = "";
                    document.getElementById("inputClgGmapLink").value = "";
                    document.getElementById("inputClgPlacements").value = "";
                    document.getElementById("inputRating").value = "-";
                    document.getElementById('logo-image').value = "";
                    document.getElementById('placements-image').value = "";

                    setColleges(collegesData);
                }
            )
    }


    // console.log(programsOfferedData);


    return (
        <div>
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please fill the following details</h1>

                <label htmlFor="inputClgName" className="sr-only">
                    College Name
                </label>
                <input
                    type="text"
                    id="inputClgName"
                    className="form-control"
                    placeholder="College Name"
                    onChange={handleChangeClgName}
                    required
                    autoFocus
                />

                <textarea
                    id="inputClgDesc"
                    className="form-control"
                    placeholder="College Description"
                    onChange={handleChangeClgDesc}
                    required
                />

                <textarea
                    id="inputClgVision"
                    className="form-control"
                    placeholder="College Vision"
                    onChange={handleChangeClgVision}
                    required
                />

                <textarea
                    id="inputClgMission"
                    className="form-control"
                    placeholder="College Mission"
                    // onChange={handleChangeClgVision}
                    required
                />
                <input
                    type="text"
                    id="inputClgAddress"
                    className="form-control"
                    placeholder="College Address"
                    onChange={handleChangeClgAddress}
                    required
                />
                <input
                    type="text"
                    id="inputClgGmapLink"
                    className="form-control"
                    placeholder="College Google Map Link"
                    onChange={handleChangeClgGmapLink}
                    required
                />
                <textarea
                    id="inputClgPlacements"
                    className="form-control"
                    placeholder="College Placements"
                    onChange={handleChangeClgPlacements}
                    required
                />
                <label htmlFor="inputRating" className="sr-only">
                    Rating
                </label>
                <Divider/>
                <label>
                    What all Programs does college offers?
                </label>
                <div className={"programsOffered"}>
                    <div>
                        <FormGroup row className={"checkboxes"}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={programsOfferedCheckboxes.checkedBE}
                                        onChange={handleChangeProgramsOffered}
                                        name="checkedBE"
                                        color="primary"
                                        value="B.E"
                                    />
                                }
                                label="B.E."
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={programsOfferedCheckboxes.checkedMTech}
                                        onChange={handleChangeProgramsOffered}
                                        name="checkedMTech"
                                        color="primary"
                                        value="M.TECH"
                                    />
                                }
                                label="M.Tech"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={programsOfferedCheckboxes.checkedMBA}
                                        onChange={handleChangeProgramsOffered}
                                        name="checkedMBA"
                                        color="primary"
                                        value="MBA"
                                    />
                                }
                                label="MBA"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={programsOfferedCheckboxes.checkedPHD}
                                        onChange={handleChangeProgramsOffered}
                                        name="checkedPHD"
                                        color="primary"
                                        value="PHD"
                                    />
                                }
                                label="PHD"
                            />
                        </FormGroup>
                    </div>
                    <Divider/>
                    <Accordion disabled={!programsOfferedCheckboxes.checkedBE}
                               expanded={expanded === 'panel1' && programsOfferedCheckboxes.checkedBE}
                               onChange={handleChangeAccordion('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>What all B.E Degrees available?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <FormGroup row className={"checkboxes"}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedBE}
                                                checked={beDegreeCheckboxes.checkedCSE}
                                                onChange={handleChangeBEDegree}
                                                name="checkedCSE"
                                                color="primary"
                                                value="Computer Science & Engineering"
                                            />
                                        }
                                        label="Computer Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedBE}
                                                checked={beDegreeCheckboxes.checkedISE}
                                                onChange={handleChangeBEDegree}
                                                name="checkedISE"
                                                color="primary"
                                                value="Information Science & Engineering"
                                            />
                                        }
                                        label="Information Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedBE}
                                                checked={beDegreeCheckboxes.checkedECE}
                                                onChange={handleChangeBEDegree}
                                                name="checkedECE"
                                                color="primary"
                                                value="Electronics & Communication Engineering"
                                            />
                                        }
                                        label="Electronics & Communication Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedBE}
                                                checked={beDegreeCheckboxes.checkedMECH}
                                                onChange={handleChangeBEDegree}
                                                name="checkedMECH"
                                                color="primary"
                                                value="Mechanical Engineering"
                                            />
                                        }
                                        label="Mechanical Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedBE}
                                                checked={beDegreeCheckboxes.checkedCIVIL}
                                                onChange={handleChangeBEDegree}
                                                name="checkedCIVIL"
                                                color="primary"
                                                value="Civil Engineering"
                                            />
                                        }
                                        label="Civil Engineering"
                                    />
                                </FormGroup>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disabled={!programsOfferedCheckboxes.checkedMTech}
                               expanded={expanded === 'panel2' && programsOfferedCheckboxes.checkedMTech}
                               onChange={handleChangeAccordion('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>What all M.Tech Degrees available?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <FormGroup row className={"checkboxes"}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMTech}
                                                checked={mTechDegreeCheckboxes.checkedCSE}
                                                onChange={handleChangeMTechDegree}
                                                name="checkedCSE"
                                                color="primary"
                                                value="Computer Science & Engineering"
                                            />
                                        }
                                        label="Computer Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMTech}
                                                checked={mTechDegreeCheckboxes.checkedISE}
                                                onChange={handleChangeMTechDegree}
                                                name="checkedISE"
                                                color="primary"
                                                value="Information Science & Engineering"
                                            />
                                        }
                                        label="Information Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMTech}
                                                checked={mTechDegreeCheckboxes.checkedECE}
                                                onChange={handleChangeMTechDegree}
                                                name="checkedECE"
                                                color="primary"
                                                value="Electronics & Communication Engineering"
                                            />
                                        }
                                        label="Electronics & Communication Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMTech}
                                                checked={mTechDegreeCheckboxes.checkedMECH}
                                                onChange={handleChangeMTechDegree}
                                                name="checkedMECH"
                                                color="primary"
                                                value="Mechanical Engineering"
                                            />
                                        }
                                        label="Mechanical Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMTech}
                                                checked={mTechDegreeCheckboxes.checkedCIVIL}
                                                onChange={handleChangeMTechDegree}
                                                name="checkedCIVIL"
                                                color="primary"
                                                value="Civil Engineering"
                                            />
                                        }
                                        label="Civil Engineering"
                                    />
                                </FormGroup>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disabled={!programsOfferedCheckboxes.checkedMBA}
                               expanded={expanded === 'panel3' && programsOfferedCheckboxes.checkedMBA}
                               onChange={handleChangeAccordion('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>What all MBA Degrees available?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <FormGroup row className={"checkboxes"}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMBA}
                                                checked={mbaDegreeCheckboxes.checkedHR}
                                                onChange={handleChangeMbaDegree}
                                                name="checkedHR"
                                                color="primary"
                                                value="Core HR"
                                            />
                                        }
                                        label="Core HR"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMBA}
                                                checked={mbaDegreeCheckboxes.checkedMarketing}
                                                onChange={handleChangeMbaDegree}
                                                name="checkedMarketing"
                                                color="primary"
                                                value="Core Marketing"
                                            />
                                        }
                                        label="Core Marketing"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMBA}
                                                checked={mbaDegreeCheckboxes.checkedFinance}
                                                onChange={handleChangeMbaDegree}
                                                name="checkedFinance"
                                                color="primary"
                                                value="Core Finance"
                                            />
                                        }
                                        label="Core Finance"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMBA}
                                                checked={mbaDegreeCheckboxes.checkedBanking}
                                                onChange={handleChangeMbaDegree}
                                                name="checkedBanking"
                                                color="primary"
                                                value="Banking & Insurance"
                                            />
                                        }
                                        label="Banking & Insurance"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedMBA}
                                                checked={mbaDegreeCheckboxes.checkedGeneral}
                                                onChange={handleChangeMbaDegree}
                                                name="checkedGeneral"
                                                color="primary"
                                                value="General"
                                            />
                                        }
                                        label="General"
                                    />
                                </FormGroup>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disabled={!programsOfferedCheckboxes.checkedPHD}
                               expanded={expanded === 'panel4' && programsOfferedCheckboxes.checkedPHD}
                               onChange={handleChangeAccordion('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography>What all PHD Degrees available?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <FormGroup row className={"checkboxes"}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedCSE}
                                                onChange={handleChangePhdDegree}
                                                name="checkedCSE"
                                                color="primary"
                                                value="Computer Science & Engineering"
                                            />
                                        }
                                        label="Computer Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedISE}
                                                onChange={handleChangePhdDegree}
                                                name="checkedISE"
                                                color="primary"
                                                value="Information Science & Engineering"
                                            />
                                        }
                                        label="Information Science & Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedECE}
                                                onChange={handleChangePhdDegree}
                                                name="checkedECE"
                                                color="primary"
                                                value="Electronics & Communication Engineering"
                                            />
                                        }
                                        label="Electronics & Communication Engineering"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedHR}
                                                onChange={handleChangePhdDegree}
                                                name="checkedHR"
                                                color="primary"
                                                value="Core HR"
                                            />
                                        }
                                        label="Core HR"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedMarketing}
                                                onChange={handleChangePhdDegree}
                                                name="checkedMarketing"
                                                color="primary"
                                                value="Core Marketing"
                                            />
                                        }
                                        label="Core Marketing"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!programsOfferedCheckboxes.checkedPHD}
                                                checked={phdDegreeCheckboxes.checkedFinance}
                                                onChange={handleChangePhdDegree}
                                                name="checkedFinance"
                                                color="primary"
                                                value="Core Finance"
                                            />
                                        }
                                        label="Core Finance"
                                    />
                                </FormGroup>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                </div>
                <div className={"normal"}>
                    <label htmlFor="file">Upload the Logo of the College</label>
                    <br/>
                    <input type="file" id="logo-image" name="logo" accept=".png"/>
                    <br/>
                    <label htmlFor="file">Upload the Placements image of the College</label>
                    <br/>
                    <input type="file" id="placements-image" name="placements" accept=".png"/>
                </div>
                <button type={"button"} className="btn btn-primary" onClick={handleImageUpload}>Upload</button>
                <div>
                    <select id="inputRating" name="inputRating" required>
                        <option value="-">Rating</option>
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                        <option value="1">⭐</option>
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                        <option value="2">⭐⭐</option>
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                        <option value="3">⭐⭐⭐</option>
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                        <option value="4">⭐⭐⭐⭐</option>
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={verifyInput} disabled={!uploaded}>Add
                    College
                </button>
            </form>
        </div>
    );
}

export default AddCollege;
