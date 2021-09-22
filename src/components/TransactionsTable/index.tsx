import { useEffect } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

export function TransactionsTable() {

    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
        .then(response => console.log(response.data))
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Desenvolvimento de website</td>
                        <td className="deposit">R$ 1000</td>
                        <td>Desenvolvimento</td>
                        <td>01/01/2021</td>
                    </tr>

                    <tr>
                        <td>Aluguel</td>
                        <td className="withdraw">- R$ 500</td>
                        <td>Casa</td>
                        <td>02/01/2021</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}