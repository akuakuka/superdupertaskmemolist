import IMemo from './Memo';


export default interface IPanel {
    panelID: string
    title: string
    default: boolean
    Memos?: IMemo[]
}