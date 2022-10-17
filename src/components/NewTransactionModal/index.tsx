import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as zod from "zod"
import {useForm, Controller} from "react-hook-form"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(["income", "outcome"])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
    const createTransaction = useContextSelector(TransactionsContext, (context)=> {
        return context.createTransaction
    })

    const {
        control,
        register, 
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income"
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const {category, description, price, type} = data

       await createTransaction({
        category,
        description,
        price,
        type
       })

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>New transaction</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        required
                        {...register("description")}
                    />
                    <input 
                        type="number" 
                        placeholder="Price" 
                        required
                        {...register("price", {valueAsNumber: true})}
                    />
                    <input 
                        type="text" 
                        placeholder="Category" 
                        required
                        {...register("category")}
                    />

                    <Controller 
                        control={control}
                        name="type"
                        render={({field})=>{
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Inflows
                                    </TransactionTypeButton>
                                
                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Outflows
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Register
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}