import { Photo, SelectPhotoQuery, SelectRoomsQuery, Room, Review } from "../generated/graphql";

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
export interface sliderProps {
    data?: SelectRoomsQuery,
    cssType?: string,
    factor?: any,
    room?: Room,
    showLikeButton?: boolean,
    showDescryption?: boolean,
    showDots?: boolean,
    showPageLabel?: boolean,
    isRadius?: boolean,
    destination?: string,
    showPageLabelText?: boolean,
}
export interface reviewProps {
    review: Review,
}
export interface headerProps {
    cssType?: string,
    showSearchIcon?: boolean,
    action?: string,
}
export interface calendarProps {
    cssType?: string,
}