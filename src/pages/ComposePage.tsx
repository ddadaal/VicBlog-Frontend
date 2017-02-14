import * as React from 'react';
import { MarkdownEditor} from '../components/MarkdownEditor';
import { connect} from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators } from '../store/User';

type ComposePageProps = UserState;


class ComposePage extends React.Component<void,void>{
    
}

export default connect(
    (s:ApplicationState)=>s.user,
    (dispatch)=>{
        
    }
)