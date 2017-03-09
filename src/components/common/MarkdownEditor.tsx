import * as React from 'react';
import { Row, Col, Input } from 'antd';
import { MarkdownDisplay } from '../common';
export interface MarkdownEditorProps {
    content: string
    onContentChange: (content: string) => any,
    placeholder: string,
    minRow?: number
}



export default class MarkdownEditor extends React.Component<MarkdownEditorProps, void>{
    constructor() {
        super();
    }

    handleInputChange(e: any) {
        this.props.onContentChange(e.target.value);
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col md={12} lg={12} sm={24} xs={0}>
                        <div >
                            <Input type="textarea" autosize={{ minRows: this.props.minRow ? this.props.minRow : 4 }} placeholder={this.props.placeholder} value={this.props.content} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </Col>
                    <Col md={12} lg={12} sm={24} xs={0}>
                        <MarkdownDisplay content={this.props.content} />
                    </Col>
                </Row>
            </div>
        )
    }
}