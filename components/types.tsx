import { SelectRoomsQuery, Room } from "../generated/graphql";

export interface InputProps {
    inputType?: string,
    value?: any,
    onChange?: any,
    setValue?: any,
    onKeyDown?: any,
    searchResultList?: any,
    placeholder?: string,
    labelText?: string,
    inputBackgroundColor?: string,
    inputDisable?: boolean,
    isInputTextBold?: boolean,
}
export interface SearchProps {
    
}
export interface SearchPlaceProps {
    
}
export interface SearchCalendarProps {
    
}
export interface CalendarProps {
    calenderType?: string,
    monthPageSize?: number,
}
export interface addGuestProps {
}
export interface SearchTotalModalProps {

}
export interface ButtonProps {
    buttonColor?: string,
    showIcon?: boolean,
    buttonText?: string,
}
export interface SearchPlaceListProps {
    searchResultList: any,
    width?: string,
    height?: string,
    maxCnt?: number,
}
export interface PlusMinusInputProps {
    labelText?: string,
    descryptionText?: string,
    keyword?: string,
}
export interface LoadingProps {
    loadingType?: string,
}
export interface RoomSlideProps {
    roomSlideType?: string,
    data?: SelectRoomsQuery,
}

export interface RoomCardProps {
    roomCardType?: string,
    room?: Room,
}