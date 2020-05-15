export interface inputProps {
    value?: string,
    placeholder?: string,
    placeholderTextColor?: string,
    isPassword?: boolean,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    stateFn: any,
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined,
    cssType: string,
}