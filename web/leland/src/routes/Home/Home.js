import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

import './Home.scss'
import category_tanah from './assets/category-tanah.png'
import category_bangunan from './assets/category-bangunan.png'
import suit_for_cafe from './assets/suit-for-cafe.png'
import suit_for_gudang from './assets/suit-for-gudang.png'
import suit_for_kantor from './assets/suit-for-kantor.png'
import suit_for_kebun from './assets/suit-for-kebun.png'
import suit_for_restoran from './assets/suit-for-restoran.jpg'
import suit_for_parkir from './assets/suit-for-parkir.jpg'
import ic_location from '../../assets/ic-location.svg'

import sample_tanah_1 from './assets/sample-tanah-1.jpg'
import sample_tanah_2 from './assets/sample-tanah-2.jpg'
import sample_tanah_3 from './assets/sample-tanah-3.jpg'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CardAssets from '../../components/CardAssets'
import assetService from '../../services/AssetService'

import { withRouter } from 'react-router-dom'

const sliderSettings = {
  autoplay: false,
  dots: false,
  infinite: true,
  speed: 300,
  arrows: false,
  slidesToShow: 1,
  variableWidth: true
}

class Home extends Component {
  constructor(props) {
    super()
    this.state = {
      runningAssets: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    assetService.getRunningAssets((result) => {
      if (result.success) {
        console.log('result', result.data.data)
        this.setState({
          runningAssets: result.data.data
        })
      }
    });
  }

  renderRunningAssets() {
    let { runningAssets } = this.state
    let result = []

    if(runningAssets.length > 0) {
      let firstRunningAsset = runningAssets.length > 0 ? runningAssets[0] : null
      result.push(
        <section name="section-popular" className="container">
          <h2>Aset populer</h2>
          <CardAssets
            id = { firstRunningAsset.id }
            title= { firstRunningAsset.name }
            type= { firstRunningAsset.type }
            location= { firstRunningAsset.city }
            area={ firstRunningAsset.type == 'TANAH' ? firstRunningAsset.land_area : firstRunningAsset.building_area }
            bidders={ 101 }
            suit= { firstRunningAsset.category }
            price={ firstRunningAsset.start_price }
          />
        </section>
      )


      if(runningAssets.length > 1) {
        result.push(
          <section name="section-suit-fot" className="container">
            <h2 className="u-m0">Lelang lainnya</h2>
          </section>
        )

        let remainingRunningAssets = []
        runningAssets.forEach((a, i) => {
          if(i > 0) {
            let isLand = a.type == 'TANAH' ? true : false
            let url
            let mod = i % 3
            if(mod == 0)
              url = sample_tanah_1
            if(mod == 1)
              url = sample_tanah_2
            if(mod == 2)
              url = sample_tanah_3
            let obj = (
              <Link to={'/detail/' + a.id} className="u-block" style={{ 'width': '200px' }}>
                <div className="card ph-home__ongoing">
                  <div className="assets-image"
                    style={{
                      'background': 'url('+ url +') no-repeat center center',
                      'backgroundSize': 'cover',
                      'backgroundPosition': 'top'}}
                  />
                  <div className="ongoing-container">
                    <p className="price u-bold">Rp { a.start_price }</p>
                    <div className="location">
                      <img src={ic_location} style={{ marginRight: '8px' }} />
                      { a.city }
                    </div>
                    <p className="area u-m0">{ isLand ? 'Luas Tanah: ' + a.land_area + ' m' : 'Luas Bangunan: ' + a.building_area + ' m' }<sup>2</sup></p>
                  </div>
                </div>
              </Link>
            )
            remainingRunningAssets.push(obj)
          }
        })

        result.push(
          <Slider {...sliderSettings}>
            { remainingRunningAssets }
          </Slider>
        )
      }
    }
    return (
      result
    )
  }

  render() {
    return (
      <Fragment>
        <div className="ph-home__wrapper">
          <div className="ph-home__bg" />
          <section name="section-search" className="container" style={{ marginTop: '24px' }}>
            <input name="search" className="search" placeholder="Cari Lokasi" />
          </section>
          <section name="section-category" className="container">
            <h2 className="u-m0">Kategori Aset</h2>
            <div className="ph-home__category ">
              <a href="/search?type=TANAH">
              <div className="card container u-center">
                <img src={category_tanah} width="70" />
                <p className="text u-mb0">Tanah</p>
              </div>
              </a>
              <a href="/search?type=BANGUNAN">
              <div className="card container u-center">
                <img src={category_bangunan} width="70" />
                <p className="text u-mb0">Bangunan</p>
              </div>
              </a>
            </div>
          </section>
          <section name="section-suit-fot" className="container">
            <h2 className="u-m0">Aset cocok untuk</h2>
          </section>
          <div className="overflow-x-scroll">
            <a href="/search?category=KAFE">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_cafe + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kafe</p>
            </div>
            </a>
            <a href="/search?category=KEBUN">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_kebun + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kebun</p>
            </div>
            </a>
            <a href="/search?category=GUDANG">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_gudang + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Gudang</p>
            </div>
            </a>
            <a href="/search?category=KANTOR">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_kantor + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kantor</p>
            </div>
            </a>
            <a href="/search?category=RESTORAN">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_restoran + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Restoran</p>
            </div>
            </a>
            <a href="/search?category=PARKIR">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_parkir + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Parkir</p>
            </div>
            </a>
          </div>

          { this.renderRunningAssets() }

        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
