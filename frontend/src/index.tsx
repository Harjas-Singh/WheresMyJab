import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { getContext } from 'kea'

import App from './scenes/App'
import { initKea } from './initKea'

import { GlobalStyles } from './GlobalStyles'

initKea()

ReactDOM.render(
    <Provider store={getContext().store}>
        <GlobalStyles />
        <App />
    </Provider>,
    document.getElementById('root')
)
