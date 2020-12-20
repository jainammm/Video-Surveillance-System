import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from '../../core/HttpClient'

import classes from './FileUpload.module.css';

export default class FileUpload extends Component {

    state = {
        filePath:''
    }

    handleFileUpload = (e) => {
        let filePath = document.getElementById("file").files[0].path
        this.setState({
            filePath: filePath
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.filePath != '')
            axios.post("/api/v1/uploadFile/", {
                filePath: this.state.filePath,
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <Card className={classes.card}>
                    <h2 className={classes.Heading}>File Upload</h2>
                    <CardContent>

                        <form onSubmit={this.onSubmit}>
                            <div className={classes.Wrapper}>
                                <input id="file" name="file" type="file" onChange={this.handleFileUpload} />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    color="primary"
                                >
                                    UPLOAD
                                        </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </div >
        )
    }
}
