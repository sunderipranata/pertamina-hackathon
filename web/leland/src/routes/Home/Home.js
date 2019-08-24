import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

import './Home.scss'
import category_tanah from './assets/category-tanah.png'
import category_bangunan from './assets/category-bangunan.png'
import suit_for_cafe from './assets/suit-for-cafe.png'
import suit_for_gudang from './assets/suit-for-gudang.png'
import suit_for_kantor from './assets/suit-for-kantor.png'
import suit_for_kebun from './assets/suit-for-kebun.png'


import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CardAssets from '../../components/CardAssets/CardAssets'

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
<<<<<<< HEAD
  componentDidMount() {
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.preventTouch, { passive: false });
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

=======
  
  componentDidMount() {
    assetService.getAssets(null, (result) => {
      if (result.success) {
        console.log('res2', result)
      }
    });
  }

>>>>>>> 13402a55ffa82bf89225b2d0df970e8e86dc1ee2
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
            <CardAssets />
          </section>
        </div>
      </Fragment>
    )
  }
}

export default Home
