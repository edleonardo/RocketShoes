import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import api from '../../../services/api'
import history from '../../../services/history'
import { toast } from 'react-toastify'
import { addToCartSuccess, updateAmountSuccess } from './actions'
import { formatPrice } from '../../../util/format'

function* addToCart({ id }) {
    const productExists = yield select(
        state => state.cart.find(p => p.id === id)
    );

    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount + 1 : 0;

    if (currentAmount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    }

    if (productExists) {
        const amount = productExists.amount + 1;

        yield put(updateAmountSuccess(id, amount));
    } else {
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price)
        }
        yield put(addToCartSuccess(data));
        history.push('/cart')
    }

}

function* updateAmount({ id, amount }) {
    if (amount <= 0) return;

    const stock = yield call(api.get, `/stock/${id}`);
    const stockAmount = stock.data.amount;


    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    } else {
        yield put(updateAmountSuccess(id, amount));
    }

}

export default all([
    takeLatest('ADD_TO_CART_REQUEST', addToCart),
    takeLatest('UPDATE_AMOUNT_REQUEST', updateAmount),
]);