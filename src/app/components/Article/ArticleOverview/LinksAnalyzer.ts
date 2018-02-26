import { getTitleNode } from "../../Common/MarkdownDisplay/slugifier";


const regex = /(#+(\s)+.*(\n)*)/;

export function getTitleNodes(content: string) {
  return content.split(regex)
    .filter(x => x.startsWith("#"))
    .map(x => x.trim())
    .map(getTitleNode);
}
