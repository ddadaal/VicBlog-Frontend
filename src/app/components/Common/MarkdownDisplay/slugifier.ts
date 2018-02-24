export function slugify(str: string) {
  return str.replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g,'')
}

export interface TitleNode {
  level: number,
  slug: string,
  text: string
  // subTitles: TitleNode[]
}

export function getTitleNode(content: string): TitleNode {
  const split = content.split(/\s+/);
  const level = split[0].length;
  const slug = slugify(split[1]);
  return {
    level: level,
    slug: slug,
    text: split[1]
  };

}