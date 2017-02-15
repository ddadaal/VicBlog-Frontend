import * as React from 'react';
import { Tag, Input, Checkbox} from 'antd';

interface TagSelectorProps {
    availableTags: string[],
    onSelectedChanged: (selected:string[])=>any,
    selectedTags: string[]
}

interface TagSelectorStates{
    inputtingTag: string
}



export class TagSelector extends React.Component<TagSelectorProps, TagSelectorStates>{

    constructor(){
        super();
        this.state = { inputtingTag: ""};
    }

    handleChange(e){
        this.setState({inputtingTag: e.target.value});
    }

    handleTagClose(item){
        this.props.onSelectedChanged(this.props.selectedTags.filter(x=>x !== item));
    }

    createNewOne(){
        this.props.onSelectedChanged(this.props.selectedTags.concat(this.state.inputtingTag));
        this.setState({ inputtingTag: ""});
    }

    render(){
        const tags = this.props.selectedTags.map(item=><Tag closable afterClose={()=>this.handleTagClose(item)} key={item}>{item}</Tag>);
        return <div>
            <Checkbox.Group options={this.props.availableTags} value={this.props.selectedTags} onChange={values=>this.props.onSelectedChanged(values)}/>
            <Input placeholder="Input new tag. Press enter to create a new one." onChange={e=>this.handleChange(e)} value={this.state.inputtingTag} onPressEnter={()=>this.createNewOne()}/>
            selected:
            {tags}
            </div>
    }
}