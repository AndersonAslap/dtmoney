import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';


import { Container } from './styles';

export function Summary() {

    const { transactions } = useTransactions();

    const sumary = transactions.reduce((acc, transaction) => {
        
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.value
            acc.amounts += transaction.value
        } else {
            acc.withdraws += transaction.value
            acc.amounts -= transaction.value
        }
        
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        amounts: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entrada"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas"/>
                </header>

                <strong>
                    -{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.withdraws)}
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.amounts)}
                </strong>
            </div>
        </Container>
    );
}