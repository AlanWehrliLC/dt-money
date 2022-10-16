import { SearchForm } from "../SearchForm"
import { PriceHighlight, TableContainer, TableContent } from "./styles"

export function Table(){
    return (
        <TableContainer>
            <SearchForm />
            <TableContent>
                <tbody>
                    <tr>
                        <td width="50%">Website development</td>
                        <td>
                            <PriceHighlight variant="income">
                                $ 12.000,00
                            </PriceHighlight>
                        </td>
                        <td>Sale</td>
                        <td>10/05/2022</td>
                    </tr>

                    <tr>
                        <td width="50%">Earphone</td>
                        <td>
                            <PriceHighlight variant="outcome">
                                - $ 150,00
                            </PriceHighlight>
                        </td>
                        <td>Items</td>
                        <td>10/08/2022</td>
                    </tr>

                </tbody>
            </TableContent>
        </TableContainer>
    )
}