import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { TextField, Button, CircularProgress } from "@material-ui/core";

class App extends Component {
    state = {
        EvidenceID: "",
        ID: "",
        message: "",
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ ID: id });
    }

    onAddReport = async () => {
        console.log(this.state.investigation);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-access-token": localStorage.getItem("session") },
            body: JSON.stringify({
                payload: JSON.stringify({
                    Evidence: this.state.EvidenceID,
                }),
            }),
        };

        this.setState({
            message: (
                <span>
                    <CircularProgress />
                    <br></br> Loading.....
                </span>
            ),
        });

        let response = await fetch(
            "http://192.168.1.30:3000/api/main/judgement/addevidence/" + this.state.ID,
            requestOptions
        );
        let res = await response.json();
        console.log(res);
        this.setState({ message: <Redirect to={"/viewJudgement/" + this.state.ID} /> });
    };

    render() {
        return (
            <div>
                <h2>Add Evidence ID to Judgement</h2>
                {this.state.message}

                <h1>Judgement ID - {this.state.ID}</h1>

                <br />
                <br />
                <TextField
                    className="inputs"
                    label="Evidence ID"
                    variant="outlined"
                    value={this.state.EvidenceID}
                    onChange={(event) => {
                        this.setState({
                            EvidenceID: event.target.value,
                        });
                    }}
                />
                <br />
                <br />
                <Button onClick={this.onAddReport} variant="contained" color="primary">
                    Add Evidence ID
                </Button>
            </div>
        );
    }
}

export default App;
