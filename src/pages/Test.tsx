import * as React from 'react';
import { Upload, message, Button, Icon} from 'antd';
import { APIs} from '../Utils';

export class TestPage extends React.Component<void,void>{
    render(){
const props = {
  name: 'file',
  action: APIs.upload,
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.cm9vdA.2LOC5l4ciZaSd6ml63VSpMhuuFH3AGzqQs6x-sxJVJo',
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onPreview(file){
    console.log(file);
  }
};

        return <div>
                <Upload listType="picture" multiple {...props}>
                    <Button>
                        <Icon type="upload"/>Click to upload
                    </Button>
                    </Upload>
            </div>
    }
}