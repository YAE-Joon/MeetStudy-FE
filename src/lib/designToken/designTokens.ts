interface Simple {
  primary: string;
  secondary: string;
  primarydeeper: string;
  annotations: string;
  tertiarygray: string;
  tertiarylightgray: string;
  whitebg: string;
  blackbasic: string;
  grayforText: string;
}

interface Colors {
  simple: Simple;
}

interface Web {
  xlarge: string;
  large: string;
  medium: string;
  small: string;
  xsmall: string;
}

interface Mobile {
  xlarge: string;
  large: string;
  medium: string;
  small: string;
  xsmall: string;
}

interface FontSize {
  web: Web;
  mobile: Mobile;
}

interface Width {
  containerMax: string;
  containerMin: string;
  containerMaxMobile: string;
  containerMinMobile: string;
  wrapperMax: string;
  wrapperMin: string;
  wrapperMaxMobile: string;
  wrapperMinMobile: string;
}

interface Height {
}

interface BoxSizes {
  width: Width;
  height: Height;
}

interface Spacing {
  padding: string;
  margin: string;
  gap: string;
}

interface Starndard {
  borderRadius: string;
}

interface FontFamily {
  fontFamily: string;
}

interface DesignTokenVarNames {
  colors: Colors;
  fontSize: FontSize;
  boxSizes: BoxSizes;
  spacing: Spacing;
  starndard: Starndard;
  fontFamily: FontFamily;
}

const simple: Simple = {
  primary: "--colors-simple-primary",
  secondary: "--colors-simple-secondary",
  primarydeeper: "--colors-simple-primarydeeper",
  annotations: "--colors-simple-annotations",
  tertiarygray: "--colors-simple-tertiarygray",
  tertiarylightgray: "--colors-simple-tertiarylightgray",
  whitebg: "--colors-simple-whitebg",
  blackbasic: "--colors-simple-blackbasic",
  grayforText: "--colors-simple-grayforText",
};

const colors: Colors = {
  simple: simple,
};

const web: Web = {
  xlarge: "--font-size-web-xlarge",
  large: "--font-size-web-large",
  medium: "--font-size-web-medium",
  small: "--font-size-web-small",
  xsmall: "--font-size-web-xsmall",
};

const mobile: Mobile = {
  xlarge: "--font-size-mobile-xlarge",
  large: "--font-size-mobile-large",
  medium: "--font-size-mobile-medium",
  small: "--font-size-mobile-small",
  xsmall: "--font-size-mobile-xsmall",
};

const fontSize: FontSize = {
  web: web,
  mobile: mobile,
};

const width: Width = {
  containerMax: "--box-sizes-width-container-max",
  containerMin: "--box-sizes-width-container-min",
  containerMaxMobile: "--box-sizes-width-container-max-mobile",
  containerMinMobile: "--box-sizes-width-container-min-mobile",
  wrapperMax: "--box-sizes-width-wrapper-max",
  wrapperMin: "--box-sizes-width-wrapper-min",
  wrapperMaxMobile: "--box-sizes-width-wrapper-max-mobile",
  wrapperMinMobile: "--box-sizes-width-wrapper-min-mobile",
};

const height: Height = {
};

const boxSizes: BoxSizes = {
  width: width,
  height: height,
};

const spacing: Spacing = {
  padding: "--spacing-padding",
  margin: "--spacing-margin",
  gap: "--spacing-gap",
};

const starndard: Starndard = {
  borderRadius: "--starndard-border-radius",
};

const fontFamily: FontFamily = {
  fontFamily: "--font-family-fontFamily",
};

/**
 * css 변수 이름을 담고 있는 객체입니다.
 */
const DesignTokenVarNames: DesignTokenVarNames = {
  colors: colors,
  fontSize: fontSize,
  boxSizes: boxSizes,
  spacing: spacing,
  starndard: starndard,
  fontFamily: fontFamily,
};

export const DesignTokenExcept = {
    media: {
      mobile : "600px"
    }
  }

const dt = {DesignTokenVarNames, DesignTokenExcept}

export default dt


  /*
  * HTML의 style에 설정하기 위한 문자열입니다. 서버가 시작될 시 자동으로 세팅됩니다. 
  *
  */
  export const settingTokenIntoHTML = `
  :root{
    --colors-simple-primary:#52C233;
--colors-simple-secondary:#008BFB;
--colors-simple-primarydeeper:#2B8213;
--colors-simple-annotations:#008BFB;
--colors-simple-tertiarygray:#ECECEC;
--colors-simple-tertiarylightgray:#C9EFBE;
--colors-simple-whitebg:#F9F9F9;
--colors-simple-blackbasic:#000000;
--colors-simple-grayfor-text:#555555;
--font-size-web-xlarge:calc(16px + 2vw);
--font-size-web-large:calc(14px + 1.5vw);
--font-size-web-medium:calc(12px + 1vw);
--font-size-web-small:calc(10px + 0.75vw);
--font-size-web-xsmall:calc(8px + 0.5vw);
--font-size-mobile-xlarge:calc(14px + 2vw);
--font-size-mobile-large:calc(12px + 1.5vw);
--font-size-mobile-medium:calc(10px + 1vw);
--font-size-mobile-small:calc(8px + 0.75vw);
--font-size-mobile-xsmall:calc(6px + 0.5vw);
--box-sizes-width-container-max:1200px;
--box-sizes-width-container-min:800px;
--box-sizes-width-container-max-mobile:600px;
--box-sizes-width-container-min-mobile:300px;
--box-sizes-width-wrapper-max:1000px;
--box-sizes-width-wrapper-min:750px;
--box-sizes-width-wrapper-max-mobile:500px;
--box-sizes-width-wrapper-min-mobile:250px;
--spacing-padding:3rem;
--spacing-margin:0;
--spacing-gap:0;
--starndard-border-radius:5px;
--font-family-font-family:Noto Sans KR;
  }
  `
  