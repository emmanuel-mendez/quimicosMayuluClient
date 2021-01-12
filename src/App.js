import React from 'react';
import ApolloProvider from './ApolloProvider'
import { BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import { AuthProvider } from './context/auth'
import { MessageProvider } from './context/message'
import DynamicRoute from './util/DynamicRoute'

import HeaderNav from './components/grid/HeaderNav'
import Footer from './components/grid/Footer'

import Home from './components/home/Home';
import MessagesInfo from './components/home/MessagesInfo'
import Contact from './components/home/Contact'
import About from './components/home/About'
import Team from './components/home/Team'
import Principles from './components/home/Principles'

import Register from './components/home/Register'
import Login from './components/home/Login'

import UserHome from './components/user/UserHome'

import Products from './components/products/Products'
import Product from './components/products/Product'

import Messages from './components/messages/Index';

function App() {


	return (
		<ApolloProvider>

			<AuthProvider>

				<MessageProvider>

					<BrowserRouter>

						<HeaderNav />

						<div className="bodyContainer">

							<Switch>
								<DynamicRoute exact path="/" component={Home} guest />
								<DynamicRoute path="/products" component={Products} guest />
								<DynamicRoute exact path="/product/:productId" component={Product} guest />
								<DynamicRoute path="/messagesInfo" component={MessagesInfo} guest />
								<DynamicRoute path="/contact" component={Contact} guest />
								<DynamicRoute path="/about" component={About} guest />
								<DynamicRoute path="/team" component={Team} guest />
								<DynamicRoute path="/principles" component={Principles} guest />

								<DynamicRoute path="/register" component={Register} guest />
								<DynamicRoute path="/login" component={Login} guest />

								<DynamicRoute path="/userHome" component={UserHome} authenticated />
								<DynamicRoute path="/messages" component={Messages} authenticated />
							</Switch>

						</div>

						<Footer />

					</BrowserRouter>

				</MessageProvider>

			</AuthProvider>

		</ApolloProvider>
	);
}

export default App;
