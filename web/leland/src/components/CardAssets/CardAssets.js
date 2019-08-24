import React, { Component } from 'react'

import './CardAssets.scss'
import sample_tanah from './assets/sample-tanah.png'
import ic_location from '../../assets/ic-location.svg'

class CardAssets extends Component {
  render() {
    return (
      <div className="card">
        <div className="ph-card__image"
          style={{
            'background': 'url(' + sample_tanah + ') no-repeat center center',
            'backgroundSize': 'cover',
            'backgroundPosition': 'top'}}
        >
          <span className="chips chips--blue">Tanah</span>
        </div>
        <div className="ph-card__desc container">
          <h3 className="title u-m0">Tanah Lokasi Strategis</h3>
          <section name="description" className="desc">
            <img src={ic_location} style={{ marginRight: '8px' }} />
            Bekasi Timur
            <div className="divider" />
            Luas Tanah: 2.000 m2
          </section>
          <section className="detail">
            <div className="col-2">
              <div>
                <p className="u-m0">
                  <span className="text__lg u-bold">500+</span> <span className="text__xs">Penawar</span>
                </p>
              </div>
              <div>
                <p className="text__xs" style={{ marginTop: '6px', marginBottom: '4px' }}>Aset cocok untuk</p>
                <span className="chips chips--main">Cafe</span>
                <span className="chips chips--main">Toko</span>
                <span className="chips chips--main">Restoran</span>
              </div>
            </div>
          </section>
          <section className="bottom">
            <div className="col-2">
              <div>
                <p className="text__xs u-m0">Dijual mulai dari</p>
                <p className="text__lg u-bold u-m0">Rp800.000.000</p>
              </div>
              <div>
                <a className="button button--main">Tawar</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default CardAssets
