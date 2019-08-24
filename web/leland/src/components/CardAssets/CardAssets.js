import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './CardAssets.scss'
import sample_tanah from './assets/sample-tanah.png'
import ic_location from '../../assets/ic-location.svg'

import { DETAIL_PATH } from '../../url'

import { thousandSeparator } from '../../utils/currency'

class CardAssets extends Component {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    area: PropTypes.number,
    bidders: PropTypes.number,
    suit: PropTypes.string,
    price: PropTypes.number
  }

  render() {
    const { title, type, location, area, bidders, suit, price } = this.props

    var suitArr = suit.split(',')

    console.log(suitArr)

    return (
      <Link to={DETAIL_PATH} className="card u-block">
        <div className="ph-card__image"
          style={{
            'background': 'url(' + sample_tanah + ') no-repeat center center',
            'backgroundSize': 'cover',
            'backgroundPosition': 'top'}}
        >
          <span className="chips chips--blue">{type}</span>
        </div>
        <div className="ph-card__desc container">
          <h3 className="title u-m0">{title}</h3>
          <section name="description" className="desc">
            <img src={ic_location} style={{ marginRight: '8px' }} />
            {location}
            <div className="divider" />
            Luas Tanah: {thousandSeparator(area)} m<sup>2</sup>
          </section>
          <section className="detail">
            <div className="col-2">
              <div>
                <p className="u-m0">
                  <span className="text__lg u-bold">{bidders}+</span> <span className="text__xs">Penawar</span>
                </p>
              </div>
              <div>
                <p className="text__xs" style={{ marginTop: '6px', marginBottom: '4px' }}>Aset cocok untuk</p>
                {suitArr.map((item, i) => (
                  <span key={i} className="chips chips--main">{item}</span>
                ))}
              </div>
            </div>
          </section>
          <section className="bottom">
            <div className="col-2">
              <div>
                <p className="text__xs u-m0">Dijual mulai dari</p>
                <p className="text__lg u-bold u-m0">Rp{thousandSeparator(price)}</p>
              </div>
              <div>
                <a className="button button--main">Tawar</a>
              </div>
            </div>
          </section>
        </div>
      </Link>
    )
  }
}

export default CardAssets
