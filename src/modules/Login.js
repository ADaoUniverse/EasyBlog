import React from "react";
import { ethers } from "ethers";

import { appName, eventTopic } from "../Constants";
import Dashboard from "./Dashboard";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.syncWalletData = this.syncWalletData.bind(this);
    this._setAccount = this._setAccount.bind(this);
    this._setNetwork = this._setNetwork.bind(this);
    this.getWalletConnectionStatus = this._syncWalletAccount.bind(this);
    this.getWalletAccount = this._getWalletAccount.bind(this);
    this.connectWallet = this.connectWallet.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }
  componentDidMount() {
    this.init();
    window.addEventListener(eventTopic.ACCOUNT_CHANGE, this.accountChanged);
    window.addEventListener(eventTopic.NETWORK_CHANGE, this.networkChanged);
  }

  componentWillUnmount() {
    if (this.refreshWalletInterval) {
      clearInterval(this.refreshWalletInterval);
      this.refreshWalletInterval = undefined;
    }
    window.removeEventListener(eventTopic.ACCOUNT_CHANGE, this.accountChanged);
    window.removeEventListener(eventTopic.NETWORK_CHANGE, this.networkChanged);
  }

  accountChanged(e) {
    console.log(e.detail.account, e.detail.prevAccount);
  }

  networkChanged(e) {
    console.log(e.detail.network, e.detail.prevNetwork);
  }

  async init() {
    if (!window.ethereum) return;
    window[appName].wallet = new ethers.providers.Web3Provider(window.ethereum);
    this.syncWalletData();
  }

  async syncWalletData() {
    this.refreshWalletInterval = setInterval(async () => {
      await this._syncWalletAccount(window[appName].account);
      await this._syncWalletNetwork(window[appName].network);
    }, 1000);
  }

  async _syncWalletAccount(_account) {
    const account = await this._getWalletAccount();
    if (_account != account) {
      this._setAccount(account, _account);
    }
    return account;
  }

  async _syncWalletNetwork(_network) {
    const network = await this._getWalletNetwork();
    if (_network != network) {
      this._setNetwork(network, _network);
    }
    return network;
  }

  async connectWallet() {
    const accounts = await window[appName].wallet.send("eth_requestAccounts", []);
    this._setAccount(accounts[0]);
    return accounts[0];
  }

  async _getWalletAccount() {
    return (await window[appName].wallet.listAccounts())[0];
  }

  async _getWalletNetwork() {
    try {
      return await window[appName].wallet.getNetwork();
    } catch (e) {
      // network changed. ether.js suggests reload of website on network change
      window.location.reload();
    }
  }

  _setAccount(account, prevAccount) {
    window[appName].prevAccount = prevAccount;
    window[appName].account = account;

    window.dispatchEvent(new CustomEvent(eventTopic.ACCOUNT_CHANGE, { detail: { prevAccount, account } }));
    this.forceUpdate();
  }

  _setNetwork(network, prevNetwork) {
    window[appName].prevNetwork = prevNetwork;
    window[appName].network = network;

    window.dispatchEvent(new CustomEvent(eventTopic.NETWORK_CHANGE, { detail: { prevNetwork, network } }));
    this.forceUpdate();
  }

  renderLogin() {
    if (!window.ethereum) return <div>Please Install Metamask</div>;
    return (
      <div>
        <button onClick={this.connectWallet}>Connect MetaMask</button>
      </div>
    );
  }

  render() {
    return window[appName].account && window[appName].network ? <Dashboard key={Math.random()} /> : this.renderLogin();
  }
}

export default Login;
