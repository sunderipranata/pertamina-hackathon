import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

import './Home.scss'
import category_tanah from './assets/category-tanah.png'
import category_bangunan from './assets/category-bangunan.png'
import suit_for_cafe from './assets/suit-for-cafe.png'
import suit_for_gudang from './assets/suit-for-gudang.png'
import suit_for_kantor from './assets/suit-for-kantor.png'
import suit_for_kebun from './assets/suit-for-kebun.png'
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
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.preventTouch, { passive: false });

    assetService.getRunningAssets((result) => {
      if (result.success) {
        console.log('result', result.data.data)
        this.setState({
          runningAssets: result.data.data
        })
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.preventTouch, {
      passive: false
    });
  }

  touchStart = (e) => {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch = (e) => {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  render() {
    return (
      <Fragment>
        <div className="ph-home__wrapper">
          <div className="ph-home__bg" />
          <section name="section-search" className="container">
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
          <Slider {...sliderSettings}>
            <div style={{ 'width': '106px' }}>
              <div className="ph-home__suit-for"
                style={{
                  'background': 'url(' + suit_for_cafe + ') no-repeat center center',
                  'backgroundSize': 'cover'
                }}>
                <p className="text u-m0 u-right">Kafe</p>
              </div>
            </div>
            <div style={{ 'width': '106px' }}>
              <div className="ph-home__suit-for"
                style={{
                  'background': 'url(' + suit_for_kebun + ') no-repeat center center',
                  'backgroundSize': 'cover'
                }}>
                <p className="text u-m0 u-right">Kebun</p>
              </div>
            </div>
            <div style={{ 'width': '106px' }}>
              <div className="ph-home__suit-for"
                style={{
                  'background': 'url(' + suit_for_gudang + ') no-repeat center center',
                  'backgroundSize': 'cover'
                }}>
                <p className="text u-m0 u-right">Gudang</p>
              </div>
            </div>
            <div style={{ 'width': '106px' }}>
              <div className="ph-home__suit-for"
                style={{
                  'background': 'url(' + suit_for_kantor + ') no-repeat center center',
                  'backgroundSize': 'cover'
                }}>
                <p className="text u-m0 u-right">Kantor</p>
              </div>
            </div>
          </Slider>
          <section name="section-popular" className="container">
            <h2>Aset popular</h2>
            <CardAssets
              title="Tanah Lokasi Strategis"
              type="Tanah"
              location="Bekasi"
              area={2000}
              bidders={500}
              suit="Cafe, Toko"
              price={800000000}
            />
          </section>
          <section name="section-suit-fot" className="container">
            <h2 className="u-m0">Lelang lainnya</h2>
          </section>
          <Slider {...sliderSettings}>
            <div style={{ 'width': '200px' }}>
              <div className="card ph-home__ongoing">
                <div className="assets-image"
                  style={{
                    'background': 'url(' + sample_tanah_1 + ') no-repeat center center',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'top'}}
                />
                <div className="ongoing-container">
                  <p className="price u-bold">Rp1.000.000.000</p>
                  <div className="location">
                    <img src={ic_location} style={{ marginRight: '8px' }} />
                    Tangerang
                  </div>
                  <p className="area u-m0">Luas Tanah: 2.000 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div style={{ 'width': '200px' }}>
              <div className="card ph-home__ongoing">
                <div className="assets-image"
                  style={{
                    'background': 'url(' + sample_tanah_2 + ') no-repeat center center',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'top'}}
                />
                <div className="ongoing-container">
                  <p className="price u-bold">Rp500.000.000</p>
                  <div className="location">
                    <img src={ic_location} style={{ marginRight: '8px' }} />
                    Depok
                  </div>
                  <p className="area u-m0">Luas Tanah: 3.000 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div style={{ 'width': '200px' }}>
              <div className="card ph-home__ongoing">
                <div className="assets-image"
                  style={{
                    'background': 'url(' + sample_tanah_3 + ') no-repeat center center',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'top'}}
                />
                <div className="ongoing-container">
                  <p className="price u-bold">Rp700.000.000</p>
                  <div className="location">
                    <img src={ic_location} style={{ marginRight: '8px' }} />
                    Bekasi Utara
                  </div>
                  <p className="area u-m0">Luas Tanah: 4.000 m<sup>2</sup></p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </Fragment>
    )
  }
}

export default Home
