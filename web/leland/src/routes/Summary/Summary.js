import React, { Component, Fragment } from 'react'

import Navbar from '../../components/Navbar'

import './Summary.scss'
import { thousandSeparator } from '../../utils/currency'
import ic_success from './assets/ic-checklist.png'

class Summary extends Component {

  constructor(props) {
    super()

    this.state = {
      price: props.match.params.price
    }
  }


  render() {
    let { price } = this.state

    return (
      <Fragment>
        <Navbar title="Ringkasan" />
        <div className="ph-summary">
          <div className="ph-summary__content">
            <div className="u-center">
              <img src={ic_success} width="100px" />
              <h1>Selamat Kevin!</h1>
              <p className="desc u-m0">Penawaran harga Anda sudah terpasang.</p>
              <p className="desc-light u-mt0">
                Jika Anda menang, pihak Pertamina akan menghubungi Anda untuk proses selanjutnya.
              </p>
            </div>
            <div className="card container" style={{ marginTop: '16px' }}>
              <table>
                <tbody>
                  <tr>
                    <td>Harga Penawaran Anda</td>
                    <td className="u-right">Rp{thousandSeparator(price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a style={{marginTop: '16px'}} href="/" className="button button--ghost">Oke</a>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Summary