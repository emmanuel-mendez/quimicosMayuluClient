import React from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'

const PaypalCheckoutButton = ({ order }) => {
	const paypalConf = {
		currency: 'USD',
		env: 'sandbox',
		client: {
			sandbox: 'AdEzNYo_a6R5zl_v-bc2EvW7_tcXFPVU2aHrK3IXBPGd1WcNqr1ZR3HL-HhBbuWebeK5Rar5jHzgvxWF',
			production: '--',
		},
		style: {
			color: 'blue',
			shape: 'pill',
			size: 'small',
			label: 'paypal',
			tagline: 'false'
		}
	}

	const PaypalButton = paypal.Button.driver('react', { React, ReactDOM })

	const payment = (data, actions) => {
		const payment = {
			transactions: [
				{
					amount: {
						total: order.total,
						currency: paypalConf.currency,
					},
					description: 'Compra de producto',
					custom: order.customer || '',
					item_list: {
						items: order.items
					}
				}
			],
			note_to_payer: 'Contáctanos para obtener más información',
		}

		return actions.payment.create({ payment })
	}

	const onAuthorize = (data, actions) => {
		return actions.payment.execute()
			.then(response => {
				console.log(response);
				console.log(`El pago fue procesado correctamente, ID: ${response.id}`);
			})
			.catch(error => {
				console.log(error);
				console.log(`Ocurrió un error al realizar el pago`);
			})
	}

	const onCancel = (data, actions) => {
		console.log('Su pago ha sido cancelado');
	}

	const onError = (error) => {
		console.log(error);
		console.log(`Ocurrió un error al realizar el pago`);
	}

	return (
		<PaypalButton
			env={paypalConf.env}
			client={paypalConf.client}
			payment={(data, actions) => payment(data, actions)}
			onAuthorize={(data, actions) => onAuthorize(data, actions)}
			onCancel={(data, actions) => onCancel(data, actions)}
			onError={(error) => onError(error)}
			style={paypalConf.style}
			commit
			locale="es_VE"
		/>
	)
}

export default PaypalCheckoutButton;