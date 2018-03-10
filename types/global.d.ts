// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.svg' {
  const svg: any;
  export default svg;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare type ClassType<T> = {
  [P in keyof T]: T[P];
}
