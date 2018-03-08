import * as React from "react";
import { ReactNode } from "react";
import { LocaleMessage } from "../Common/Locale";
import MdEmail from "react-icons/lib/md/email";
import FaGithubSquare from "react-icons/lib/fa/github-square";
import FaQq from "react-icons/lib/fa/qq";
import * as localStyle from './style.css';

function LinkItem(props: {content: ReactNode, icon: ReactNode}) {
  return <p className={localStyle.parent}>
    {props.icon}
    {props.content}
    </p>;
}


const mail = "mailto:smallda@outlook.com";
const github = "https://github.com/viccrubs";

export class ContactPanel extends React.Component<{}> {
  render() {
    return <div>
      <h4>
        <b>
          <LocaleMessage id={"profile.contact.title"}/>
        </b>
      </h4>
      <div>
        <LinkItem content={<a href={mail}>smallda@outlook.com</a>} icon={<MdEmail size={20}/>}/>
      <LinkItem content={<a target="_blank" href={github}>VicCrubs</a>} icon={<FaGithubSquare size={20}/>}/>
        <LinkItem content={"540232834"} icon={<FaQq size={20}/>}/>
      </div>
    </div>;
  }
}
