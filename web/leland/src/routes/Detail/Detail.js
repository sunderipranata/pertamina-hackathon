import React, { Component, Fragment } from 'react'
import ClassNames from 'classnames'

import sample_tanah_1 from './assets/sample-tanah-1.jpg'
import sample_tanah_2 from './assets/sample-tanah-2.jpg'
import sample_tanah_3 from './assets/sample-tanah-3.jpg'
import sample_tanah_4 from './assets/sample-tanah-4.jpg'
import ic_location from '../../assets/ic-location.svg'
import ic_time from '../../assets/ic-time.svg'
import Countdown from '../../components/Countdown'

import { thousandSeparator } from '../../utils/currency'

import './Detail.scss'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeImage: sample_tanah_1
    }
  }

  handleChangeActive = (activeImage) => {
    this.setState({ activeImage })
  }

  render() {
    const { activeImage } = this.state
    const currentDate = new Date()
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear()

    return (
      <Fragment>
        <div className="ph-detail__container">
          <section name="thumbnail">
            <div className="ph-detail__image"
                style={{
                  'background': 'url(' + activeImage + ') no-repeat center center / cover'}}
            />
            <div className="ph-detail__gallery">
              <div className={ClassNames('ph-detail__gallery--item', {
                'active': activeImage === sample_tanah_1
              })}
                style={{
                  'background': 'url(' + sample_tanah_1 + ') no-repeat center center / cover'}}
                onClick={() => this.handleChangeActive(sample_tanah_1)} />
              <div className={ClassNames('ph-detail__gallery--item', {
                'active': activeImage === sample_tanah_2
              })}
                style={{
                  'background': 'url(' + sample_tanah_2 + ') no-repeat center center / cover'}}
                onClick={() => this.handleChangeActive(sample_tanah_2)} />
              <div className={ClassNames('ph-detail__gallery--item', {
                'active': activeImage === sample_tanah_3
              })}
                style={{
                  'background': 'url(' + sample_tanah_3 + ') no-repeat center center / cover'}}
                onClick={() => this.handleChangeActive(sample_tanah_3)} />
              <div className={ClassNames('ph-detail__gallery--item', {
                'active': activeImage === sample_tanah_4
              })}
                style={{
                  'background': 'url(' + sample_tanah_4 + ') no-repeat center center / cover'}}
                onClick={() => this.handleChangeActive(sample_tanah_4)} />
            </div>
          </section>
          <section name="top" className="container">
            <h1 className="u-m0">Tanah Lokasi Strategis</h1>
            <div className="u-flex">
              <img src={ic_location} style={{ marginRight: '8px' }} />
              <p className="label--sub u-m0">Bekasi Utara</p>
            </div>
            <p className="label--sub u-m0" style={{ marginLeft: '16px' }}>
              Jalan Cempaka Jatimulya Tambun Selatan
            </p>
            <div className="ph-detail__col-2 u-mt1">
              <div>
                <p className="u-m0">
                  <span className="label--lg u-bold">500+</span> <span className="label--disabled">Penawar</span>
                </p>
              </div>
              <div>
                <p className="label--disabled" style={{ marginTop: '6px', marginBottom: '4px' }}>
                  Aset cocok untuk
                </p>
                <span className="chips chips--main">Kafe</span>
                <span className="chips chips--main">Toko</span>
              </div>
            </div>
          </section>
          <hr className="seperator" />
          <section name="description" className="container">
            <h2 className="u-mt0">Deskripsi</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="label--disabled u-m0">Luas Tanah</p>
                  </td>
                  <td>
                    <p className="label--main u-bold u-m0">{thousandSeparator(2000)} m<sup>2</sup></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="label--disabled u-m0">Luas Bangunan</p>
                  </td>
                  <td>
                    <p className="label--main u-bold u-m0">800 m<sup>2</sup></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="label--disabled u-m0">Sertifikat</p>
                  </td>
                  <td>
                    <p className="label--main u-bold u-m0">SHM - Sertifikat Hak Milik</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="label--disabled u-m0">Info Lanjut</p>
                  </td>
                  <td>
                    <p className="label--main u-bold u-m0">0812345678</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <hr className="seperator" />
          <section name="status" className="container">
            <h2 className="u-mt0">Status</h2>
            <div className="u-flex">
              <img src={ic_time} style={{ marginRight: '8px' }}  />
              <div>
                <Countdown date={`${year}-12-24T00:00:00`} />
                <p className="u-m0 label--disabled">
                  Lelang berakhir{' '}
                  <strong>21 Agustus 2019</strong>
                </p>
              </div>
            </div>
            <div className="ph-detail__col-2 u-mt1">
              <div>
                <p className="label--disabled u-mb0">Penawaran tertinggi</p>
                <p className="label--md u-bold u-m0">Rp{thousandSeparator(878000000)}</p>
              </div>
              <div>
                <p className="label--disabled u-mb0">Penawaran rata-rata</p>
                <p className="label--md u-bold u-m0">Rp{thousandSeparator(848000000)}</p>
              </div>
            </div>
          </section>
          <hr className="seperator" />
          <section name="nearby" className="container">
            <h2 className="u-mt0">Tempat Terdekat</h2>
            <ol className="nearby__counter">
              <li>
                <div>
                  <p className="label--sub u-bold u-m0">Summarecon Mall Bekasi</p>
                  <p className="label--disabled u-m0">500 m</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="label--sub u-bold u-m0">McDonald’s Summarecon Bekasi</p>
                  <p className="label--disabled u-m0">600 m</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="label--sub u-bold u-m0">Kantor Pemasaran Summarecon Bekasi</p>
                  <p className="label--disabled u-m0">600 m</p>
                </div>
              </li>
            </ol>
          </section>
        </div>
        <div className="ph-detail__cta">
          <div className="ph-detail__col-2">
            <div>
              <p className="label--title u-m0">Dijual mulai dari</p>
              <p className="label--amount u-bold u-m0">Rp{thousandSeparator(800000000)}</p>
            </div>
            <div>
              <a className="button button--main">Tawar</a>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Detail
