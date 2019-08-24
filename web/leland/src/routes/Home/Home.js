import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

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

      result.push(
        <section name="section-suit-fot" className="container">
          <h2 className="u-m0">Lelang lainnya</h2>
        </section>
      )

      let remainingRunningAssets = []
      runningAssets.forEach((a, i) => {
        console.log('i', i)
        if(i > 0) {
          let isLand = a.type == 'TANAH' ? true : false
          let url
          if(i == 1)
            url = sample_tanah_1
          if(i == 2)
            url = sample_tanah_2
          if(i == 3)
            url = sample_tanah_3
          let obj = (
            <div style={{ 'width': '200px' }}>
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
            </div>
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
              <div className="card container u-center">
                <img src={category_tanah} width="70" />
                <p className="text u-mb0">Tanah</p>
              </div>
              <div className="card container u-center">
                <img src={category_bangunan} width="70" />
                <p className="text u-mb0">Bangunan</p>
              </div>
            </div>
          </section>
          <section name="section-suit-fot" className="container">
            <h2 className="u-m0">Aset cocok untuk</h2>
          </section>
          <div className="overflow-x-scroll">
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_cafe + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kafe</p>
            </div>
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_kebun + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kebun</p>
            </div>
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_gudang + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Gudang</p>
            </div>
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_kantor + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Kantor</p>
            </div>
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_restoran + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Restoran</p>
            </div>
            <div className="ph-home__suit-for"
              style={{
                'background': 'url(' + suit_for_parkir + ') no-repeat center center',
                'backgroundSize': 'cover'
              }}>
              <p className="text u-m0 u-right">Parkir</p>
            </div>
          </div>
          
          { this.renderRunningAssets() }

        </div>
      </Fragment>
    )
  }
}

export default Home
