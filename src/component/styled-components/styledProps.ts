/** extends를 위한 interfaces */

/**
 * $color, $bgColor, $fontSize,
 */
export interface StyledProps {
  children?: React.ReactNode;

  // 색상
  $color?: string | null;
  $bgColor?: string | null;
  $borderColor?: string | null;

  // 글자
  $fontSize?: string | null;
  $fontWeight?: string | null;
  $textAlign?: "left" | "center" | "right" | null;
  $lineHeight?: string | null;

  // 너비와 높이
  $width?: string | null;
  $height?: string | null;
  $maxWidth?: string | null;
  $maxHeight?: string | null;
  $minWidth?: string | null;
  $minHeight?: string | null;

  // padding
  $padding?: string | null;
  $paddingTop?: string | null;
  $paddingRight?: string | null;
  $paddingBottom?: string | null;
  $paddingLeft?: string | null;

  // margin
  $margin?: string | null;
  $marginTop?: string | null;
  $marginRight?: string | null;
  $marginBottom?: string | null;
  $marginLeft?: string | null;

  // display
  $display?: "block" | "inline-block" | "flex" | "inline" | "grid" | null;
  $flexDirection?: "row" | "column" | null;
  $alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | null;
  $justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | null;

  // 기타
  $isBold?: boolean;
  $borderRadius?: string | null;
  $boxShadow?: string | null;
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
