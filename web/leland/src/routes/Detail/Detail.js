import React, { Component, Fragment } from 'react'
import ClassNames from 'classnames'
import NumberFormat from 'react-number-format'

import sample_tanah_1 from './assets/sample-tanah-1.jpg'
import sample_tanah_2 from './assets/sample-tanah-2.jpg'
import sample_tanah_3 from './assets/sample-tanah-3.jpg'
import sample_tanah_4 from './assets/sample-tanah-4.jpg'
import ic_location from '../../assets/ic-location.svg'
import ic_time from '../../assets/ic-time.svg'
import Countdown from '../../components/Countdown'
import BottomSheet from '../../components/BottomSheet'
import Navbar from '../../components/Navbar'

import { thousandSeparator } from '../../utils/currency'

import assetService from '../../services/AssetService'
import bidService from '../../services/BidService'

import { withRouter } from 'react-router-dom'

import './Detail.scss'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeImage: sample_tanah_1,
      showInputBidPrice: false,
      assetId: props.match.params.id,
      assetDetail: null,
      auctionDetail: null,
      bidValue: null
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let id = this.state.assetId

    assetService.getAssetsById(id, (result) => {
      if (result.success) {
        console.log('result', result.data.data)
        this.setState({
          assetDetail: result.data.data
        }, function() {
          this.getAuctionInfo()
        })
      }
    });

    console.log('ID', this.state.assetId)
  }

  handleChangeActive = (activeImage) => {
    this.setState({ activeImage })
  }

  toggleBidPrice = () => {
    this.setState({ showInputBidPrice: !this.state.showInputBidPrice })
  }

  numberFormatChange = (value) => {
    console.log('value', value)
    this.setState({
      bidValue: value.value
    })
  }

  submitBid = () => {
    let { assetDetail, bidValue } = this.state
    let payload = {
      user_id: 1,
      asset_id: assetDetail.id,
      bid_price: parseInt(bidValue)
    }

    bidService.placeBid(payload, (result) => {
      console.log('result eee', result)
      if (result.success) {
        console.log('result', result)

        //redirect
        let url = '/summary/' + parseInt(bidValue)
        this.props.history.push(url)
      }
    });
  }

  getAuctionInfo = () => {
    let { assetDetail } = this.state
    let assetId = assetDetail.id
    console.log('asset id', assetId)
    assetService.getAuctionInfo(assetId, (result) => {
      if (result.success) {
        console.log('result', result.data.data)
        this.setState({
          auctionDetail: result.data.data
        })
      }
    });
  }

  render() {
    let { assetDetail, bidValue, auctionDetail } = this.state
    const { activeImage } = this.state
    const currentDate = new Date()
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear()

    if(assetDetail !== null && auctionDetail !== null) {
      var suitArr = (assetDetail.category).split(',')

      return (
        <Fragment>
          <Navbar title="Detail" />
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
              <h1 className="u-m0">{ assetDetail.name }</h1>
              <div className="u-flex">
                <img src={ic_location} style={{ marginRight: '8px' }} />
                <p className="label--sub u-m0">{ assetDetail.city }</p>
              </div>
              <p className="label--sub u-m0" style={{ marginLeft: '16px' }}>
                { assetDetail.address }
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
                  {suitArr.map((item, i) => (
                    <span key={i} className="chips chips--main">{item}</span>
                  ))}
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
                      <p className="label--main u-bold u-m0">{thousandSeparator(assetDetail.land_area)} m<sup>2</sup></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="label--disabled u-m0">Luas Bangunan</p>
                    </td>
                    <td>
                      <p className="label--main u-bold u-m0">{assetDetail.building_area} m<sup>2</sup></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="label--disabled u-m0">Sertifikat</p>
                    </td>
                    <td>
                      <p className="label--main u-bold u-m0">{ assetDetail.certificate_type }</p>
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
                  {/* <Countdown date={`${year}-12-24T00:00:00`} /> */}
                  <Countdown date = { new Date(assetDetail.start_time) } />
                  <p className="u-m0 label--disabled">
                    Lelang berakhir{' '}
                    <strong>{ assetDetail.start_time }</strong>
                  </p>
                </div>
              </div>
              <div className="ph-detail__col-2 u-mt1">
                <div>
                  <p className="label--disabled u-mb0">Penawaran tertinggi</p>
                  <p className="label--md u-bold u-m0">Rp{thousandSeparator(auctionDetail.max_price)}</p>
                </div>
                <div>
                  <p className="label--disabled u-mb0">Penawaran rata-rata</p>
                  <p className="label--md u-bold u-m0">Rp{thousandSeparator(auctionDetail.avg_price)}</p>
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
                <p className="label--amount u-bold u-m0">Rp{thousandSeparator(assetDetail.start_price)}</p>
              </div>
              <div>
                <a onClick={this.toggleBidPrice} className="button button--main">Tawar</a>
              </div>
            </div>
          </div>
          <BottomSheet title="Tawar Harga"
            onClose={this.toggleBidPrice}
            display={this.state.showInputBidPrice}
          >
            <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Harga Penawaran Anda</label>
            <div className="input-container">
              <span>Rp</span>
              <NumberFormat
                value = { bidValue }
                className='input-price'
                name='bid-price'
                allowNegative={false}
                placeholder='1.000.000.000'
                thousandSeparator={'.'}
                decimalSeparator={','}
                onValueChange = { this.numberFormatChange } />
            </div>
            <button className="button button--main" onClick = { this.submitBid }>Tawar Harga</button>
          </BottomSheet>
        </Fragment>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withRouter(Detail)
