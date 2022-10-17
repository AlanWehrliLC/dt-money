import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as zod from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const searchFormSchema = zod.object({
    query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm(){
    const {
        register, 
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransactions(data: SearchFormInputs){
        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Search for transactions"
                {...register("query")} 
            />

            <button 
                type="submit"
                disabled={isSubmitting}
            >
                <MagnifyingGlass size={20} />
                Search
            </button>
        </SearchFormContainer>
    )
}