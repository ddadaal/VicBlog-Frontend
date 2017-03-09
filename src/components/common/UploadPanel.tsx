import * as React from 'react';
import { APIs, APIRoot, JSONRequestInit } from '../../Utils';
import { Upload, Button, Icon, message } from 'antd';
import fetch from 'isomorphic-fetch';

export type UploadFileStatus = "uploading" | "done" | "error" | "removed" | "success";

export interface File {
    uid: number,
    name: string,
    status?: UploadFileStatus,
    response?: string,
    size: number
}

export interface UploadPanelProps {
    token: string,
    onClick?: (file: UploadedFile) => any,
}

export interface UploadedFile {
    filename: string,
    url: string,
}

export interface UploadPanelState {
    fileList: File[]
}

export default class UploadPanel extends React.Component<UploadPanelProps, UploadPanelState>{

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
    }





    render() {

        const props = {
            name: 'file',
            action: APIs.upload,
            headers: {
                token: this.props.token,
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            multiple: true,
            onPreview: file => {
                this.props.onClick({
                    filename: file.name,
                    url: `${APIRoot}/${file.response.value[0]}`
                });
            },
            onRemove: file => {
                fetch(APIs.upload, JSONRequestInit({ filename: file.name }, { token: this.props.token }, "DELETE")).then(res => {
                    if (res.ok) {
                        message.success(`${file.name} file deleted successfully`);
                    }
                }).catch(res=>{
                    message.error(`${file.name} file deletion failed.`);
                })

            }
        };

        return <div>
            <Upload listType="picture"  {...props}>
                <Button>
                    <Icon type="upload" />Click to upload
                    </Button>
            </Upload>
        </div>
    }
}