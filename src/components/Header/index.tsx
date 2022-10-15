import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logoDtMoney.svg"

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <NewTransactionButton>New transaction</NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}