/** extends를 위한 interfaces */

/**
 * $color, $bgColor, $fontSize,
 */
export interface StyledProps {
  //색상
  $color?: string | null;
  $bgColor?: string | null;

  //글자
  $fontSize?: string | null;

  //너비와 높이

  // padding
  $padding?: string | null;

  $isBold?: boolean;
}

/**
 * [$ 가 없음] children, color, content
 */
export interface StyledComponentsProps {
  children?: React.ReactNode;
  color?: string | null;
  content?: string;
  padding?: string | null;
}

export interface FontSizeOptions {
  xlarge: string;
  large: string;
  medium: string;
  small: string;
  xsmall: string;
}
