import * as React from "react";
import type { SVGProps } from "react";
const SvgUbi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 18"
    {...props}
  >
    <path
      fill="#FE0"
      d="M7.157 10.25a3.125 3.125 0 1 1 0-6.25 3.125 3.125 0 0 1 0 6.25m0-5a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75"
    />
    <path
      fill="#EDEDED"
      d="m7.107 17.75-5.272-6.218-.218-.282A6.8 6.8 0 0 1 .232 7.125a6.875 6.875 0 1 1 13.75 0 6.8 6.8 0 0 1-1.384 4.123l-.001.002s-.187.246-.216.28zm-4.492-7.253.179.234 4.313 5.087 4.319-5.094.174-.229a5.56 5.56 0 0 0 1.132-3.37 5.625 5.625 0 1 0-11.25 0 5.56 5.56 0 0 0 1.133 3.372"
    />
  </svg>
);
export default SvgUbi;
