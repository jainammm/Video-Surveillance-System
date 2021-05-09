import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from '../../core/HttpClient'

import classes from './FileUpload.module.css';

class FileUpload extends Component {

    state = {
        filePath: ''
    }

    handleFileUpload = (e) => {
        let filePath = document.getElementById("file").files[0].path
        this.setState({
            filePath: filePath
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.filePath !== '')
            if (!this.props.parameters)
                axios.post("/api/v1/uploadFile/", {
                    filePath: this.state.filePath,
                    sceneDetect: this.props.sceneDetection,
                    yolo: this.props.yolo,
                    textRecog: this.props.textDetection
                }).then((res) => {
                    console.log(res)
                    this.props.history.push('/upload-success')
                }).catch((err) => {
                    console.log(err);
                });
            else {
                axios.post("/api/v2/uploadFile/", {
                    filePath: this.state.filePath,
                    objectParameters: this.props.parameters.objects.split(','),
                    textParameters: this.props.parameters.texts.split(',')
                }).then((res) => {
                    console.log(res)
                    this.props.history.push('/upload-success')
                }).catch((err) => {
                    console.log(err);
                });
            }
    }
    render() {
        return (
            <div>
                <Card className={classes.card}>
                    <h2 className={classes.Heading}>File Upload</h2>
                    <CardContent>

                        <form onSubmit={this.onSubmit}>
                            <div className={classes.Wrapper}>
                                <input
                                    style={{ color: 'white' }}
                                    id="file" name="file" type="file" onChange={this.handleFileUpload} />
                            </div>
                            <br />
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >
                                    UPLOAD
                                        </Button>
                                <Button
                                    variant="contained"
                                    type="button"
                                    className={classes.cancel}
                                    onClick={this.props.handleClose}
                                >
                                    Cancel
                                        </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </div >
        )
    }
}

export default withRouter(FileUpload)